import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { PostActions } from './post.actions';
import { selectError, selectLoading, selectPost, selectPostId, selectSubmittingComment } from './post.selectors';

@Injectable()
export class PostFacade {
  private readonly store = inject(Store);
  private readonly actions$ = inject(Actions);

  readonly post$ = this.store.select(selectPost);
  readonly loading$ = this.store.select(selectLoading);
  readonly error$ = this.store.select(selectError);
  readonly postId$ = this.store.select(selectPostId);
  readonly submittingComment$: Observable<boolean> = this.store.select(selectSubmittingComment);
  readonly commentAdded$ = this.actions$.pipe(ofType(PostActions.addCommentSuccess));

  loadPost(): void {
    this.store.dispatch(PostActions.loadPost());
  }

  toggleLike(liked: boolean): void {
    this.store.dispatch(PostActions.toggleLike({ liked }));
  }

  addComment(content: string, author: string): void {
    this.store.dispatch(PostActions.addComment({ content, author }));
  }
}
