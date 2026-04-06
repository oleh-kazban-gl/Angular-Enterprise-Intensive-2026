import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { CreatePostPayload, Post } from './create-post.models';

@Injectable({ providedIn: 'root' })
export class CreatePostService {
  private readonly http = inject(HttpClient);

  create(payload: CreatePostPayload): Observable<Post> {
    const image = URL.createObjectURL(payload.photo);

    const body = {
      author: payload.author,
      image,
      caption: payload.caption,
      location: typeof payload.location === 'string' ? payload.location : (payload.location?.name ?? null),
      collaborators: payload.collaborators,
      hashtags: payload.hashtags,
      createdAt: new Date().toISOString(),
    };

    return this.http.post<Post>('/posts', body);
  }
}
