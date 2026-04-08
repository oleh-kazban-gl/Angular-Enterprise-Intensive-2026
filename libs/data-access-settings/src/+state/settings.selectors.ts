import { createSelector } from '@ngrx/store';

import { getError } from '@gl/util-ngrx';

import { settingsFeature } from './settings.reducer';

export const { selectSettingsState, selectLanguages, selectCallState } = settingsFeature;

export const selectIsLoading = createSelector(selectCallState, callState => callState === 'loading');

export const selectError = createSelector(selectCallState, getError);
