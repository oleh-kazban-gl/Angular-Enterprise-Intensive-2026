import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';

import { finalize } from 'rxjs';

import { UserProfile } from './profile.models';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly http = inject(HttpClient);

  readonly profile = signal<UserProfile | null>(null);
  readonly loading = signal(false);

  getProfile(): void {
    this.loading.set(true);
    this.http
      .get<UserProfile>('/profile')
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe(profile => this.profile.set(profile));
  }
}
