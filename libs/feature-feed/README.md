# feature-feed

Smart feature component for the paginated posts feed. Coordinates pagination state with NgRx and URL query params via deep-link service.

## Component: `FeedComponent`

- Renders a list of `PostCardComponent` items by post ID
- Material paginator synced to NgRx pagination state
- Initializes `FeedDeepLinkService` on load to restore pagination from the URL

## Public API

| Symbol          | Type      | Description              |
| --------------- | --------- | ------------------------ |
| `FeedComponent` | Component | Routable smart component |

## Dependencies

- `@gl/data-access-posts` — `PostsFacade`, `FeedDeepLinkService`
- `@gl/feature-post-card` — `PostCardComponent`
- `@gl/ui-components/loading` — `LoadingComponent`
- `@angular/material` — paginator
- `@ngx-translate/core`

## Running unit tests

```bash
nx test feature-feed
```
