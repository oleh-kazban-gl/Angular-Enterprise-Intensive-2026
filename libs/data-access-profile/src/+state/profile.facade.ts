import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { ProfileActions } from './profile.actions';
import { UpdateProfilePayload, UserProfile } from './profile.models';
import {
  selectProfile,
  selectProfileLoading,
  selectProfileError,
  selectProfileSaving,
  selectProfileSaved,
  selectProfileSaveError,
} from './profile.selectors';

@Injectable()
export class ProfileFacade {
  private readonly store = inject(Store);

  readonly profile$: Observable<UserProfile | null> = this.store.select(selectProfile);
  readonly loading$: Observable<boolean> = this.store.select(selectProfileLoading);
  readonly error$: Observable<string | null> = this.store.select(selectProfileError);
  readonly saving$: Observable<boolean> = this.store.select(selectProfileSaving);
  readonly saved$: Observable<boolean> = this.store.select(selectProfileSaved);
  readonly saveError$: Observable<string | null> = this.store.select(selectProfileSaveError);

  loadProfile(): void {
    this.store.dispatch(ProfileActions.loadProfile());
  }

  updateProfile(payload: UpdateProfilePayload): void {
    this.store.dispatch(ProfileActions.updateProfile({ payload }));
  }
}
