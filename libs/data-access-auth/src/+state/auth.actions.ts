import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Restore Auth': emptyProps(),
    'Restore Auth Success': props<{ token: string }>(),
    'Restore Auth Complete': emptyProps(),
    'Sign In': props<{ email: string; password: string }>(),
    'Sign In Success': props<{ token: string }>(),
    'Sign In Failure': props<{ error: string }>(),
    'Sign Up': props<{ name: string; email: string; password: string }>(),
    'Sign Up Success': emptyProps(),
    'Sign Up Failure': props<{ error: string }>(),
    'Sign Out': emptyProps(),
    'Sign Out Success': emptyProps(),
    'Sign Out Failure': props<{ error: string }>(),
  },
});
