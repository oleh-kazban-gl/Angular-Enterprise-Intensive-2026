import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { AuthResponse } from './auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);

  signIn(email: string, password: string) {
    return this.http.post<AuthResponse>('/auth', { email, password });
  }

  signUp(name: string, email: string, password: string) {
    return this.http.post<void>('/auth/sign-up', { name, email, password });
  }

  clearStorage(): void {
    localStorage.removeItem('token');
  }
}
