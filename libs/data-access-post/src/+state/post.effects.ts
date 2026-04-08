import { Injectable, inject } from '@angular/core';

import { tap, catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

import { NotificationService } from '@gl/util-services';
import { PostActions } from './post.actions';
import { selectPost, selectPostId } from './post.selectors';
import { PostService } from './post.service';

@Injectable()
export class PostEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly postService = inject(PostService);
  private readonly notificationService = inject(NotificationService);
  private readonly translate = inject(TranslateService);

  loadPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.loadPost),
      withLatestFrom(this.store.select(selectPostId)),
      switchMap(([, postId]) =>
        this.postService.getPost(postId!).pipe(
          map(post => PostActions.loadPostSuccess({ post })),
          catchError(error => of(PostActions.loadPostFailure({ error: error.message ?? String(error) })))
        )
      )
    )
  );

  toggleLike$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.toggleLike),
      withLatestFrom(this.store.select(selectPost)),
      switchMap(([{ liked }, post]) => {
        // post already has the optimistic value; derive the pre-toggle values from it
        const optimisticLikes = post!.likes;
        const previousLikes = liked ? optimisticLikes - 1 : optimisticLikes + 1;
        const previousLiked = !liked;
        return this.postService.toggleLike(post!.id, liked).pipe(
          map(updated => PostActions.toggleLikeSuccess({ likes: updated.likes, liked: updated.liked })),
          catchError(error =>
            of(PostActions.toggleLikeFailure({ previousLikes, previousLiked, error: error.message ?? String(error) }))
          )
        );
      })
    )
  );

  notifyToggleLike$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PostActions.toggleLikeSuccess),
        tap(({ liked }) => {
          const key = liked ? 'notifications.liked' : 'notifications.unliked';
          this.notificationService.success(this.translate.instant(key));
        })
      ),
    { dispatch: false }
  );
}
