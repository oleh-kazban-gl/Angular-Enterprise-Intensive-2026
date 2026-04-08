import { createSelector } from '@ngrx/store';

import { getError } from '@gl/util-ngrx';
import { createPostFeature } from './create-post.reducer';

export const { selectCreatePostState, selectCallState } = createPostFeature;

export const selectIsSubmitting = createSelector(selectCallState, callState => callState === 'loading');

export const selectError = createSelector(selectCallState, getError);
