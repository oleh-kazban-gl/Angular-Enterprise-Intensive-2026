import { Injectable, inject } from '@angular/core';

import { switchMap, catchError, map, of } from 'rxjs';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';

import { selectCurrentUserId } from '@gl/data-access-auth';
import { ProfileActions } from './profile.actions';
import { ProfileService } from './profile.service';

@Injectable()
export class ProfileEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly profileService = inject(ProfileService);

  loadProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.loadProfile),
      concatLatestFrom(() => this.store.select(selectCurrentUserId)),
      switchMap(([, userId]) => {
        if (!userId) {
          return of(ProfileActions.loadProfileFailure({ error: 'User not authenticated' }));
        }
        return this.profileService.getProfile(userId).pipe(
          map(profile => ProfileActions.loadProfileSuccess({ profile })),
          catchError(error => of(ProfileActions.loadProfileFailure({ error: error.message })))
        );
      })
    )
  );
}
