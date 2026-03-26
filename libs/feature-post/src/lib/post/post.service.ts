import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';

import { Post } from './post.models';

@Injectable({ providedIn: 'root' })
export class PostService {
  private readonly http = inject(HttpClient);

  getPost(id: string): Observable<Post> {
    return this.http.get<Post>(`http://localhost:3333/posts/${id}`);
  }
}
