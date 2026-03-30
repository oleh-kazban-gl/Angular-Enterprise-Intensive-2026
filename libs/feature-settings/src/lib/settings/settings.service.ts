import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { finalize, map } from 'rxjs';

import { AppSettings } from './settings.models';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private readonly http = inject(HttpClient);

  private readonly settings = signal<AppSettings | null>(null);

  readonly languages = computed(() => this.settings()?.languages ?? []);
  readonly loading = signal(false);

  getSettings(): void {
    this.loading.set(true);
    this.http
      .get<AppSettings>('http://localhost:3333/settings')
      .pipe(
        map(settings => settings),
        finalize(() => this.loading.set(false))
      )
      .subscribe(settings => this.settings.set(settings));
  }
}
