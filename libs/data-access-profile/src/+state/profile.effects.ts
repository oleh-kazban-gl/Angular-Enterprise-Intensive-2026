import { Injectable, inject } from '@angular/core';

import { switchMap, catchError, map, of } from 'rxjs';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { ProfileActions } from './profile.actions';
import { ProfileService } from './profile.service';

@Injectable()
export class ProfileEffects {
  private readonly actions$ = inject(Actions);
  private readonly profileService = inject(ProfileService);

  loadProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.loadProfile),
      switchMap(() =>
        this.profileService.getProfile().pipe(
          map(profile => ProfileActions.loadProfileSuccess({ profile })),
          catchError(error => of(ProfileActions.loadProfileFailure({ error: error.message })))
        )
      )
    )
  );
}
