import { Injectable, inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { FeedActions } from './feed.actions';
import { selectAllPosts, selectFeedLoading, selectFeedError } from './feed.selectors';

@Injectable()
export class FeedFacade {
  private readonly store = inject(Store);

  readonly posts$ = this.store.select(selectAllPosts);
  readonly loading$ = this.store.select(selectFeedLoading);
  readonly error$ = this.store.select(selectFeedError);

  loadFeed(): void {
    this.store.dispatch(FeedActions.loadFeed());
  }

  likePost(postId: string): void {
    this.store.dispatch(FeedActions.likePost({ postId }));
  }
}
