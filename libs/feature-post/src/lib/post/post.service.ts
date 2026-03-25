import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';

import { Post } from './post.models';

@Injectable({ providedIn: 'root' })
export class PostService {
  private readonly http = inject(HttpClient);

  readonly post = signal<Post | null>(null);

  getPost(id: string): void {
    this.http.get<Post>(`http://localhost:3333/posts/${id}`).subscribe(post => this.post.set(post));
  }
}
