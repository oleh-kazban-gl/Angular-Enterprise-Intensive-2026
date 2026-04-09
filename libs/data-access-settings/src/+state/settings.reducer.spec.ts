import { SettingsActions } from './settings.actions';
import { settingsReducer, SettingsState } from './settings.reducer';
import { AppSettings } from './settings.models';

const mockSettings: AppSettings = {
  languages: [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'French' },
  ],
};

const initialState: SettingsState = {
  languages: [],
  callState: 'init',
};

describe('settingsReducer', () => {
  it('returns initial state for unknown action', () => {
    const state = settingsReducer(undefined, { type: '@@INIT' } as never);
    expect(state).toEqual(initialState);
  });

  it('handles loadSettings: sets callState to loading', () => {
    const state = settingsReducer(initialState, SettingsActions.loadSettings());
    expect(state.callState).toBe('loading');
  });

  it('handles loadSettingsSuccess: sets languages and loaded callState', () => {
    const state = settingsReducer(initialState, SettingsActions.loadSettingsSuccess({ settings: mockSettings }));
    expect(state.languages).toEqual(mockSettings.languages);
    expect(state.callState).toBe('loaded');
  });

  it('handles loadSettingsFailure: sets error callState', () => {
    const state = settingsReducer(initialState, SettingsActions.loadSettingsFailure({ error: 'fetch failed' }));
    expect(state.callState).toEqual({ error: 'fetch failed' });
    expect(state.languages).toEqual([]);
  });
});
