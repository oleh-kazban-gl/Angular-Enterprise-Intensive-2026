import { HttpInterceptorFn } from '@angular/common/http';

import { tap } from 'rxjs';

export const logInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(`[HTTP] ${req.method} ${req.url}`);

  return next(req).pipe(
    tap({
      next: event => console.log(`[HTTP] Response:`, event),
      error: error => console.error(`[HTTP] Error:`, error),
    })
  );
};
