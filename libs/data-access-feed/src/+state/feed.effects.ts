import { Injectable, inject } from '@angular/core';

import { tap, switchMap, catchError, map, of, withLatestFrom } from 'rxjs';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

import { NotificationService } from '@gl/util-services';
import { FeedActions } from './feed.actions';
import { selectPostEntities } from './feed.selectors';
import { FeedService } from './feed.service';

@Injectable()
export class FeedEffects {
  private readonly actions$ = inject(Actions);
  private readonly feedService = inject(FeedService);
  private readonly store = inject(Store);
  private readonly notificationService = inject(NotificationService);
  private readonly translate = inject(TranslateService);

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

  toggleLike$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedActions.toggleLike),
      withLatestFrom(this.store.select(selectPostEntities)),
      switchMap(([{ postId, liked }, entities]) => {
        const previousLikes = entities[postId]?.likes ?? 0;
        const previousLiked = entities[postId]?.liked ?? false;
        return this.feedService.toggleLike(postId, liked).pipe(
          map(post => FeedActions.toggleLikeSuccess({ postId, likes: post.likes, liked: post.liked })),
          catchError(error =>
            of(FeedActions.toggleLikeFailure({ postId, previousLikes, previousLiked, error: error.message }))
          )
        );
      })
    )
  );

  notifyToggleLike$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FeedActions.toggleLikeSuccess),
        tap(({ liked }) => {
          const key = liked ? 'notifications.liked' : 'notifications.unliked';
          this.notificationService.success(this.translate.instant(key));
        })
      ),
    { dispatch: false }
  );
}
