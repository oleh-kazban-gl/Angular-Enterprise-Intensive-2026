import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { UpdateProfilePayload, UserProfile } from './profile.models';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly http = inject(HttpClient);

  private readonly AVATAR_SIZE = 128;

  getProfile(userId: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(`/profile/${userId}`);
  }

  updateProfile(userId: string, payload: UpdateProfilePayload): Observable<UserProfile> {
    const avatar$: Observable<string | null> = payload.avatar ? this.fileToDataUrl(payload.avatar) : of(null);

    return avatar$.pipe(
      switchMap((avatarDataUrl: string | null) => {
        const body: Partial<UserProfile> = { bio: payload.bio };
        if (avatarDataUrl !== null) {
          body.avatar = avatarDataUrl;
        }
        return this.http.patch<UserProfile>(`/profile/${userId}`, body);
      })
    );
  }

  private fileToDataUrl(file: File): Observable<string> {
    return new Observable<string>(observer => {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);

      img.onload = () => {
        URL.revokeObjectURL(objectUrl);
        const canvas = document.createElement('canvas');
        canvas.width = this.AVATAR_SIZE;
        canvas.height = this.AVATAR_SIZE;

        const ctx = canvas.getContext('2d')!;
        const size = Math.min(img.naturalWidth, img.naturalHeight);
        const offsetX = (img.naturalWidth - size) / 2;
        const offsetY = (img.naturalHeight - size) / 2;
        ctx.drawImage(img, offsetX, offsetY, size, size, 0, 0, this.AVATAR_SIZE, this.AVATAR_SIZE);

        observer.next(canvas.toDataURL('image/jpeg', 0.85));
        observer.complete();
      };

      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        observer.error(new Error('Failed to load image'));
      };

      img.src = objectUrl;
    });
  }
}
