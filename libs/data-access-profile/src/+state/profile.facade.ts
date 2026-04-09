import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { ProfileActions } from './profile.actions';
import { UserProfile } from './profile.models';
import { selectProfile, selectProfileLoading, selectProfileError } from './profile.selectors';

@Injectable()
export class ProfileFacade {
  private readonly store = inject(Store);

  readonly profile$: Observable<UserProfile | null> = this.store.select(selectProfile);
  readonly loading$: Observable<boolean> = this.store.select(selectProfileLoading);
  readonly error$: Observable<string | null> = this.store.select(selectProfileError);

  loadProfile(): void {
    this.store.dispatch(ProfileActions.loadProfile());
  }
}
