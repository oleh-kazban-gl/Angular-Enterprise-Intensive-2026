import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { FeedActions } from './feed.actions';
import { FeedPagination, FeedPost } from './feed.models';
import { selectAllPosts, selectFeedLoading, selectFeedError, selectFeedPagination } from './feed.selectors';

@Injectable()
export class FeedFacade {
  private readonly store = inject(Store);

  readonly posts$: Observable<FeedPost[]> = this.store.select(selectAllPosts);
  readonly loading$: Observable<boolean> = this.store.select(selectFeedLoading);
  readonly error$: Observable<string | null> = this.store.select(selectFeedError);
  readonly pagination$: Observable<FeedPagination | null> = this.store.select(selectFeedPagination);

  loadFeed(page: number, size: number): void {
    this.store.dispatch(FeedActions.loadFeed({ page, size }));
  }

  toggleLike(postId: string, liked: boolean): void {
    this.store.dispatch(FeedActions.toggleLike({ postId, liked }));
  }
}
