import { createSelector } from '@ngrx/store';

import { getError } from '@gl/util-ngrx';
import { feedAdapter, feedFeature } from './feed.reducer';

export const { selectFeedState, selectCallState } = feedFeature;

const { selectAll, selectEntities } = feedAdapter.getSelectors();

export const selectAllPosts = createSelector(selectFeedState, selectAll);

export const selectPostEntities = createSelector(selectFeedState, selectEntities);

export const selectFeedLoading = createSelector(selectCallState, callState => callState === 'loading');

export const selectFeedLoaded = createSelector(selectCallState, callState => callState === 'loaded');

export const selectFeedError = createSelector(selectCallState, callState => getError(callState));
