import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { LocalStorageService } from './storage/local-storage.service';

const TOKEN_KEY = 'token';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const storage = inject(LocalStorageService);
  const token = storage.getItem<string>(TOKEN_KEY);

  if (!token) {
    console.warn('[AuthInterceptor] No token found, skipping authentication header.');
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
  });

  console.warn('[AuthInterceptor] Adding authentication header: ', req.url);
  return next(authReq);
};
