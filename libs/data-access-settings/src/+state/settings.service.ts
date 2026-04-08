import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { AppSettings } from './settings.models';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private readonly http = inject(HttpClient);

  getSettings() {
    return this.http.get<AppSettings>('/settings');
  }
}
