import { createFeature, createReducer, on } from '@ngrx/store';

import { CallState } from '@gl/util-ngrx';
import { AuthActions } from './auth.actions';
import { User } from './auth.models';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  token: string | null;
  user: User | null;
  initialized: boolean;
  callState: CallState;
}

const initialState: AuthState = {
  token: null,
  user: null,
  initialized: false,
  callState: 'init',
};

export const authFeature = createFeature({
  name: AUTH_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(AuthActions.restoreAuthSuccess, (state, { token }) => ({ ...state, token, initialized: true })),
    on(AuthActions.restoreAuthComplete, state => ({ ...state, initialized: true })),
    on(AuthActions.signIn, state => ({ ...state, callState: 'loading' as const })),
    on(AuthActions.signInSuccess, (state, { token }) => ({ ...state, token, callState: 'loaded' as const })),
    on(AuthActions.signInFailure, (state, { error }) => ({ ...state, callState: { error } })),
    on(AuthActions.signUp, state => ({ ...state, callState: 'loading' as const })),
    on(AuthActions.signUpSuccess, state => ({ ...state, callState: 'init' as const })),
    on(AuthActions.signUpFailure, (state, { error }) => ({ ...state, callState: { error } })),
    on(AuthActions.loadUserSuccess, (state, { user }) => ({ ...state, user })),
    on(AuthActions.signOut, state => ({ ...state, callState: 'loading' as const })),
    on(AuthActions.signOutSuccess, state => ({ ...state, token: null, user: null, callState: 'init' as const })),
    on(AuthActions.signOutFailure, (state, { error }) => ({ ...state, callState: { error } }))
  ),
});

export const { name, reducer: authReducer } = authFeature;
