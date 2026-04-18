import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';

import { Comment, Post } from './post.models';

@Injectable({ providedIn: 'root' })
export class PostService {
  private readonly http = inject(HttpClient);

  getPost(id: string): Observable<Post> {
    return this.http.get<Post>(`/posts/${id}`);
  }

  toggleLike(id: string, liked: boolean): Observable<Post> {
    return this.http.patch<Post>(`/posts/${id}`, { liked });
  }

  addComment(postId: string, content: string, author: string): Observable<Comment> {
    return this.http.post<Comment>('/comments', { postId, content, author, createdAt: new Date().toISOString() });
  }
}
