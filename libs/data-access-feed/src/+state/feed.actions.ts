import { createActionGroup, props } from '@ngrx/store';

import { FeedPagination, FeedPost } from './feed.models';

export const FeedActions = createActionGroup({
  source: 'Feed',
  events: {
    'Load Feed': props<{ page: number; size: number }>(),
    'Load Feed Success': props<{ posts: FeedPost[]; pagination: FeedPagination }>(),
    'Load Feed Failure': props<{ error: string }>(),
    'Toggle Like': props<{ postId: string; liked: boolean }>(),
    'Toggle Like Success': props<{ postId: string; likes: number; liked: boolean }>(),
    'Toggle Like Failure': props<{ postId: string; previousLikes: number; previousLiked: boolean; error: string }>(),
    'Add Comment': props<{ postId: string; content: string; author: string }>(),
    'Add Comment Success': props<{ postId: string }>(),
    'Add Comment Failure': props<{ postId: string; error: string }>(),
  },
});
