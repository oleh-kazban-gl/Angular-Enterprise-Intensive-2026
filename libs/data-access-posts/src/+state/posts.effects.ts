import { Injectable, inject } from '@angular/core';

import { catchError, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

import { NotificationService } from '@gl/util-services';
import { PostsActions } from './posts.actions';
import { selectPostEntities } from './posts.selectors';
import { PostsService } from './posts.service';

@Injectable()
export class PostsEffects {
  private readonly actions$ = inject(Actions);
  private readonly postsService = inject(PostsService);
  private readonly store = inject(Store);
  private readonly notificationService = inject(NotificationService);
  private readonly translate = inject(TranslateService);

  loadFeedPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.loadFeedPage),
      switchMap(({ page, size }) =>
        this.postsService.getFeedPage(page, size).pipe(
          map(response =>
            PostsActions.loadFeedPageSuccess({
              posts: response.posts,
              pagination: {
                page,
                size,
                totalItems: response.totalItems,
                totalPages: Math.ceil(response.totalItems / size),
              },
            })
          ),
          catchError(error => of(PostsActions.loadFeedPageFailure({ error: error.message ?? String(error) })))
        )
      )
    )
  );

  loadPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.loadPost),
      switchMap(({ postId }) =>
        this.postsService.getPost(postId).pipe(
          map(post => PostsActions.loadPostSuccess({ post })),
          catchError(error => of(PostsActions.loadPostFailure({ postId, error: error.message ?? String(error) })))
        )
      )
    )
  );

  toggleLike$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.toggleLike),
      withLatestFrom(this.store.select(selectPostEntities)),
      switchMap(([{ postId, liked }, entities]) => {
        const optimisticLikes = entities[postId]?.likes ?? 0;
        const previousLikes = liked ? optimisticLikes - 1 : optimisticLikes + 1;
        const previousLiked = !liked;
        return this.postsService.toggleLike(postId, liked).pipe(
          map(post => PostsActions.toggleLikeSuccess({ postId, likes: post.likes, liked: post.liked })),
          catchError(error =>
            of(
              PostsActions.toggleLikeFailure({
                postId,
                previousLikes,
                previousLiked,
                error: error.message ?? String(error),
              })
            )
          )
        );
      })
    )
  );

  notifyToggleLike$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PostsActions.toggleLikeSuccess),
        tap(({ liked }) => {
          const key = liked ? 'notifications.liked' : 'notifications.unliked';
          this.notificationService.success(this.translate.instant(key));
        })
      ),
    { dispatch: false }
  );

  addComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.addComment),
      switchMap(({ postId, content, author }) =>
        this.postsService.addComment(postId, content, author).pipe(
          map(comment => PostsActions.addCommentSuccess({ postId, comment })),
          catchError(error => of(PostsActions.addCommentFailure({ postId, error: error.message ?? String(error) })))
        )
      )
    )
  );

  notifyAddComment$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PostsActions.addCommentSuccess),
        tap(() => {
          this.notificationService.success(this.translate.instant('notifications.commentAdded'));
        })
      ),
    { dispatch: false }
  );
}
