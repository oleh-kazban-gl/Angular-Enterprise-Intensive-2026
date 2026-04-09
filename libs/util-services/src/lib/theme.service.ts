import { DOCUMENT } from '@angular/common';
import { Injectable, effect, inject, signal } from '@angular/core';

import { CookiesStorageService } from './storage/cookies-storage.service';

const THEME_KEY = 'preferred-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly cookiesStorage = inject(CookiesStorageService);

  readonly isDark = signal(
    this.cookiesStorage.getItem<string>(THEME_KEY) === 'dark' ||
      (this.cookiesStorage.getItem<string>(THEME_KEY) === null &&
        !!this.document.defaultView?.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  constructor() {
    effect(() => {
      const theme = this.isDark() ? 'dark' : 'light';
      this.document.documentElement.setAttribute('data-theme', theme);
      this.cookiesStorage.setItem(THEME_KEY, theme);
    });
  }

  toggleTheme(): void {
    this.isDark.update(v => !v);
  }
}
