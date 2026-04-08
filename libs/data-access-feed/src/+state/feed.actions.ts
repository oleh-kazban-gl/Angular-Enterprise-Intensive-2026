import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { FeedPost } from './feed.models';

export const FeedActions = createActionGroup({
  source: 'Feed',
  events: {
    'Load Feed': emptyProps(),
    'Load Feed Success': props<{ posts: FeedPost[] }>(),
    'Load Feed Failure': props<{ error: string }>(),
    'Like Post': props<{ postId: string }>(),
    'Like Post Success': props<{ postId: string; likes: number }>(),
    'Like Post Failure': props<{ postId: string; previousLikes: number; error: string }>(),
  },
});
