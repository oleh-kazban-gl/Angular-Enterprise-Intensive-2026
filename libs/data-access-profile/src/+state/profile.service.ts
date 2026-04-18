import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { UserProfile } from './profile.models';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly http = inject(HttpClient);

  getProfile(userId: string) {
    return this.http.get<UserProfile>(`/profile/${userId}`);
  }
}
