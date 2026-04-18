import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Author } from './author-search.service.models';

@Injectable({ providedIn: 'root' })
export class AuthorSearchService {
  private readonly http = inject(HttpClient);

  search(query: string): Observable<Author[]> {
    return this.http.get<Author[]>('/authors', { params: { username_like: query } });
  }
}
