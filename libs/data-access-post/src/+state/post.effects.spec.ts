import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Subject } from 'rxjs';
import { firstValueFrom, of, throwError } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';

import { NotificationService } from '@gl/util-services';
import { PostEffects } from './post.effects';
import { PostActions } from './post.actions';
import { PostService } from './post.service';
import { selectPost, selectPostId } from './post.selectors';
import { Post } from './post.models';

jest.mock('./post.service');
jest.mock('@gl/util-services');
jest.mock('@ngx-translate/core');

const mockPost: Post = {
  id: 'p1',
  author: 'alice',
  time: '2h',
  images: [],
  caption: 'Test',
  location: null,
  collaborators: [],
  hashtags: [],
  likes: 5,
  liked: false,
  createdAt: '2024-01-01T00:00:00Z',
};

describe('PostEffects', () => {
  let effects: PostEffects;
  let actions$: Subject<Action>;
  let postService: jest.Mocked<PostService>;
  let store: MockStore;

  beforeEach(() => {
    actions$ = new Subject<Action>();

    TestBed.configureTestingModule({
      providers: [
        PostEffects,
        provideMockActions(() => actions$),
        provideMockStore({
          selectors: [
            { selector: selectPostId, value: 'p1' },
            { selector: selectPost, value: null },
          ],
        }),
        PostService,
        NotificationService,
        TranslateService,
      ],
    });

    effects = TestBed.inject(PostEffects);
    postService = TestBed.inject(PostService) as jest.Mocked<PostService>;
    store = TestBed.inject(MockStore);
  });

  describe('loadPost$', () => {
    it('dispatches loadPostSuccess when postId is available and request succeeds', async () => {
      store.overrideSelector(selectPostId, 'p1');
      store.refreshState();
      postService.getPost.mockReturnValue(of(mockPost));

      const result = firstValueFrom(effects.loadPost$);
      actions$.next(PostActions.loadPost());

      expect(await result).toEqual(PostActions.loadPostSuccess({ post: mockPost }));
      expect(postService.getPost).toHaveBeenCalledWith('p1');
    });

    it('dispatches loadPostFailure when postId is null', async () => {
      store.overrideSelector(selectPostId, undefined);
      store.refreshState();

      const result = firstValueFrom(effects.loadPost$);
      actions$.next(PostActions.loadPost());

      expect(await result).toEqual(PostActions.loadPostFailure({ error: 'No post ID in route' }));
    });

    it('dispatches loadPostFailure on HTTP error', async () => {
      store.overrideSelector(selectPostId, 'p1');
      store.refreshState();
      postService.getPost.mockReturnValue(throwError(() => new Error('not found')));

      const result = firstValueFrom(effects.loadPost$);
      actions$.next(PostActions.loadPost());

      expect(await result).toEqual(PostActions.loadPostFailure({ error: 'not found' }));
    });
  });

  describe('toggleLike$', () => {
    it('dispatches toggleLikeSuccess with server values on success', async () => {
      const updatedPost = { ...mockPost, likes: 6, liked: true };
      store.overrideSelector(selectPost, { ...mockPost, likes: 6, liked: true });
      store.refreshState();
      postService.toggleLike.mockReturnValue(of(updatedPost));

      const result = firstValueFrom(effects.toggleLike$);
      actions$.next(PostActions.toggleLike({ liked: true }));

      expect(await result).toEqual(PostActions.toggleLikeSuccess({ likes: 6, liked: true }));
    });

    it('dispatches toggleLikeFailure when post is null', async () => {
      store.overrideSelector(selectPost, null);
      store.refreshState();

      const result = firstValueFrom(effects.toggleLike$);
      actions$.next(PostActions.toggleLike({ liked: true }));

      expect(await result).toEqual(
        PostActions.toggleLikeFailure({ previousLikes: 0, previousLiked: false, error: 'Post not loaded' })
      );
    });

    it('dispatches toggleLikeFailure on HTTP error', async () => {
      store.overrideSelector(selectPost, { ...mockPost, likes: 6, liked: true });
      store.refreshState();
      postService.toggleLike.mockReturnValue(throwError(() => new Error('like failed')));

      const result = firstValueFrom(effects.toggleLike$);
      actions$.next(PostActions.toggleLike({ liked: true }));

      const action = await result;
      expect(action.type).toBe(PostActions.toggleLikeFailure.type);
    });
  });
});
