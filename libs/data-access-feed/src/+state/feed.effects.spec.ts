import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Subject } from 'rxjs';
import { firstValueFrom, of, throwError } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';

import { NotificationService } from '@gl/util-services';
import { FeedEffects } from './feed.effects';
import { FeedActions } from './feed.actions';
import { FeedService } from './feed.service';
import { selectPostEntities } from './feed.selectors';
import { FeedPost, PagedFeedResponse } from './feed.models';

jest.mock('./feed.service');
jest.mock('@gl/util-services');
jest.mock('@ngx-translate/core');

const makePost = (id: string, likes = 0, liked = false): FeedPost => ({
  id,
  author: 'alice',
  avatarUrl: '',
  time: '1m',
  images: [],
  caption: '',
  location: null,
  likes,
  liked,
  createdAt: '',
});

describe('FeedEffects', () => {
  let effects: FeedEffects;
  let actions$: Subject<Action>;
  let feedService: jest.Mocked<FeedService>;
  let store: MockStore;

  beforeEach(() => {
    actions$ = new Subject<Action>();

    TestBed.configureTestingModule({
      providers: [
        FeedEffects,
        provideMockActions(() => actions$),
        provideMockStore({
          selectors: [{ selector: selectPostEntities, value: {} }],
        }),
        FeedService,
        NotificationService,
        TranslateService,
      ],
    });

    effects = TestBed.inject(FeedEffects);
    feedService = TestBed.inject(FeedService) as jest.Mocked<FeedService>;
    store = TestBed.inject(MockStore);
  });

  describe('loadFeed$', () => {
    it('dispatches loadFeedSuccess with posts and pagination on success', async () => {
      const posts = [makePost('1'), makePost('2')];
      const response: PagedFeedResponse = {
        data: posts,
        items: 10,
        pages: 2,
        first: 1,
        prev: null,
        next: 2,
        last: 2,
      };
      feedService.getPosts.mockReturnValue(of(response));

      const result = firstValueFrom(effects.loadFeed$);
      actions$.next(FeedActions.loadFeed({ page: 1, size: 5 }));

      expect(await result).toEqual(
        FeedActions.loadFeedSuccess({
          posts,
          pagination: { page: 1, size: 5, totalItems: 10, totalPages: 2 },
        })
      );
    });

    it('dispatches loadFeedFailure on error', async () => {
      feedService.getPosts.mockReturnValue(throwError(() => new Error('network error')));

      const result = firstValueFrom(effects.loadFeed$);
      actions$.next(FeedActions.loadFeed({ page: 1, size: 5 }));

      expect(await result).toEqual(FeedActions.loadFeedFailure({ error: 'network error' }));
    });
  });

  describe('toggleLike$', () => {
    it('dispatches toggleLikeSuccess with server values on success', async () => {
      const serverPost = makePost('p1', 6, true);
      feedService.toggleLike.mockReturnValue(of(serverPost));
      store.overrideSelector(selectPostEntities, { p1: makePost('p1', 6, true) });
      store.refreshState();

      const result = firstValueFrom(effects.toggleLike$);
      actions$.next(FeedActions.toggleLike({ postId: 'p1', liked: true }));

      const action = await result;
      expect(action).toEqual(FeedActions.toggleLikeSuccess({ postId: 'p1', likes: 6, liked: true }));
    });

    it('dispatches toggleLikeFailure on error', async () => {
      feedService.toggleLike.mockReturnValue(throwError(() => new Error('like failed')));
      store.overrideSelector(selectPostEntities, { p1: makePost('p1', 5, false) });
      store.refreshState();

      const result = firstValueFrom(effects.toggleLike$);
      actions$.next(FeedActions.toggleLike({ postId: 'p1', liked: true }));

      const action = await result;
      expect(action.type).toBe(FeedActions.toggleLikeFailure.type);
    });
  });
});
