import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Location } from '@gl/util-services';

export interface Post {
  id: string;
  author: string;
  image: string;
  caption: string;
  location: string | null;
  collaborators: string[];
  hashtags: string[];
  createdAt: string;
}

export interface CreatePostPayload {
  author: string;
  photo: File;
  caption: string;
  location: Location | string | null;
  collaborators: string[];
  hashtags: string[];
}

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
