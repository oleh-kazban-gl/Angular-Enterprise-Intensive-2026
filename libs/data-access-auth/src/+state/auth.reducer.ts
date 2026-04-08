import { createFeature, createReducer, on } from '@ngrx/store';

import { CallState } from '@gl/util-ngrx';

import { AuthActions } from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  token: string | null;
  callState: CallState;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  callState: 'init',
};

export const authFeature = createFeature({
  name: AUTH_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(AuthActions.signIn, state => ({ ...state, callState: 'loading' as const })),
    on(AuthActions.signInSuccess, (state, { token }) => ({ ...state, token, callState: 'loaded' as const })),
    on(AuthActions.signInFailure, (state, { error }) => ({ ...state, callState: { error } })),
    on(AuthActions.signOut, state => ({ ...state, callState: 'loading' as const })),
    on(AuthActions.signOutSuccess, state => ({ ...state, token: null, callState: 'init' as const })),
    on(AuthActions.signOutFailure, (state, { error }) => ({ ...state, callState: { error } }))
  ),
});

export const { name, reducer: authReducer } = authFeature;
