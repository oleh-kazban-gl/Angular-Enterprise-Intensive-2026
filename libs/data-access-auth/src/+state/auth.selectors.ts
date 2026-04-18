import { createSelector } from '@ngrx/store';

import { getError } from '@gl/util-ngrx';
import { authFeature } from './auth.reducer';

export const { selectAuthState, selectToken, selectCallState, selectInitialized, selectUser } = authFeature;

export const selectIsLoggedIn = createSelector(selectToken, token => !!token);

export const selectCurrentUser = selectUser;

export const selectCurrentUserId = createSelector(selectToken, token => {
  if (!token) {
    return null;
  }
  try {
    const payload = JSON.parse(atob(token.split('.')[1])) as { sub?: string };
    return payload.sub ?? null;
  } catch {
    return null;
  }
});

export const selectIsLoading = createSelector(selectCallState, callState => callState === 'loading');

export const selectError = createSelector(selectCallState, getError);
