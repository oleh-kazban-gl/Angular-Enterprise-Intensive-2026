# data-access-create-post

NgRx state slice for post creation. Handles the async flow of submitting a new post (with images, caption, location, and collaborators) and navigating on success.

## Responsibilities

- HTTP POST to `/posts` via `CreatePostService`
- Manages submission loading and error state using `CallState`
- Navigates to `/feed` on successful post creation

## Public API

| Symbol | Type | Description |
|---|---|---|
| `CreatePostFacade` | Service | Exposes `isSubmitting$`, `error$`, and `createPost()` |
| `CreatePostActions` | NgRx Actions | `createPost`, `createPostSuccess`, `createPostFailure`, `reset` |
| `createPostReducer` | Reducer | Manages `CreatePostState` |
| `CreatePostEffects` | Effects | Submits post, dispatches success/failure, handles navigation |
| `CreatePostPayload` | Model | Post submission shape (caption, location, collaborators, image blobs) |
| `Post` | Model | Full post entity shape |

## Dependencies

- `@ngrx/store`, `@ngrx/effects`
- `@gl/util-ngrx` — `CallState`

## Running unit tests

```bash
nx test data-access-create-post
```
