import { createSelector } from '@ngrx/store';

import { getError } from '@gl/util-ngrx';
import { authFeature } from './auth.reducer';

export const { selectAuthState, selectToken, selectCallState, selectInitialized } = authFeature;

export const selectIsLoggedIn = createSelector(selectToken, token => !!token);

export const selectIsLoading = createSelector(selectCallState, callState => callState === 'loading');

export const selectError = createSelector(selectCallState, getError);
