import { Injectable, inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { SettingsActions } from './settings.actions';
import { selectError, selectIsLoading, selectLanguages } from './settings.selectors';

@Injectable()
export class SettingsFacade {
  private readonly store = inject(Store);

  readonly languages$ = this.store.select(selectLanguages);
  readonly isLoading$ = this.store.select(selectIsLoading);
  readonly error$ = this.store.select(selectError);

  loadSettings(): void {
    this.store.dispatch(SettingsActions.loadSettings());
  }
}
