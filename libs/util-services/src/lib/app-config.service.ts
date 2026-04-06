import { HttpClient } from '@angular/common/http';
import { EnvironmentProviders, Injectable, inject, provideAppInitializer } from '@angular/core';

import { Observable, lastValueFrom, map, tap } from 'rxjs';

import { AppConfig } from './app-config.service.models';

@Injectable({ providedIn: 'root' })
export class AppConfigService {
  private readonly http = inject(HttpClient);
  private config: AppConfig = { hostBaseUrl: '', apiBaseUrl: '' };

  load(): Observable<void> {
    return this.http.get<AppConfig>('/config.json').pipe(
      tap(config => (this.config = config)),
      map(() => void 0)
    );
  }

  get hostBaseUrl(): string {
    return this.config.hostBaseUrl;
  }

  get apiBaseUrl(): string {
    return this.config.apiBaseUrl;
  }
}

export function provideAppConfig(): EnvironmentProviders {
  return provideAppInitializer(() => lastValueFrom(inject(AppConfigService).load()));
}
