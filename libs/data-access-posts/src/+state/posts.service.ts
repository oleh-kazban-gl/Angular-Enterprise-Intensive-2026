import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { map } from 'rxjs';

import { Comment, PagedPostsResponse, Post } from './posts.models';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private readonly http = inject(HttpClient);

  getFeedPage(page: number, size: number) {
    return this.http
      .get<Post[]>('/posts', {
        params: { _page: page, _limit: size, _embed: 'comments' },
        observe: 'response',
      })
      .pipe(
        map(
          response =>
            ({
              posts: response.body ?? [],
              totalItems: Number(response.headers.get('X-Total-Count') ?? 0),
            }) satisfies PagedPostsResponse
        )
      );
  }

  getPost(id: string) {
    return this.http.get<Post>(`/posts/${id}`, { params: { _embed: 'comments' } });
  }

  toggleLike(postId: string, liked: boolean) {
    return this.http.patch<Post>(`/posts/${postId}`, { liked });
  }

  addComment(postId: string, content: string, author: string) {
    return this.http.post<Comment>('/comments', {
      postId,
      content,
      author,
      createdAt: new Date().toISOString(),
    });
  }
}
