import { Route } from '@angular/router';

import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { ProfileEffects, ProfileFacade, PROFILE_FEATURE_KEY, profileReducer } from '@gl/data-access-profile';
import { authGuard } from '@gl/util-services';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('@gl/feature-auth').then(m => m.authRoutes),
  },
  {
    path: 'posts',
    canActivate: [authGuard],
    data: { breadcrumb: 'nav.posts' },
    children: [
      {
        path: '',
        data: { pageTitle: 'feed.title' },
        loadComponent: () => import('@gl/feature-feed').then(m => m.FeedComponent),
      },
      {
        path: ':id',
        data: { pageTitle: 'post.title', breadcrumb: 'post.title' },
        loadComponent: () => import('@gl/feature-post').then(m => m.PostComponent),
      },
    ],
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    data: { pageTitle: 'profile.title' },
    providers: [provideState(PROFILE_FEATURE_KEY, profileReducer), provideEffects(ProfileEffects), ProfileFacade],
    loadComponent: () => import('@gl/feature-profile').then(m => m.ProfileComponent),
  },
  {
    path: 'create-post',
    canActivate: [authGuard],
    data: { pageTitle: 'createPost.title' },
    loadComponent: () => import('@gl/feature-create-post').then(m => m.CreatePostComponent),
  },
  {
    path: 'settings',
    canActivate: [authGuard],
    data: { pageTitle: 'settings.title' },
    loadComponent: () => import('@gl/feature-settings').then(m => m.SettingsComponent),
  },
  {
    path: 'not-found',
    loadComponent: () => import('@gl/feature-not-found').then(m => m.NotFoundComponent),
  },
  { path: '**', redirectTo: 'not-found' },
];
