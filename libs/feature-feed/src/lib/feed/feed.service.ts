import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';

import { delay, finalize } from 'rxjs';

import { FeedPost } from './feed.models';

@Injectable({ providedIn: 'root' })
export class FeedService {
  private readonly http = inject(HttpClient);

  readonly posts = signal<FeedPost[]>([]);
  readonly loading = signal(false);

  getPosts(): void {
    this.loading.set(true);
    this.http
      .get<FeedPost[]>('/posts')
      .pipe(
        delay(2000),
        finalize(() => this.loading.set(false))
      )
      .subscribe(posts => this.posts.set(posts));
  }
}
