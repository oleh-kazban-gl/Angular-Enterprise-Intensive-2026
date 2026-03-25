import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { map } from 'rxjs';

import { AppSettings } from './settings.models';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private readonly http = inject(HttpClient);

  private readonly settings = signal<AppSettings | null>(null);

  readonly languages = computed(() => this.settings()?.languages ?? []);

  getSettings(): void {
    this.http
      .get<AppSettings>('http://localhost:3333/settings')
      .pipe(map(settings => settings))
      .subscribe(settings => this.settings.set(settings));
  }
}
