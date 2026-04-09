import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { filter, map, take } from 'rxjs';
import { Store } from '@ngrx/store';

import { selectInitialized, selectIsLoggedIn } from './auth.selectors';

/** Allows access only when authenticated. Redirects to /auth/sign-in otherwise. */
export const authGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);
  return store.select(selectInitialized).pipe(
    filter(Boolean),
    take(1),
    map(() => (store.selectSignal(selectIsLoggedIn)() ? true : router.createUrlTree(['/auth/sign-in'])))
  );
};

/** Allows access only when NOT authenticated. Redirects to /posts otherwise. */
export const guestGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);
  return store.select(selectInitialized).pipe(
    filter(Boolean),
    take(1),
    map(() => (!store.selectSignal(selectIsLoggedIn)() ? true : router.createUrlTree(['/posts'])))
  );
};
