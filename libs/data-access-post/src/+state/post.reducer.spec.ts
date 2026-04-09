import { PostActions } from './post.actions';
import { postReducer, PostState } from './post.reducer';
import { Post } from './post.models';

const mockPost: Post = {
  id: 'p1',
  author: 'alice',
  time: '2h ago',
  images: ['img.jpg'],
  caption: 'Hello',
  location: 'NYC',
  collaborators: [],
  hashtags: [],
  likes: 10,
  liked: false,
  createdAt: '2024-01-01T00:00:00Z',
};

const initialState: PostState = {
  post: null,
  callState: 'init',
};

describe('postReducer', () => {
  it('returns initial state for unknown action', () => {
    const state = postReducer(undefined, { type: '@@INIT' } as never);
    expect(state).toEqual(initialState);
  });

  it('handles loadPost: sets callState to loading', () => {
    const state = postReducer(initialState, PostActions.loadPost());
    expect(state.callState).toBe('loading');
  });

  it('handles loadPostSuccess: sets post and loaded callState', () => {
    const state = postReducer(initialState, PostActions.loadPostSuccess({ post: mockPost }));
    expect(state.post).toEqual(mockPost);
    expect(state.callState).toBe('loaded');
  });

  it('handles loadPostFailure: sets error callState', () => {
    const state = postReducer(initialState, PostActions.loadPostFailure({ error: 'not found' }));
    expect(state.callState).toEqual({ error: 'not found' });
  });

  it('handles toggleLike: optimistically sets liked=true and increments likes', () => {
    const withPost: PostState = { post: mockPost, callState: 'loaded' };
    const state = postReducer(withPost, PostActions.toggleLike({ liked: true }));
    expect(state.post?.liked).toBe(true);
    expect(state.post?.likes).toBe(11);
  });

  it('handles toggleLike: optimistically sets liked=false and decrements likes', () => {
    const withLikedPost: PostState = { post: { ...mockPost, liked: true, likes: 10 }, callState: 'loaded' };
    const state = postReducer(withLikedPost, PostActions.toggleLike({ liked: false }));
    expect(state.post?.liked).toBe(false);
    expect(state.post?.likes).toBe(9);
  });

  it('handles toggleLike: no-op when post is null', () => {
    const state = postReducer(initialState, PostActions.toggleLike({ liked: true }));
    expect(state.post).toBeNull();
  });

  it('handles toggleLikeSuccess: confirms server values', () => {
    const withPost: PostState = { post: mockPost, callState: 'loaded' };
    const state = postReducer(withPost, PostActions.toggleLikeSuccess({ likes: 12, liked: true }));
    expect(state.post?.likes).toBe(12);
    expect(state.post?.liked).toBe(true);
  });

  it('handles toggleLikeFailure: rolls back to previous values', () => {
    const withPost: PostState = { post: { ...mockPost, liked: true, likes: 11 }, callState: 'loaded' };
    const state = postReducer(
      withPost,
      PostActions.toggleLikeFailure({ previousLikes: 10, previousLiked: false, error: 'err' })
    );
    expect(state.post?.likes).toBe(10);
    expect(state.post?.liked).toBe(false);
  });
});
