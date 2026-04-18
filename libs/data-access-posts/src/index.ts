export type { Comment, Post, PostsPagination, PostsFilters } from './+state/posts.models';
export { POSTS_FEATURE_KEY, postsReducer, postsAdapter } from './+state/posts.reducer';
export type { PostsState } from './+state/posts.reducer';
export { PostsActions } from './+state/posts.actions';
export { PostsEffects } from './+state/posts.effects';
export { PostsFacade } from './+state/posts.facade';
export * from './+state/posts.selectors';
export { FeedDeepLinkService } from './feed-deep-link.service';
