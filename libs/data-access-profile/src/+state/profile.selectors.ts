import { createSelector } from '@ngrx/store';

import { getError } from '@gl/util-ngrx';
import { profileFeature } from './profile.reducer';

export const { selectProfile, selectCallState, selectSaveState } = profileFeature;

export const selectProfileLoading = createSelector(selectCallState, callState => callState === 'loading');

export const selectProfileLoaded = createSelector(selectCallState, callState => callState === 'loaded');

export const selectProfileError = createSelector(selectCallState, callState => getError(callState));

export const selectProfileSaving = createSelector(selectSaveState, saveState => saveState === 'loading');

export const selectProfileSaved = createSelector(selectSaveState, saveState => saveState === 'loaded');

export const selectProfileSaveError = createSelector(selectSaveState, saveState => getError(saveState));
