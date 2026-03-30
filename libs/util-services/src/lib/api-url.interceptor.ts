import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { AppConfigService } from './app-config.service';

const NON_API_PREFIXES = ['/i18n/', '/config.json'];

export const apiUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const isRelative = req.url.startsWith('/');
  const isNonApi = NON_API_PREFIXES.some(prefix => req.url.startsWith(prefix));

  if (!isRelative || isNonApi) {
    return next(req);
  }

  const config = inject(AppConfigService);
  const url = `${config.hostBaseUrl}${config.apiBaseUrl}${req.url}`;

  return next(req.clone({ url }));
};
