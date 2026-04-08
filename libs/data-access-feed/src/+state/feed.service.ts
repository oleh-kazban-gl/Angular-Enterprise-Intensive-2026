import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { FeedPost } from './feed.models';

@Injectable({ providedIn: 'root' })
export class FeedService {
  private readonly http = inject(HttpClient);

  getPosts() {
    return this.http.get<FeedPost[]>('/posts');
  }

  likePost(postId: string, likes: number) {
    return this.http.patch<FeedPost>(`/posts/${postId}`, { likes });
  }
}
