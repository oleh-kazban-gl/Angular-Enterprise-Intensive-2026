import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';

import { UserProfile } from './profile.models';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly http = inject(HttpClient);

  readonly profile = signal<UserProfile | null>(null);

  getProfile(): void {
    this.http.get<UserProfile>('http://localhost:3333/profile').subscribe(profile => this.profile.set(profile));
  }
}
