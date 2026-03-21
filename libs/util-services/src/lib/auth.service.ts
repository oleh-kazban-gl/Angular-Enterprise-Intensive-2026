import { inject, Injectable, signal } from '@angular/core';

import { LocalStorageService } from './storage/local-storage.service';

const STORAGE_KEY = 'isLoggedIn';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly storage = inject(LocalStorageService);

  readonly isLoggedIn = signal(this.storage.getItem<string>(STORAGE_KEY) === 'true');

  signIn(): void {
    this.storage.setItem(STORAGE_KEY, 'true');
    this.isLoggedIn.set(true);
  }

  signOut(): void {
    this.storage.removeItem(STORAGE_KEY);
    this.isLoggedIn.set(false);
  }
}
