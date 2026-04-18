import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { map } from 'rxjs';

import { AuthResponse, User } from './auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);

  signIn(email: string, password: string) {
    return this.http
      .post<{ accessToken: string }>('/login', { email, password })
      .pipe(map(({ accessToken }) => ({ token: accessToken }) satisfies AuthResponse));
  }

  signUp(name: string, username: string, email: string, password: string) {
    return this.http.post<{ id: string }>('/register', { name, username, email, password });
  }

  createAuthor(id: string, username: string) {
    return this.http.post<void>('/authors', { id, username, avatarUrl: null });
  }

  getCurrentUser(userId: string) {
    return this.http.get<User>(`/users/${userId}`);
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
