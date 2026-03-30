import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';

import { finalize } from 'rxjs';

import { Post } from './post.models';

@Injectable({ providedIn: 'root' })
export class PostService {
  private readonly http = inject(HttpClient);

  readonly post = signal<Post | null>(null);
  readonly loading = signal(false);

  getPost(id: string): void {
    this.loading.set(true);
    this.http
      .get<Post>(`http://localhost:3333/posts/${id}`)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe(post => this.post.set(post));
  }
}
