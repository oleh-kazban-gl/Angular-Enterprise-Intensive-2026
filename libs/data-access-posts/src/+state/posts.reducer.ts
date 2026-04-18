import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';

import { CallState } from '@gl/util-ngrx';
import { PostsActions } from './posts.actions';
import { Post, PostsPagination } from './posts.models';

export const POSTS_FEATURE_KEY = 'posts';

export interface PostsState extends EntityState<Post> {
  /** Loading state for the feed page request. */
  feedCallState: CallState;
  pagination: PostsPagination | null;
  /** IDs of posts currently being loaded individually (detail route). */
  loadingPostIds: string[];
  /** ID of the post whose comment is currently being submitted. */
  submittingCommentPostId: string | null;
}

export const postsAdapter: EntityAdapter<Post> = createEntityAdapter<Post>();

const initialState: PostsState = postsAdapter.getInitialState({
  feedCallState: 'init',
  pagination: null,
  loadingPostIds: [],
  submittingCommentPostId: null,
});

export const postsFeature = createFeature({
  name: POSTS_FEATURE_KEY,
  reducer: createReducer(
    initialState,

    // ── Feed ────────────────────────────────────────────────────────────────
    on(PostsActions.loadFeedPage, state => ({ ...state, feedCallState: 'loading' as const })),
    on(PostsActions.loadFeedPageSuccess, (state, { posts, pagination }) =>
      postsAdapter.upsertMany(posts, { ...state, feedCallState: 'loaded' as const, pagination })
    ),
    on(PostsActions.loadFeedPageFailure, (state, { error }) => ({
      ...state,
      feedCallState: { error },
    })),

    // ── Single post ─────────────────────────────────────────────────────────
    on(PostsActions.loadPost, (state, { postId }) => ({
      ...state,
      loadingPostIds: [...state.loadingPostIds, postId],
    })),
    on(PostsActions.loadPostSuccess, (state, { post }) =>
      postsAdapter.upsertOne(post, {
        ...state,
        loadingPostIds: state.loadingPostIds.filter(id => id !== post.id),
      })
    ),
    on(PostsActions.loadPostFailure, (state, { postId }) => ({
      ...state,
      loadingPostIds: state.loadingPostIds.filter(id => id !== postId),
    })),

    // ── Like (optimistic) ───────────────────────────────────────────────────
    on(PostsActions.toggleLike, (state, { postId, liked }) => {
      const post = state.entities[postId];
      if (!post) {
        return state;
      }
      return postsAdapter.updateOne(
        { id: postId, changes: { liked, likes: liked ? post.likes + 1 : post.likes - 1 } },
        state
      );
    }),
    on(PostsActions.toggleLikeSuccess, (state, { postId, likes, liked }) =>
      postsAdapter.updateOne({ id: postId, changes: { likes, liked } }, state)
    ),
    on(PostsActions.toggleLikeFailure, (state, { postId, previousLikes, previousLiked }) =>
      postsAdapter.updateOne({ id: postId, changes: { likes: previousLikes, liked: previousLiked } }, state)
    ),

    // ── Comment ─────────────────────────────────────────────────────────────
    on(PostsActions.addComment, (state, { postId }) => ({
      ...state,
      submittingCommentPostId: postId,
    })),
    on(PostsActions.addCommentSuccess, (state, { postId, comment }) => {
      const post = state.entities[postId];
      if (!post) {
        return { ...state, submittingCommentPostId: null };
      }
      return postsAdapter.updateOne(
        { id: postId, changes: { comments: [...post.comments, comment] } },
        { ...state, submittingCommentPostId: null }
      );
    }),
    on(PostsActions.addCommentFailure, state => ({ ...state, submittingCommentPostId: null })),

    // ── Cleanup ─────────────────────────────────────────────────────────────
    on(PostsActions.clearFeed, () => initialState)
  ),
});

export const { name, reducer: postsReducer } = postsFeature;
