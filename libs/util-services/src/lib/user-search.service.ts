import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

export interface User {
  id: string;
  username: string;
  avatarUrl: string;
}

@Injectable({ providedIn: 'root' })
export class UserSearchService {
  private readonly http = inject(HttpClient);

  search(query: string): Observable<User[]> {
    return this.http.get<User[]>('/users', { params: { username_contains: query } });
  }
}
