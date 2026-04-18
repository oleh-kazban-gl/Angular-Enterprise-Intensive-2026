import { ProfileActions } from './profile.actions';
import { profileReducer, ProfileState } from './profile.reducer';
import { UserProfile } from './profile.models';

const mockProfile: UserProfile = {
  id: 'u1',
  name: 'Alice',
  username: 'alice',
  avatar: 'avatar.jpg',
  bio: 'Hello',
  posts: 10,
  followers: 100,
  following: 50,
};

const initialState: ProfileState = {
  profile: null,
  callState: 'init',
  saveState: 'init',
};

describe('profileReducer', () => {
  it('returns initial state for unknown action', () => {
    const state = profileReducer(undefined, { type: '@@INIT' } as never);
    expect(state).toEqual(initialState);
  });

  it('handles loadProfile: sets callState to loading', () => {
    const state = profileReducer(initialState, ProfileActions.loadProfile());
    expect(state.callState).toBe('loading');
  });

  it('handles loadProfileSuccess: sets profile and loaded callState', () => {
    const state = profileReducer(initialState, ProfileActions.loadProfileSuccess({ profile: mockProfile }));
    expect(state.profile).toEqual(mockProfile);
    expect(state.callState).toBe('loaded');
  });

  it('handles loadProfileFailure: sets error callState', () => {
    const state = profileReducer(initialState, ProfileActions.loadProfileFailure({ error: 'not found' }));
    expect(state.callState).toEqual({ error: 'not found' });
    expect(state.profile).toBeNull();
  });
});
