import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Subject } from 'rxjs';
import { firstValueFrom, of, throwError } from 'rxjs';

import { AuthEffects } from './auth.effects';
import { AuthActions } from './auth.actions';
import { AuthService } from './auth.service';

jest.mock('./auth.service');

describe('AuthEffects', () => {
  let effects: AuthEffects;
  let actions$: Subject<Action>;
  let authService: jest.Mocked<AuthService>;
  let navigate: jest.Mock;
  let store: MockStore;

  beforeEach(() => {
    actions$ = new Subject<Action>();
    navigate = jest.fn();

    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        AuthService,
        provideMockStore(),
        { provide: Router, useValue: { navigate } },
      ],
    });

    effects = TestBed.inject(AuthEffects);
    authService = TestBed.inject(AuthService) as jest.Mocked<AuthService>;
    store = TestBed.inject(MockStore);
  });

  describe('restoreAuth$', () => {
    it('dispatches restoreAuthSuccess when a stored token exists', async () => {
      authService.getStoredToken.mockReturnValue('stored-token');
      const result = firstValueFrom(effects.restoreAuth$);
      actions$.next(AuthActions.restoreAuth());
      expect(await result).toEqual(AuthActions.restoreAuthSuccess({ token: 'stored-token' }));
    });

    it('dispatches restoreAuthComplete when no stored token', async () => {
      authService.getStoredToken.mockReturnValue(null);
      const result = firstValueFrom(effects.restoreAuth$);
      actions$.next(AuthActions.restoreAuth());
      expect(await result).toEqual(AuthActions.restoreAuthComplete());
    });
  });

  describe('signIn$', () => {
    it('dispatches signInSuccess and saves token on success', async () => {
      authService.signIn.mockReturnValue(of({ token: 'new-token' }));
      const result = firstValueFrom(effects.signIn$);
      actions$.next(AuthActions.signIn({ email: 'user@test.com', password: 'pass' }));
      expect(await result).toEqual(AuthActions.signInSuccess({ token: 'new-token' }));
      expect(authService.saveToken).toHaveBeenCalledWith('new-token');
    });

    it('dispatches signInFailure on HTTP error', async () => {
      authService.signIn.mockReturnValue(throwError(() => new Error('invalid credentials')));
      const result = firstValueFrom(effects.signIn$);
      actions$.next(AuthActions.signIn({ email: 'user@test.com', password: 'wrong' }));
      expect(await result).toEqual(AuthActions.signInFailure({ error: 'invalid credentials' }));
    });
  });

  describe('signInSuccess$', () => {
    it('navigates to /posts on signInSuccess', async () => {
      const result = firstValueFrom(effects.signInSuccess$);
      actions$.next(AuthActions.signInSuccess({ token: 'tok' }));
      await result;
      expect(navigate).toHaveBeenCalledWith(['/posts']);
    });
  });

  describe('signUp$', () => {
    it('dispatches signUpSuccess on success', async () => {
      authService.signUp.mockReturnValue(of({ id: 'user-1' }));
      authService.createAuthor.mockReturnValue(of(undefined));
      const result = firstValueFrom(effects.signUp$);
      actions$.next(AuthActions.signUp({ name: 'John', username: 'john', email: 'j@test.com', password: 'pass' }));
      expect(await result).toEqual(AuthActions.signUpSuccess());
    });

    it('dispatches signUpFailure on HTTP error', async () => {
      authService.signUp.mockReturnValue(throwError(() => new Error('email already exists')));
      const result = firstValueFrom(effects.signUp$);
      actions$.next(AuthActions.signUp({ name: 'John', username: 'john', email: 'j@test.com', password: 'pass' }));
      expect(await result).toEqual(AuthActions.signUpFailure({ error: 'email already exists' }));
    });
  });

  describe('signUpSuccess$', () => {
    it('navigates to /auth/sign-in on signUpSuccess', async () => {
      const result = firstValueFrom(effects.signUpSuccess$);
      actions$.next(AuthActions.signUpSuccess());
      await result;
      expect(navigate).toHaveBeenCalledWith(['/auth/sign-in']);
    });
  });

  describe('signOut$', () => {
    it('dispatches signOutSuccess and clears storage', async () => {
      const result = firstValueFrom(effects.signOut$);
      actions$.next(AuthActions.signOut());
      expect(await result).toEqual(AuthActions.signOutSuccess());
      expect(authService.clearStorage).toHaveBeenCalled();
    });
  });

  describe('signOutSuccess$', () => {
    it('navigates to /auth/sign-in on signOutSuccess', async () => {
      const result = firstValueFrom(effects.signOutSuccess$);
      actions$.next(AuthActions.signOutSuccess());
      await result;
      expect(navigate).toHaveBeenCalledWith(['/auth/sign-in']);
    });
  });
});
