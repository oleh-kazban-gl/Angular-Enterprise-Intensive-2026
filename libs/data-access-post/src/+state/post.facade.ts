import { Injectable, inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { PostActions } from './post.actions';
import { selectError, selectLoading, selectPost, selectPostId } from './post.selectors';

@Injectable()
export class PostFacade {
  private readonly store = inject(Store);

  readonly post$ = this.store.select(selectPost);
  readonly loading$ = this.store.select(selectLoading);
  readonly error$ = this.store.select(selectError);
  readonly postId$ = this.store.select(selectPostId);

  loadPost(): void {
    this.store.dispatch(PostActions.loadPost());
  }

  toggleLike(liked: boolean): void {
    this.store.dispatch(PostActions.toggleLike({ liked }));
  }
}
