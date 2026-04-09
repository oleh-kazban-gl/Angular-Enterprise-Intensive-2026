import { FeedActions } from './feed.actions';
import { feedAdapter, feedReducer, FeedState } from './feed.reducer';
import { FeedPost } from './feed.models';

const makePost = (id: string, likes = 0, liked = false): FeedPost => ({
  id,
  author: 'alice',
  avatarUrl: '',
  time: '1m ago',
  images: [],
  caption: 'Test',
  location: null,
  likes,
  liked,
  createdAt: '2024-01-01T00:00:00Z',
});

const initialState: FeedState = feedAdapter.getInitialState({
  callState: 'init',
  pagination: null,
});

describe('feedReducer', () => {
  it('returns initial state for unknown action', () => {
    const state = feedReducer(undefined, { type: '@@INIT' } as never);
    expect(state.callState).toBe('init');
    expect(state.pagination).toBeNull();
  });

  it('handles loadFeed: sets callState to loading', () => {
    const state = feedReducer(initialState, FeedActions.loadFeed({ page: 1, size: 5 }));
    expect(state.callState).toBe('loading');
  });

  it('handles loadFeedSuccess: sets posts, pagination and loaded callState', () => {
    const posts = [makePost('1'), makePost('2')];
    const pagination = { page: 1, size: 5, totalItems: 10, totalPages: 2 };
    const state = feedReducer(initialState, FeedActions.loadFeedSuccess({ posts, pagination }));
    expect(state.callState).toBe('loaded');
    expect(state.pagination).toEqual(pagination);
    expect(Object.keys(state.entities)).toHaveLength(2);
  });

  it('handles loadFeedFailure: sets error callState', () => {
    const state = feedReducer(initialState, FeedActions.loadFeedFailure({ error: 'network error' }));
    expect(state.callState).toEqual({ error: 'network error' });
  });

  it('handles toggleLike: optimistically increments likes and sets liked=true', () => {
    const withPost: FeedState = feedAdapter.setAll([makePost('p1', 5, false)], initialState);
    const state = feedReducer(withPost, FeedActions.toggleLike({ postId: 'p1', liked: true }));
    expect(state.entities['p1']?.likes).toBe(6);
    expect(state.entities['p1']?.liked).toBe(true);
  });

  it('handles toggleLike: optimistically decrements likes and sets liked=false', () => {
    const withPost: FeedState = feedAdapter.setAll([makePost('p1', 5, true)], initialState);
    const state = feedReducer(withPost, FeedActions.toggleLike({ postId: 'p1', liked: false }));
    expect(state.entities['p1']?.likes).toBe(4);
    expect(state.entities['p1']?.liked).toBe(false);
  });

  it('handles toggleLike: no-op when post does not exist', () => {
    const state = feedReducer(initialState, FeedActions.toggleLike({ postId: 'unknown', liked: true }));
    expect(state).toBe(initialState);
  });

  it('handles toggleLikeSuccess: updates post with server-confirmed values', () => {
    const withPost: FeedState = feedAdapter.setAll([makePost('p1', 6, true)], initialState);
    const state = feedReducer(withPost, FeedActions.toggleLikeSuccess({ postId: 'p1', likes: 7, liked: true }));
    expect(state.entities['p1']?.likes).toBe(7);
  });

  it('handles toggleLikeFailure: rolls back to previous values', () => {
    const withPost: FeedState = feedAdapter.setAll([makePost('p1', 6, true)], initialState);
    const state = feedReducer(
      withPost,
      FeedActions.toggleLikeFailure({ postId: 'p1', previousLikes: 5, previousLiked: false, error: 'err' })
    );
    expect(state.entities['p1']?.likes).toBe(5);
    expect(state.entities['p1']?.liked).toBe(false);
  });

  it('loadFeedSuccess replaces all existing posts', () => {
    const existing: FeedState = feedAdapter.setAll([makePost('old')], initialState);
    const newPosts = [makePost('new1'), makePost('new2')];
    const state = feedReducer(
      existing,
      FeedActions.loadFeedSuccess({ posts: newPosts, pagination: { page: 1, size: 5, totalItems: 2, totalPages: 1 } })
    );
    expect(state.ids).toEqual(['new1', 'new2']);
  });
});
