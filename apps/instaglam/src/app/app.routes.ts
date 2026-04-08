import { Route } from '@angular/router';

import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { FeedEffects, FeedFacade, FEED_FEATURE_KEY, feedReducer } from '@gl/data-access-feed';
import { PostEffects, PostFacade, POST_FEATURE_KEY, postReducer } from '@gl/data-access-post';
import { ProfileEffects, ProfileFacade, PROFILE_FEATURE_KEY, profileReducer } from '@gl/data-access-profile';
import { SettingsEffects, SettingsFacade, SETTINGS_FEATURE_KEY, settingsReducer } from '@gl/data-access-settings';
import {
  CreatePostEffects,
  CreatePostFacade,
  CREATE_POST_FEATURE_KEY,
  createPostReducer,
} from '@gl/data-access-create-post';
import { authGuard } from '@gl/data-access-auth';

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
    providers: [provideState(FEED_FEATURE_KEY, feedReducer), provideEffects(FeedEffects), FeedFacade],
    children: [
      {
        path: '',
        data: { pageTitle: 'feed.title' },
        loadComponent: () => import('@gl/feature-feed').then(m => m.FeedComponent),
      },
      {
        path: ':id',
        data: { pageTitle: 'post.title', breadcrumb: 'post.title' },
        providers: [provideState(POST_FEATURE_KEY, postReducer), provideEffects(PostEffects), PostFacade],
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
    providers: [
      provideState(CREATE_POST_FEATURE_KEY, createPostReducer),
      provideEffects(CreatePostEffects),
      CreatePostFacade,
    ],
    loadComponent: () => import('@gl/feature-create-post').then(m => m.CreatePostComponent),
  },
  {
    path: 'settings',
    canActivate: [authGuard],
    data: { pageTitle: 'settings.title' },
    providers: [provideState(SETTINGS_FEATURE_KEY, settingsReducer), provideEffects(SettingsEffects), SettingsFacade],
    loadComponent: () => import('@gl/feature-settings').then(m => m.SettingsComponent),
  },
  {
    path: 'not-found',
    loadComponent: () => import('@gl/feature-not-found').then(m => m.NotFoundComponent),
  },
  { path: '**', redirectTo: 'not-found' },
];
