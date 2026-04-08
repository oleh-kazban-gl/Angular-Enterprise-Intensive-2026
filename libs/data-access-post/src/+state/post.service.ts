import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';

import { Post } from './post.models';

@Injectable({ providedIn: 'root' })
export class PostService {
  private readonly http = inject(HttpClient);

  getPost(id: string): Observable<Post> {
    return this.http.get<Post>(`/posts/${id}`);
  }

  toggleLike(id: string, liked: boolean): Observable<Post> {
    return this.http.post<Post>(`/posts/${id}/like`, { liked });
  }
}
