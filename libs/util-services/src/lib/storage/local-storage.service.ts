import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

import { BaseStorageService } from './storage.service.models';

@Injectable({ providedIn: 'root' })
export class LocalStorageService implements BaseStorageService {
  private readonly storage = inject(DOCUMENT).defaultView?.localStorage;

  getItem<T>(key: string): T | null {
    const raw = this.storage?.getItem(key) ?? null;
    if (raw === null) {
      return null;
    }
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }

  setItem<T>(key: string, value: T): void {
    this.storage?.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    this.storage?.removeItem(key);
  }

  clear(): void {
    this.storage?.clear();
  }
}
