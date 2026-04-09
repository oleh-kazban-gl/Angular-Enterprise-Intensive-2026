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

  getStoredToken(): string | null {
    try {
      return localStorage.getItem('token');
    } catch {
      return null;
    }
  }

  saveToken(token: string): void {
    try {
      localStorage.setItem('token', token);
    } catch {
      // storage may be unavailable (private mode, quota exceeded)
    }
  }

  clearStorage(): void {
    try {
      localStorage.removeItem('token');
    } catch {
      // storage may be unavailable
    }
  }
}
