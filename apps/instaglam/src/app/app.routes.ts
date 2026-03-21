import { Route } from '@angular/router';

import { authGuard } from '@gl/feature-auth';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'feed', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('@gl/feature-auth').then(m => m.authRoutes),
  },
  {
    path: 'feed',
    canActivate: [authGuard],
    loadComponent: () => import('@gl/feature-feed').then(m => m.FeedComponent),
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () => import('@gl/feature-profile').then(m => m.ProfileComponent),
  },
  {
    path: 'posts/:id',
    canActivate: [authGuard],
    loadComponent: () => import('@gl/feature-post').then(m => m.PostComponent),
  },
  {
    path: 'create-post',
    canActivate: [authGuard],
    loadComponent: () => import('@gl/feature-create-post').then(m => m.CreatePostComponent),
  },
  {
    path: 'settings',
    canActivate: [authGuard],
    loadComponent: () => import('@gl/feature-settings').then(m => m.SettingsComponent),
  },
  {
    path: 'not-found',
    loadComponent: () => import('@gl/feature-not-found').then(m => m.NotFoundComponent),
  },
  { path: '**', redirectTo: 'not-found' },
];
