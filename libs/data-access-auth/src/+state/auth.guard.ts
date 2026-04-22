import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { combineLatest, filter, map, take } from 'rxjs';
import { Store } from '@ngrx/store';

import { selectInitialized, selectIsLoggedIn } from './auth.selectors';

/** Allows access only when authenticated. Redirects to /auth/sign-in otherwise. */
export const authGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);
  return combineLatest([store.select(selectInitialized), store.select(selectIsLoggedIn)]).pipe(
    filter(([initialized]) => initialized),
    take(1),
    map(([, isLoggedIn]) => (isLoggedIn ? true : router.createUrlTree(['/auth/sign-in'])))
  );
};

/** Allows access only when NOT authenticated. Redirects to /posts otherwise. */
export const guestGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);
  return combineLatest([store.select(selectInitialized), store.select(selectIsLoggedIn)]).pipe(
    filter(([initialized]) => initialized),
    take(1),
    map(([, isLoggedIn]) => (!isLoggedIn ? true : router.createUrlTree(['/posts'])))
  );
};
