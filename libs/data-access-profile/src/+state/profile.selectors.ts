import { createSelector } from '@ngrx/store';

import { getError } from '@gl/util-ngrx';
import { profileFeature } from './profile.reducer';

export const { selectProfile, selectCallState } = profileFeature;

export const selectProfileLoading = createSelector(selectCallState, callState => callState === 'loading');

export const selectProfileLoaded = createSelector(selectCallState, callState => callState === 'loaded');

export const selectProfileError = createSelector(selectCallState, callState => getError(callState));
