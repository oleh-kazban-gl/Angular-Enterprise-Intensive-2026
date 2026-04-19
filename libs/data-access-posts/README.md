# data-access-posts

NgRx state slice for the posts feed. Manages paginated feed loading, individual post retrieval, like toggling, and comments using the `@ngrx/entity` adapter for normalized state.

## Responsibilities

- Paginated `GET /posts` feed via `PostsService`
- Individual `GET /posts/:id` for detail view
- `PATCH /posts/:id` for optimistic like toggling
- `POST /posts/:id/comments` for comment submission
- Syncs pagination to URL query params via `FeedDeepLinkService`
- Shows notifications on errors via `NotificationService`

## Public API

| Symbol                | Type         | Description                                                         |
| --------------------- | ------------ | ------------------------------------------------------------------- |
| `PostsFacade`         | Service      | Primary interface for all post state and dispatching                |
| `PostsActions`        | NgRx Actions | `loadFeedPage`, `loadPost`, `toggleLike`, `addComment`, `clearFeed` |
| `postsReducer`        | Reducer      | Manages normalized `PostsState` via `@ngrx/entity` adapter          |
| `PostsEffects`        | Effects      | Async operations: HTTP calls, notifications, i18n                   |
| `FeedDeepLinkService` | Service      | Syncs `page`/`size` query params ↔ NgRx pagination state           |
| `Post`                | Model        | Full post entity                                                    |
| `Comment`             | Model        | `{ id, authorId, body, createdAt }`                                 |
| `PostsPagination`     | Model        | `{ page, size, total }`                                             |
| `PostsFilters`        | Model        | Active feed filter shape                                            |
| `PagedPostsResponse`  | Model        | HTTP response shape including pagination headers                    |

## Dependencies

- `@ngrx/store`, `@ngrx/effects`, `@ngrx/entity`
- `@gl/util-ngrx` — `CallState`
- `@gl/util-services` — `NotificationService`, `BreadcrumbService`, `DeepLinkService`
- `@ngx-translate/core`

## Running unit tests

```bash
nx test data-access-posts
```
