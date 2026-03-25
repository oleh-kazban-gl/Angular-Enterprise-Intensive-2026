import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';

import { FeedPost } from './feed.models';

@Injectable({ providedIn: 'root' })
export class FeedService {
  private readonly http = inject(HttpClient);

  readonly posts = signal<FeedPost[]>([]);

  getPosts(): void {
    this.http.get<FeedPost[]>('http://localhost:3333/posts').subscribe(posts => this.posts.set(posts));
  }
}
