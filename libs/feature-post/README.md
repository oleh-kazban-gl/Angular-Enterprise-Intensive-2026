# feature-post

Smart feature component for the single post detail view. Resolves the post from the route parameter and sets a dynamic breadcrumb label.

## Component: `PostComponent`

- Reads the post ID from the URL via `@ngrx/router-store`
- Dispatches `PostsActions.loadPost` when the route param changes
- Sets a formatted-date breadcrumb label via `BreadcrumbService`
- Renders `PostCardComponent` with `showBack=true` to enable back-navigation

## Public API

| Symbol          | Type      | Description              |
| --------------- | --------- | ------------------------ |
| `PostComponent` | Component | Routable smart component |

## Dependencies

- `@ngrx/store`, `@ngrx/router-store`
- `@gl/data-access-posts` — `PostsFacade`
- `@gl/feature-post-card` — `PostCardComponent`
- `@gl/util-services` — `BreadcrumbService`

## Running unit tests

```bash
nx test feature-post
```
