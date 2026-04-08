import { createFeature, createReducer, on } from '@ngrx/store';

import { CallState } from '@gl/util-ngrx';

import { SettingsActions } from './settings.actions';
import { Language } from './settings.models';

export const SETTINGS_FEATURE_KEY = 'settings';

export interface SettingsState {
  languages: Language[];
  callState: CallState;
}

const initialState: SettingsState = {
  languages: [],
  callState: 'init',
};

export const settingsFeature = createFeature({
  name: SETTINGS_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(SettingsActions.loadSettings, state => ({ ...state, callState: 'loading' as const })),
    on(SettingsActions.loadSettingsSuccess, (state, { settings }) => ({
      ...state,
      languages: settings.languages,
      callState: 'loaded' as const,
    })),
    on(SettingsActions.loadSettingsFailure, (state, { error }) => ({ ...state, callState: { error } }))
  ),
});

export const { name, reducer: settingsReducer } = settingsFeature;
