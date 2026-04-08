import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { selectToken } from './auth.selectors';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(Store).selectSignal(selectToken)();

  if (!token) {
    return next(req);
  }

  return next(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }));
};
