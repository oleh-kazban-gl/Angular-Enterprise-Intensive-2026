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

  signIn(): void {
    this.store.dispatch(AuthActions.signIn());
  }

  signOut(): void {
    this.store.dispatch(AuthActions.signOut());
  }
}
