import { DOCUMENT } from '@angular/common';
import { Injectable, effect, inject, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);

  readonly isDark = signal(false);

  constructor() {
    effect(() => {
      this.document.documentElement.setAttribute('data-theme', this.isDark() ? 'dark' : 'light');
    });
  }

  toggleTheme(): void {
    this.isDark.update(v => !v);
  }
}
