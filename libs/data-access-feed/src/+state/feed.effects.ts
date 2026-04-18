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
      switchMap(({ page, size }) =>
        this.feedService.getPosts(page, size).pipe(
          map(response =>
            FeedActions.loadFeedSuccess({
              posts: response.posts,
              pagination: {
                page,
                size,
                totalItems: response.totalItems,
                totalPages: Math.ceil(response.totalItems / size),
              },
            })
          ),
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
        // entities already has the optimistic value; derive the pre-toggle values from it
        const optimisticLikes = entities[postId]?.likes ?? 0;
        const previousLikes = liked ? optimisticLikes - 1 : optimisticLikes + 1;
        const previousLiked = !liked;
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

  addComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedActions.addComment),
      switchMap(({ postId, content, author }) =>
        this.feedService.addComment(postId, content, author).pipe(
          map(() => FeedActions.addCommentSuccess({ postId })),
          catchError(error => of(FeedActions.addCommentFailure({ postId, error: error.message ?? String(error) })))
        )
      )
    )
  );

  notifyAddComment$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FeedActions.addCommentSuccess),
        tap(() => {
          this.notificationService.success(this.translate.instant('notifications.commentAdded'));
        })
      ),
    { dispatch: false }
  );
}
