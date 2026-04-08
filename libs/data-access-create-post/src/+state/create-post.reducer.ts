import { createFeature, createReducer, on } from '@ngrx/store';

import { CallState } from '@gl/util-ngrx';
import { CreatePostActions } from './create-post.actions';

export const CREATE_POST_FEATURE_KEY = 'createPost';

export interface CreatePostState {
  callState: CallState;
}

const initialState: CreatePostState = {
  callState: 'init',
};

export const createPostFeature = createFeature({
  name: CREATE_POST_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(CreatePostActions.createPost, state => ({ ...state, callState: 'loading' as const })),
    on(CreatePostActions.createPostSuccess, state => ({ ...state, callState: 'loaded' as const })),
    on(CreatePostActions.createPostFailure, (state, { error }) => ({ ...state, callState: { error } })),
    on(CreatePostActions.reset, () => initialState)
  ),
});

export const { name, reducer: createPostReducer } = createPostFeature;
