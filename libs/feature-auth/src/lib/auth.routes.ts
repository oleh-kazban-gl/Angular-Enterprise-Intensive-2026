import { Route } from '@angular/router';

import { authGuard, guestGuard } from './auth.guard';

export const authRoutes: Route[] = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  {
    path: 'sign-in',
    canActivate: [guestGuard],
    loadComponent: () => import('./sign-in/sign-in.component').then(m => m.SignInComponent),
  },
  {
    path: 'sign-up',
    canActivate: [guestGuard],
    loadComponent: () => import('./sign-up/sign-up.component').then(m => m.SignUpComponent),
  },
  {
    path: 'sign-out',
    canActivate: [authGuard],
    loadComponent: () => import('./sign-out/sign-out.component').then(m => m.SignOutComponent),
  },
];
