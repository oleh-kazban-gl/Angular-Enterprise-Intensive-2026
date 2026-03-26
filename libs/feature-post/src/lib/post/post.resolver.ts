import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';

import { EMPTY, catchError } from 'rxjs';

import { Post } from './post.models';
import { PostService } from './post.service';

export const postResolver: ResolveFn<Post> = (route: ActivatedRouteSnapshot) => {
  const postService = inject(PostService);
  const router = inject(Router);
  const id = route.parent!.paramMap.get('id')!;

  return postService.getPost(id).pipe(
    catchError(() => {
      router.navigate(['/not-found']);
      return EMPTY;
    })
  );
};
