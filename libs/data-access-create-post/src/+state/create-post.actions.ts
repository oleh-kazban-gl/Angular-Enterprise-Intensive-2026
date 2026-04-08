import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { CreatePostPayload, Post } from './create-post.models';

export const CreatePostActions = createActionGroup({
  source: 'CreatePost',
  events: {
    'Create Post': props<{ payload: CreatePostPayload }>(),
    'Create Post Success': props<{ post: Post }>(),
    'Create Post Failure': props<{ error: string }>(),
    Reset: emptyProps(),
  },
});
