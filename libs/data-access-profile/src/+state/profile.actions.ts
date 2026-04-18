import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { UpdateProfilePayload, UserProfile } from './profile.models';

export const ProfileActions = createActionGroup({
  source: 'Profile',
  events: {
    'Load Profile': emptyProps(),
    'Load Profile Success': props<{ profile: UserProfile }>(),
    'Load Profile Failure': props<{ error: string }>(),
    'Update Profile': props<{ payload: UpdateProfilePayload }>(),
    'Update Profile Success': props<{ profile: UserProfile }>(),
    'Update Profile Failure': props<{ error: string }>(),
  },
});
