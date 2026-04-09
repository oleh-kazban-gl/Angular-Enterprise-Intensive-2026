import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { PagedFeedResponse, FeedPost } from './feed.models';

@Injectable({ providedIn: 'root' })
export class FeedService {
  private readonly http = inject(HttpClient);

  getPosts(page: number, size: number) {
    return this.http.get<PagedFeedResponse>('/posts', {
      params: { _page: page, _per_page: size },
    });
  }

  toggleLike(postId: string, liked: boolean) {
    return this.http.patch<FeedPost>(`/posts/${postId}`, { liked });
  }
}
