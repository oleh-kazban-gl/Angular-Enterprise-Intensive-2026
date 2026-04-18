import { AuthActions } from './auth.actions';
import { authReducer, AuthState } from './auth.reducer';

const initialState: AuthState = {
  token: null,
  user: null,
  initialized: false,
  callState: 'init',
};

describe('authReducer', () => {
  it('returns the initial state for an unknown action', () => {
    const state = authReducer(undefined, { type: '@@INIT' } as never);
    expect(state).toEqual(initialState);
  });

  it('handles restoreAuthSuccess: sets token and marks initialized', () => {
    const state = authReducer(initialState, AuthActions.restoreAuthSuccess({ token: 'abc' }));
    expect(state).toEqual({ token: 'abc', user: null, initialized: true, callState: 'init' });
  });

  it('handles restoreAuthComplete: marks initialized without token', () => {
    const state = authReducer(initialState, AuthActions.restoreAuthComplete());
    expect(state).toEqual({ ...initialState, initialized: true });
  });

  it('handles signIn: sets callState to loading', () => {
    const state = authReducer(initialState, AuthActions.signIn({ email: 'a@b.com', password: '123' }));
    expect(state.callState).toBe('loading');
  });

  it('handles signInSuccess: sets token and loaded callState', () => {
    const state = authReducer(initialState, AuthActions.signInSuccess({ token: 'tok' }));
    expect(state.token).toBe('tok');
    expect(state.callState).toBe('loaded');
  });

  it('handles signInFailure: sets error callState', () => {
    const state = authReducer(initialState, AuthActions.signInFailure({ error: 'bad credentials' }));
    expect(state.callState).toEqual({ error: 'bad credentials' });
  });

  it('handles signUp: sets callState to loading', () => {
    const state = authReducer(
      initialState,
      AuthActions.signUp({ name: 'John', username: 'john', email: 'a@b.com', password: '123' })
    );
    expect(state.callState).toBe('loading');
  });

  it('handles signUpSuccess: resets callState to init', () => {
    const loadingState: AuthState = { ...initialState, callState: 'loading' };
    const state = authReducer(loadingState, AuthActions.signUpSuccess());
    expect(state.callState).toBe('init');
  });

  it('handles signUpFailure: sets error callState', () => {
    const state = authReducer(initialState, AuthActions.signUpFailure({ error: 'email taken' }));
    expect(state.callState).toEqual({ error: 'email taken' });
  });

  it('handles signOut: sets callState to loading', () => {
    const state = authReducer(initialState, AuthActions.signOut());
    expect(state.callState).toBe('loading');
  });

  it('handles signOutSuccess: clears token and resets callState', () => {
    const withToken: AuthState = { token: 'tok', initialized: true, callState: 'loading' };
    const state = authReducer(withToken, AuthActions.signOutSuccess());
    expect(state.token).toBeNull();
    expect(state.callState).toBe('init');
  });

  it('handles signOutFailure: sets error callState', () => {
    const state = authReducer(initialState, AuthActions.signOutFailure({ error: 'server error' }));
    expect(state.callState).toEqual({ error: 'server error' });
  });
});
