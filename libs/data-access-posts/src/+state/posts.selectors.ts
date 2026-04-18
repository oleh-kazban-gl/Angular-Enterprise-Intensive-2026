import { createSelector } from '@ngrx/store';

import { getError } from '@gl/util-ngrx';
import { postsAdapter, postsFeature } from './posts.reducer';

export const {
  selectPostsState,
  selectFeedCallState,
  selectPagination,
  selectLoadingPostIds,
  selectSubmittingCommentPostId,
} = postsFeature;

const { selectAll, selectEntities, selectIds } = postsAdapter.getSelectors();

export const selectAllPosts = createSelector(selectPostsState, selectAll);

export const selectPostEntities = createSelector(selectPostsState, selectEntities);

export const selectFeedPostIds = createSelector(selectPostsState, state => selectIds(state) as string[]);

export const selectPostById = (postId: string) =>
  createSelector(selectPostEntities, entities => entities[postId] ?? null);

export const selectFeedLoading = createSelector(selectFeedCallState, s => s === 'loading');

export const selectFeedLoaded = createSelector(selectFeedCallState, s => s === 'loaded');

export const selectFeedError = createSelector(selectFeedCallState, getError);

export const selectIsPostLoading = (postId: string) =>
  createSelector(selectLoadingPostIds, ids => ids.includes(postId));
