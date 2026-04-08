import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Sign In': emptyProps(),
    'Sign In Success': props<{ token: string }>(),
    'Sign In Failure': props<{ error: string }>(),
    'Sign Out': emptyProps(),
    'Sign Out Success': emptyProps(),
    'Sign Out Failure': props<{ error: string }>(),
  },
});
