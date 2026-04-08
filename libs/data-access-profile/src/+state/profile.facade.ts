import { Injectable, inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { ProfileActions } from './profile.actions';
import { selectProfile, selectProfileLoading, selectProfileError } from './profile.selectors';

@Injectable()
export class ProfileFacade {
  private readonly store = inject(Store);

  readonly profile$ = this.store.select(selectProfile);
  readonly loading$ = this.store.select(selectProfileLoading);
  readonly error$ = this.store.select(selectProfileError);

  loadProfile(): void {
    this.store.dispatch(ProfileActions.loadProfile());
  }
}
