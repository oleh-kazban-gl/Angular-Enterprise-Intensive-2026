import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { Subject } from 'rxjs';
import { firstValueFrom, of, throwError } from 'rxjs';

import { CreatePostEffects } from './create-post.effects';
import { CreatePostActions } from './create-post.actions';
import { CreatePostService } from './create-post.service';
import { Post } from './create-post.models';

jest.mock('./create-post.service');

const mockPost: Post = {
  id: '1',
  author: 'alice',
  images: [],
  caption: 'Hello',
  location: null,
  collaborators: [],
  hashtags: [],
  createdAt: '2024-01-01T00:00:00Z',
};

describe('CreatePostEffects', () => {
  let effects: CreatePostEffects;
  let actions$: Subject<Action>;
  let createPostService: jest.Mocked<CreatePostService>;
  let navigate: jest.Mock;

  beforeEach(() => {
    actions$ = new Subject<Action>();
    navigate = jest.fn();

    TestBed.configureTestingModule({
      providers: [
        CreatePostEffects,
        provideMockActions(() => actions$),
        CreatePostService,
        { provide: Router, useValue: { navigate } },
      ],
    });

    effects = TestBed.inject(CreatePostEffects);
    createPostService = TestBed.inject(CreatePostService) as jest.Mocked<CreatePostService>;
  });

  describe('createPost$', () => {
    it('dispatches createPostSuccess on successful creation', async () => {
      createPostService.create.mockReturnValue(of(mockPost));
      const result = firstValueFrom(effects.createPost$);
      actions$.next(CreatePostActions.createPost({ payload: {} as never }));
      expect(await result).toEqual(CreatePostActions.createPostSuccess({ post: mockPost }));
    });

    it('dispatches createPostFailure on error', async () => {
      createPostService.create.mockReturnValue(throwError(() => new Error('server error')));
      const result = firstValueFrom(effects.createPost$);
      actions$.next(CreatePostActions.createPost({ payload: {} as never }));
      expect(await result).toEqual(CreatePostActions.createPostFailure({ error: 'server error' }));
    });
  });

  describe('createPostSuccess$', () => {
    it('navigates to /posts on createPostSuccess', async () => {
      const result = firstValueFrom(effects.createPostSuccess$);
      actions$.next(CreatePostActions.createPostSuccess({ post: mockPost }));
      await result;
      expect(navigate).toHaveBeenCalledWith(['/posts']);
    });
  });
});
