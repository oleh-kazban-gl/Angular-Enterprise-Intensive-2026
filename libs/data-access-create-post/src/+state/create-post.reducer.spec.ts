import { CreatePostActions } from './create-post.actions';
import { createPostReducer, CreatePostState } from './create-post.reducer';

const initialState: CreatePostState = {
  callState: 'init',
};

describe('createPostReducer', () => {
  it('returns initial state for unknown action', () => {
    const state = createPostReducer(undefined, { type: '@@INIT' } as never);
    expect(state).toEqual(initialState);
  });

  it('handles createPost: sets callState to loading', () => {
    const state = createPostReducer(initialState, CreatePostActions.createPost({ payload: {} as never }));
    expect(state.callState).toBe('loading');
  });

  it('handles createPostSuccess: sets callState to loaded', () => {
    const state = createPostReducer(
      { callState: 'loading' },
      CreatePostActions.createPostSuccess({ post: {} as never })
    );
    expect(state.callState).toBe('loaded');
  });

  it('handles createPostFailure: sets error callState', () => {
    const state = createPostReducer(initialState, CreatePostActions.createPostFailure({ error: 'upload failed' }));
    expect(state.callState).toEqual({ error: 'upload failed' });
  });

  it('handles reset: returns to initial state', () => {
    const loaded: CreatePostState = { callState: 'loaded' };
    const state = createPostReducer(loaded, CreatePostActions.reset());
    expect(state).toEqual(initialState);
  });
});
