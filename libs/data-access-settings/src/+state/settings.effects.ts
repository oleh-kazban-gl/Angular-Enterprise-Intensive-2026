import { Injectable, inject } from '@angular/core';

import { catchError, map, of, switchMap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { SettingsActions } from './settings.actions';
import { SettingsService } from './settings.service';

@Injectable()
export class SettingsEffects {
  private readonly actions$ = inject(Actions);
  private readonly settingsService = inject(SettingsService);

  loadSettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.loadSettings),
      switchMap(() =>
        this.settingsService.getSettings().pipe(
          map(settings => SettingsActions.loadSettingsSuccess({ settings })),
          catchError(error => of(SettingsActions.loadSettingsFailure({ error: error.message ?? String(error) })))
        )
      )
    )
  );
}
