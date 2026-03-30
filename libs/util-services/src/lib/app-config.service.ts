import { HttpClient } from '@angular/common/http';
import { EnvironmentProviders, Injectable, inject, provideAppInitializer } from '@angular/core';

import { firstValueFrom } from 'rxjs';

interface AppConfig {
  hostBaseUrl: string;
  apiBaseUrl: string;
}

@Injectable({ providedIn: 'root' })
export class AppConfigService {
  private readonly http = inject(HttpClient);
  private config: AppConfig = { hostBaseUrl: '', apiBaseUrl: '' };

  load(): Promise<void> {
    return firstValueFrom(this.http.get<AppConfig>('/config.json')).then(config => {
      this.config = config;
    });
  }

  get hostBaseUrl(): string {
    return this.config.hostBaseUrl;
  }

  get apiBaseUrl(): string {
    return this.config.apiBaseUrl;
  }
}

export function provideAppConfig(): EnvironmentProviders {
  return provideAppInitializer(() => inject(AppConfigService).load());
}
