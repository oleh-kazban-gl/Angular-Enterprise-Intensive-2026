import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { catchError, throwError } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import { NotificationService } from './notification.service';

const STATUS_KEYS: Record<number, string> = {
  400: 'errors.400',
  404: 'errors.404',
  500: 'errors.500',
  503: 'errors.503',
  504: 'errors.504',
};

function resolveMessageKey(error: HttpErrorResponse): string {
  return STATUS_KEYS[error.status] ?? 'errors.unknown';
}

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notification = inject(NotificationService);
  const translate = inject(TranslateService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const message = translate.instant(resolveMessageKey(error));

      notification.error(message);

      return throwError(() => error);
    })
  );
};
