import { EnvironmentProviders, inject, provideAppInitializer } from '@angular/core';

import { firstValueFrom } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { AuthActions } from './auth.actions';

export function provideAuthInit(): EnvironmentProviders {
  return provideAppInitializer(() => {
    const store = inject(Store);
    const actions$ = inject(Actions);

    // Subscribe BEFORE dispatching so the listener is in place before the
    // synchronous restoreAuth$ effect emits restoreAuthSuccess/Complete.
    const restored = firstValueFrom(
      actions$.pipe(ofType(AuthActions.restoreAuthSuccess, AuthActions.restoreAuthComplete))
    );
    store.dispatch(AuthActions.restoreAuth());
    return restored;
  });
}
