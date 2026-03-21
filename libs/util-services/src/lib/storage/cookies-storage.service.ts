import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

import { BaseStorageService } from './storage.service.models';

@Injectable({ providedIn: 'root' })
export class CookiesStorageService implements BaseStorageService {
  private readonly document = inject(DOCUMENT);

  getItem<T>(key: string): T | null {
    const match = this.document.cookie.split('; ').find(c => c.startsWith(`${encodeURIComponent(key)}=`));
    if (!match) {
      return null;
    }
    try {
      return JSON.parse(decodeURIComponent(match.split('=')[1])) as T;
    } catch {
      return null;
    }
  }

  setItem<T>(key: string, value: T): void {
    const encoded = encodeURIComponent(JSON.stringify(value));
    this.document.cookie = `${encodeURIComponent(key)}=${encoded};path=/;SameSite=Strict`;
  }

  removeItem(key: string): void {
    this.document.cookie = `${encodeURIComponent(key)}=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT;SameSite=Strict`;
  }

  clear(): void {
    this.document.cookie
      .split('; ')
      .map(c => c.split('=')[0])
      .forEach(key => this.removeItem(decodeURIComponent(key)));
  }
}
