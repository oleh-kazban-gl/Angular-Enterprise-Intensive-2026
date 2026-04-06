import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

import { tap } from 'rxjs';

import { AuthResponse } from './auth.service.models';
import { LocalStorageService } from './storage/local-storage.service';

const AUTH_KEY = 'isLoggedIn';
const TOKEN_KEY = 'token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly storage = inject(LocalStorageService);
  private readonly http = inject(HttpClient);

  readonly isLoggedIn = signal(this.storage.getItem<string>(AUTH_KEY) === 'true');

  signIn() {
    return this.http.get<AuthResponse>('/auth').pipe(
      tap(({ token }) => {
        this.storage.setItem(TOKEN_KEY, token);
        this.storage.setItem(AUTH_KEY, 'true');
        this.isLoggedIn.set(true);
      })
    );
  }

  signOut(): void {
    this.storage.removeItem(TOKEN_KEY);
    this.storage.removeItem(AUTH_KEY);
    this.isLoggedIn.set(false);
  }
}
