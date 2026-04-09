import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { FeedActions } from './feed.actions';
import { FeedPost } from './feed.models';
import { selectAllPosts, selectFeedLoading, selectFeedError } from './feed.selectors';

@Injectable()
export class FeedFacade {
  private readonly store = inject(Store);

  readonly posts$: Observable<FeedPost[]> = this.store.select(selectAllPosts);
  readonly loading$: Observable<boolean> = this.store.select(selectFeedLoading);
  readonly error$: Observable<string | null> = this.store.select(selectFeedError);

  loadFeed(): void {
    this.store.dispatch(FeedActions.loadFeed());
  }

  toggleLike(postId: string, liked: boolean): void {
    this.store.dispatch(FeedActions.toggleLike({ postId, liked }));
  }
}
