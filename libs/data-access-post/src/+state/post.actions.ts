import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Post } from './post.models';

export const PostActions = createActionGroup({
  source: 'Post',
  events: {
    'Load Post': emptyProps(),
    'Load Post Success': props<{ post: Post }>(),
    'Load Post Failure': props<{ error: string }>(),
    'Toggle Like': props<{ liked: boolean }>(),
    'Toggle Like Success': props<{ likes: number; liked: boolean }>(),
    'Toggle Like Failure': props<{ previousLikes: number; previousLiked: boolean; error: string }>(),
    'Add Comment': props<{ content: string; author: string }>(),
    'Add Comment Success': emptyProps(),
    'Add Comment Failure': props<{ error: string }>(),
  },
});
