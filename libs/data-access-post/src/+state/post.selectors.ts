import { getRouterSelectors } from '@ngrx/router-store';
import { createSelector } from '@ngrx/store';

import { getError } from '@gl/util-ngrx';
import { postFeature } from './post.reducer';

const { selectRouteParam } = getRouterSelectors();

export const { selectPostState, selectPost, selectCallState, selectSubmittingComment } = postFeature;

export const selectPostId = selectRouteParam('id');

export const selectLoading = createSelector(selectCallState, callState => callState === 'loading');

export const selectLoaded = createSelector(selectCallState, callState => callState === 'loaded');

export const selectError = createSelector(selectCallState, getError);
