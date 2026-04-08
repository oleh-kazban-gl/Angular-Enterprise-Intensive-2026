import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { FeedPost } from './feed.models';

export const FeedActions = createActionGroup({
  source: 'Feed',
  events: {
    'Load Feed': emptyProps(),
    'Load Feed Success': props<{ posts: FeedPost[] }>(),
    'Load Feed Failure': props<{ error: string }>(),
    'Toggle Like': props<{ postId: string; liked: boolean }>(),
    'Toggle Like Success': props<{ postId: string; likes: number; liked: boolean }>(),
    'Toggle Like Failure': props<{ postId: string; previousLikes: number; previousLiked: boolean; error: string }>(),
  },
});
