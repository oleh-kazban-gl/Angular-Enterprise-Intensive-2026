import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from './auth.service';

/** Allows access only when authenticated. Redirects to /auth/sign-in otherwise. */
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  return authService.isLoggedIn() ? true : inject(Router).createUrlTree(['/auth/sign-in']);
};

/** Allows access only when NOT authenticated. Redirects to /posts otherwise. */
export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  return !authService.isLoggedIn() ? true : inject(Router).createUrlTree(['/posts']);
};
