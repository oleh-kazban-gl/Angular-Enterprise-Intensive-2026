import { Injectable, inject } from '@angular/core';

import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';

import { CreatePostActions } from './create-post.actions';
import { CreatePostService } from './create-post.service';

@Injectable()
export class CreatePostEffects {
  private readonly actions$ = inject(Actions);
  private readonly createPostService = inject(CreatePostService);
  private readonly router = inject(Router);

  createPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreatePostActions.createPost),
      switchMap(({ payload }) =>
        this.createPostService.create(payload).pipe(
          map(post => CreatePostActions.createPostSuccess({ post })),
          catchError(error => of(CreatePostActions.createPostFailure({ error: error.message ?? String(error) })))
        )
      )
    )
  );

  createPostSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CreatePostActions.createPostSuccess),
        tap(() => this.router.navigate(['/posts']))
      ),
    { dispatch: false }
  );
}
