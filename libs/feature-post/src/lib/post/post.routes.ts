import { Route } from '@angular/router';

import { postResolver } from './post.resolver';

export const postRoutes: Route[] = [
  {
    path: '',
    resolve: { post: postResolver },
    loadComponent: () => import('./post.component').then(m => m.PostComponent),
  },
];
