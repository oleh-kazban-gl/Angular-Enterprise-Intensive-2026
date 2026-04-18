import { createFeature, createReducer, on } from '@ngrx/store';

import { CallState } from '@gl/util-ngrx';
import { ProfileActions } from './profile.actions';
import { UserProfile } from './profile.models';

export const PROFILE_FEATURE_KEY = 'profile';

export interface ProfileState {
  profile: UserProfile | null;
  callState: CallState;
  saveState: CallState;
}

const initialState: ProfileState = {
  profile: null,
  callState: 'init',
  saveState: 'init',
};

export const profileFeature = createFeature({
  name: PROFILE_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(ProfileActions.loadProfile, state => ({ ...state, callState: 'loading' as const })),
    on(ProfileActions.loadProfileSuccess, (state, { profile }) => ({
      ...state,
      profile,
      callState: 'loaded' as const,
    })),
    on(ProfileActions.loadProfileFailure, (state, { error }) => ({
      ...state,
      callState: { error },
    })),
    on(ProfileActions.updateProfile, state => ({ ...state, saveState: 'loading' as const })),
    on(ProfileActions.updateProfileSuccess, (state, { profile }) => ({
      ...state,
      profile,
      saveState: 'loaded' as const,
    })),
    on(ProfileActions.updateProfileFailure, (state, { error }) => ({
      ...state,
      saveState: { error },
    }))
  ),
});

export const { name, reducer: profileReducer, selectProfileState } = profileFeature;
