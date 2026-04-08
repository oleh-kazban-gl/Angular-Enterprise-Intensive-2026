import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { AuthActions } from './auth.actions';
import { AuthService } from './auth.service';

@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signIn),
      switchMap(({ email, password }) =>
        this.authService.signIn(email, password).pipe(
          map(({ token }) => {
            localStorage.setItem('token', token);
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

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUp),
      switchMap(({ name, email, password }) =>
        this.authService.signUp(name, email, password).pipe(
          map(() => AuthActions.signUpSuccess()),
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
