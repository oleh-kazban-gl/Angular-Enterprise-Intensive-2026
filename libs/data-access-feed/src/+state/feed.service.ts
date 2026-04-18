import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { map } from 'rxjs';

import { FeedComment, PagedFeedResponse, FeedPost } from './feed.models';

@Injectable({ providedIn: 'root' })
export class FeedService {
  private readonly http = inject(HttpClient);

  getPosts(page: number, size: number) {
    return this.http
      .get<FeedPost[]>('/posts', {
        params: { _page: page, _limit: size },
        observe: 'response',
      })
      .pipe(
        map(
          response =>
            ({
              posts: response.body ?? [],
              totalItems: Number(response.headers.get('X-Total-Count') ?? 0),
            }) satisfies PagedFeedResponse
        )
      );
  }

  toggleLike(postId: string, liked: boolean) {
    return this.http.patch<FeedPost>(`/posts/${postId}`, { liked });
  }

  addComment(postId: string, content: string, author: string) {
    return this.http.post<FeedComment>('/comments', { postId, content, author, createdAt: new Date().toISOString() });
  }
}
