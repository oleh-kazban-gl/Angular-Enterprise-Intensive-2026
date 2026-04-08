import { createFeature, createReducer, on } from '@ngrx/store';

import { CallState } from '@gl/util-ngrx';
import { PostActions } from './post.actions';
import { Post } from './post.models';

export const POST_FEATURE_KEY = 'post';

export interface PostState {
  post: Post | null;
  callState: CallState;
}

const initialState: PostState = {
  post: null,
  callState: 'init',
};

export const postFeature = createFeature({
  name: POST_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(PostActions.loadPost, state => ({ ...state, callState: 'loading' as const })),
    on(PostActions.loadPostSuccess, (state, { post }) => ({ ...state, post, callState: 'loaded' as const })),
    on(PostActions.loadPostFailure, (state, { error }) => ({ ...state, callState: { error } })),
    // Optimistic toggle
    on(PostActions.toggleLike, (state, { liked }) => ({
      ...state,
      post: state.post ? { ...state.post, liked, likes: liked ? state.post.likes + 1 : state.post.likes - 1 } : null,
    })),
    // Confirm server values on success
    on(PostActions.toggleLikeSuccess, (state, { likes, liked }) => ({
      ...state,
      post: state.post ? { ...state.post, likes, liked } : null,
    })),
    // Roll back on failure
    on(PostActions.toggleLikeFailure, (state, { previousLikes, previousLiked }) => ({
      ...state,
      post: state.post ? { ...state.post, likes: previousLikes, liked: previousLiked } : null,
    }))
  ),
});

export const { name, reducer: postReducer } = postFeature;
