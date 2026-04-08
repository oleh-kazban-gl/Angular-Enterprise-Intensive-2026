import { Injectable, inject } from '@angular/core';

import { switchMap, catchError, map, of, withLatestFrom } from 'rxjs';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { FeedActions } from './feed.actions';
import { selectPostEntities } from './feed.selectors';
import { FeedService } from './feed.service';

@Injectable()
export class FeedEffects {
  private readonly actions$ = inject(Actions);
  private readonly feedService = inject(FeedService);
  private readonly store = inject(Store);

  loadFeed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedActions.loadFeed),
      switchMap(() =>
        this.feedService.getPosts().pipe(
          map(posts => FeedActions.loadFeedSuccess({ posts })),
          catchError(error => of(FeedActions.loadFeedFailure({ error: error.message })))
        )
      )
    )
  );

  likePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedActions.likePost),
      withLatestFrom(this.store.select(selectPostEntities)),
      switchMap(([{ postId }, entities]) => {
        const previousLikes = entities[postId]?.likes ?? 0;
        const newLikes = previousLikes + 1;
        return this.feedService.likePost(postId, newLikes).pipe(
          map(post => FeedActions.likePostSuccess({ postId, likes: post.likes })),
          catchError(error =>
            of(FeedActions.likePostFailure({ postId, previousLikes: previousLikes - 1, error: error.message }))
          )
        );
      })
    )
  );
}
