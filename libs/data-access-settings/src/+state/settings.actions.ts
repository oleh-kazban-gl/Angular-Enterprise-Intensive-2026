import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { AppSettings } from './settings.models';

export const SettingsActions = createActionGroup({
  source: 'Settings',
  events: {
    'Load Settings': emptyProps(),
    'Load Settings Success': props<{ settings: AppSettings }>(),
    'Load Settings Failure': props<{ error: string }>(),
  },
});
