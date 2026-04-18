import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { PostsActions } from './posts.actions';
import { Post, PostsPagination } from './posts.models';
import {
  selectAllPosts,
  selectFeedError,
  selectFeedLoading,
  selectFeedPostIds,
  selectIsPostLoading,
  selectPagination,
  selectPostById,
  selectSubmittingCommentPostId,
} from './posts.selectors';

@Injectable()
export class PostsFacade {
  private readonly store = inject(Store);
  private readonly actions$ = inject(Actions);

  // ── Feed ──────────────────────────────────────────────────────────────────
  readonly allPosts$: Observable<Post[]> = this.store.select(selectAllPosts);
  readonly feedPostIds$: Observable<string[]> = this.store.select(selectFeedPostIds);
  readonly feedLoading$: Observable<boolean> = this.store.select(selectFeedLoading);
  readonly feedError$: Observable<string | null> = this.store.select(selectFeedError);
  readonly pagination$: Observable<PostsPagination | null> = this.store.select(selectPagination);

  // ── Comment ───────────────────────────────────────────────────────────────
  readonly submittingCommentPostId$: Observable<string | null> = this.store.select(selectSubmittingCommentPostId);
  readonly commentAdded$ = this.actions$.pipe(ofType(PostsActions.addCommentSuccess));

  // ── Per-post helpers ──────────────────────────────────────────────────────
  postById$(postId: string): Observable<Post | null> {
    return this.store.select(selectPostById(postId));
  }

  isPostLoading$(postId: string): Observable<boolean> {
    return this.store.select(selectIsPostLoading(postId));
  }

  // ── Dispatchers ───────────────────────────────────────────────────────────
  loadFeedPage(page: number, size: number): void {
    this.store.dispatch(PostsActions.loadFeedPage({ page, size }));
  }

  loadPost(postId: string): void {
    this.store.dispatch(PostsActions.loadPost({ postId }));
  }

  toggleLike(postId: string, liked: boolean): void {
    this.store.dispatch(PostsActions.toggleLike({ postId, liked }));
  }

  addComment(postId: string, content: string, author: string): void {
    this.store.dispatch(PostsActions.addComment({ postId, content, author }));
  }
}
