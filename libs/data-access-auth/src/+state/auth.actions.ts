import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { User } from './auth.models';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Restore Auth': emptyProps(),
    'Restore Auth Success': props<{ token: string }>(),
    'Restore Auth Complete': emptyProps(),
    'Sign In': props<{ email: string; password: string }>(),
    'Sign In Success': props<{ token: string }>(),
    'Sign In Failure': props<{ error: string }>(),
    'Sign Up': props<{ name: string; username: string; email: string; password: string }>(),
    'Sign Up Success': emptyProps(),
    'Sign Up Failure': props<{ error: string }>(),
    'Load User Success': props<{ user: User }>(),
    'Load User Failure': props<{ error: string }>(),
    'Sign Out': emptyProps(),
    'Sign Out Success': emptyProps(),
    'Sign Out Failure': props<{ error: string }>(),
  },
});
