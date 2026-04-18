import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Subject } from 'rxjs';
import { firstValueFrom, of, throwError } from 'rxjs';

import { selectCurrentUserId } from '@gl/data-access-auth';
import { ProfileEffects } from './profile.effects';
import { ProfileActions } from './profile.actions';
import { ProfileService } from './profile.service';
import { UserProfile } from './profile.models';

jest.mock('./profile.service');

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

describe('ProfileEffects', () => {
  let effects: ProfileEffects;
  let actions$: Subject<Action>;
  let profileService: jest.Mocked<ProfileService>;
  let store: MockStore;

  beforeEach(() => {
    actions$ = new Subject<Action>();

    TestBed.configureTestingModule({
      providers: [
        ProfileEffects,
        provideMockActions(() => actions$),
        ProfileService,
        provideMockStore({
          selectors: [{ selector: selectCurrentUserId, value: 'u1' }],
        }),
      ],
    });

    effects = TestBed.inject(ProfileEffects);
    profileService = TestBed.inject(ProfileService) as jest.Mocked<ProfileService>;
    store = TestBed.inject(MockStore);
  });

  describe('loadProfile$', () => {
    it('dispatches loadProfileSuccess on success', async () => {
      profileService.getProfile.mockReturnValue(of(mockProfile));
      const result = firstValueFrom(effects.loadProfile$);
      actions$.next(ProfileActions.loadProfile());
      expect(await result).toEqual(ProfileActions.loadProfileSuccess({ profile: mockProfile }));
    });

    it('dispatches loadProfileFailure on error', async () => {
      profileService.getProfile.mockReturnValue(throwError(() => new Error('server error')));
      const result = firstValueFrom(effects.loadProfile$);
      actions$.next(ProfileActions.loadProfile());
      expect(await result).toEqual(ProfileActions.loadProfileFailure({ error: 'server error' }));
    });
  });
});
