import { Injectable, effect, inject, signal } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { CookiesStorageService } from './storage/cookies-storage.service';

const LANGUAGE_KEY = 'preferred-language';
const DEFAULT_LANGUAGE = 'en';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly translateService = inject(TranslateService);
  private readonly cookiesStorage = inject(CookiesStorageService);

  readonly currentLang = signal(this.cookiesStorage.getItem<string>(LANGUAGE_KEY) ?? DEFAULT_LANGUAGE);

  constructor() {
    this.translateService.use(this.currentLang());

    effect(() => {
      const lang = this.currentLang();
      this.cookiesStorage.setItem(LANGUAGE_KEY, lang);
      this.translateService.use(lang);
    });
  }

  setLanguage(code: string): void {
    this.currentLang.set(code);
  }
}
