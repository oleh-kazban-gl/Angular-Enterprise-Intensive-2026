import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';

import { CallState } from '@gl/util-ngrx';
import { FeedActions } from './feed.actions';
import { FeedPost } from './feed.models';

export const FEED_FEATURE_KEY = 'feed';

export interface FeedState extends EntityState<FeedPost> {
  callState: CallState;
}

export const feedAdapter: EntityAdapter<FeedPost> = createEntityAdapter<FeedPost>();

const initialState: FeedState = feedAdapter.getInitialState({
  callState: 'init',
});

export const feedFeature = createFeature({
  name: FEED_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(FeedActions.loadFeed, state => ({ ...state, callState: 'loading' as const })),
    on(FeedActions.loadFeedSuccess, (state, { posts }) =>
      feedAdapter.setAll(posts, { ...state, callState: 'loaded' as const })
    ),
    on(FeedActions.loadFeedFailure, (state, { error }) => ({ ...state, callState: { error } })),
    // Optimistic like: update immediately in the store
    on(FeedActions.likePost, (state, { postId }) => {
      const post = state.entities[postId];
      if (!post) {
        return state;
      }
      return feedAdapter.updateOne({ id: postId, changes: { likes: post.likes + 1 } }, state);
    }),
    // Roll back on failure
    on(FeedActions.likePostFailure, (state, { postId, previousLikes }) =>
      feedAdapter.updateOne({ id: postId, changes: { likes: previousLikes } }, state)
    )
  ),
});

export const { name, reducer: feedReducer } = feedFeature;
