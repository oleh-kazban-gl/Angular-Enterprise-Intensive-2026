import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { selectIsLoggedIn } from './auth.selectors';

/** Allows access only when authenticated. Redirects to /auth/sign-in otherwise. */
export const authGuard: CanActivateFn = () => {
  const isLoggedIn = inject(Store).selectSignal(selectIsLoggedIn);
  return isLoggedIn() ? true : inject(Router).createUrlTree(['/auth/sign-in']);
};

/** Allows access only when NOT authenticated. Redirects to /posts otherwise. */
export const guestGuard: CanActivateFn = () => {
  const isLoggedIn = inject(Store).selectSignal(selectIsLoggedIn);
  return !isLoggedIn() ? true : inject(Router).createUrlTree(['/posts']);
};
