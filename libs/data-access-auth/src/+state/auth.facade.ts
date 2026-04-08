import { Injectable, inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { AuthActions } from './auth.actions';
import { selectError, selectIsLoading, selectIsLoggedIn } from './auth.selectors';

@Injectable()
export class AuthFacade {
  private readonly store = inject(Store);

  readonly isLoggedIn$ = this.store.select(selectIsLoggedIn);
  readonly isLoading$ = this.store.select(selectIsLoading);
  readonly error$ = this.store.select(selectError);

  signIn(email: string, password: string): void {
    this.store.dispatch(AuthActions.signIn({ email, password }));
  }

  signUp(name: string, email: string, password: string): void {
    this.store.dispatch(AuthActions.signUp({ name, email, password }));
  }

  signOut(): void {
    this.store.dispatch(AuthActions.signOut());
  }
}
