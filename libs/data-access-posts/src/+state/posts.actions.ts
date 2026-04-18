import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Comment, Post, PostsPagination } from './posts.models';

export const PostsActions = createActionGroup({
  source: 'Posts',
  events: {
    // Feed
    'Load Feed Page': props<{ page: number; size: number }>(),
    'Load Feed Page Success': props<{ posts: Post[]; pagination: PostsPagination }>(),
    'Load Feed Page Failure': props<{ error: string }>(),

    // Single post (detail route)
    'Load Post': props<{ postId: string }>(),
    'Load Post Success': props<{ post: Post }>(),
    'Load Post Failure': props<{ postId: string; error: string }>(),

    // Like (optimistic)
    'Toggle Like': props<{ postId: string; liked: boolean }>(),
    'Toggle Like Success': props<{ postId: string; likes: number; liked: boolean }>(),
    'Toggle Like Failure': props<{ postId: string; previousLikes: number; previousLiked: boolean; error: string }>(),

    // Comment
    'Add Comment': props<{ postId: string; content: string; author: string }>(),
    'Add Comment Success': props<{ postId: string; comment: Comment }>(),
    'Add Comment Failure': props<{ postId: string; error: string }>(),

    // Feed loading state reset (on route leave)
    'Clear Feed': emptyProps(),
  },
});
