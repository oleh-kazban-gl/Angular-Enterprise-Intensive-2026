import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { CreatePostActions } from './create-post.actions';
import { CreatePostPayload } from './create-post.models';
import { selectError, selectIsSubmitting } from './create-post.selectors';

@Injectable()
export class CreatePostFacade {
  private readonly store = inject(Store);

  readonly isSubmitting$: Observable<boolean> = this.store.select(selectIsSubmitting);
  readonly error$: Observable<string | null> = this.store.select(selectError);

  createPost(payload: CreatePostPayload): void {
    this.store.dispatch(CreatePostActions.createPost({ payload }));
  }

  reset(): void {
    this.store.dispatch(CreatePostActions.reset());
  }
}
