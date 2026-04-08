import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { UserProfile } from './profile.models';

export const ProfileActions = createActionGroup({
  source: 'Profile',
  events: {
    'Load Profile': emptyProps(),
    'Load Profile Success': props<{ profile: UserProfile }>(),
    'Load Profile Failure': props<{ error: string }>(),
  },
});
