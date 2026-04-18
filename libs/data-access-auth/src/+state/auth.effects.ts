import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';

import { AuthActions } from './auth.actions';
import { selectCurrentUserId } from './auth.selectors';
import { AuthService } from './auth.service';

@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  restoreAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.restoreAuth),
      map(() => {
        const token = this.authService.getStoredToken();
        return token ? AuthActions.restoreAuthSuccess({ token }) : AuthActions.restoreAuthComplete();
      })
    )
  );

  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signIn),
      switchMap(({ email, password }) =>
        this.authService.signIn(email, password).pipe(
          map(({ token }) => {
            this.authService.saveToken(token);
            return AuthActions.signInSuccess({ token });
          }),
          catchError(error => of(AuthActions.signInFailure({ error: error.message ?? String(error) })))
        )
      )
    )
  );

  signInSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signInSuccess),
        tap(() => this.router.navigate(['/posts']))
      ),
    { dispatch: false }
  );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signInSuccess, AuthActions.restoreAuthSuccess),
      concatLatestFrom(() => this.store.select(selectCurrentUserId)),
      switchMap(([, userId]) => {
        if (!userId) {
          return of(AuthActions.loadUserFailure({ error: 'Invalid token' }));
        }
        return this.authService.getCurrentUser(userId).pipe(
          map(user => AuthActions.loadUserSuccess({ user })),
          catchError(error => of(AuthActions.loadUserFailure({ error: error.message })))
        );
      })
    )
  );

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUp),
      switchMap(({ name, username, email, password }) =>
        this.authService.signUp(name, username, email, password).pipe(
          switchMap(({ id }) =>
            this.authService.createAuthor(id, username).pipe(
              map(() => AuthActions.signUpSuccess()),
              catchError(error => of(AuthActions.signUpFailure({ error: error.message ?? String(error) })))
            )
          ),
          catchError(error => of(AuthActions.signUpFailure({ error: error.message ?? String(error) })))
        )
      )
    )
  );

  signUpSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signUpSuccess),
        tap(() => this.router.navigate(['/auth/sign-in']))
      ),
    { dispatch: false }
  );

  signOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signOut),
      map(() => {
        this.authService.clearStorage();
        return AuthActions.signOutSuccess();
      })
    )
  );

  signOutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signOutSuccess),
        tap(() => this.router.navigate(['/auth/sign-in']))
      ),
    { dispatch: false }
  );
}
