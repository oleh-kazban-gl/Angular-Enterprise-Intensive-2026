import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'feed', pathMatch: 'full' },
  {
    path: 'feed',
    loadComponent: () => import('@gl/feature-feed').then(m => m.FeedComponent),
  },
  {
    path: 'profile',
    loadComponent: () => import('@gl/feature-profile').then(m => m.ProfileComponent),
  },
  {
    path: 'posts/:id',
    loadComponent: () => import('@gl/feature-post').then(m => m.PostComponent),
  },
  {
    path: 'not-found',
    loadComponent: () => import('@gl/feature-not-found').then(m => m.NotFoundComponent),
  },
  { path: '**', redirectTo: 'not-found' },
];
