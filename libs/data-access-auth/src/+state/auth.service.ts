import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { AuthResponse } from './auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);

  signIn() {
    return this.http.get<AuthResponse>('/auth');
  }

  clearStorage(): void {
    localStorage.removeItem('token');
  }
}
