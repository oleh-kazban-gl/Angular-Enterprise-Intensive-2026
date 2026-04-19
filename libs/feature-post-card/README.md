# feature-post-card

Presentational feature component for a single post. Handles image carousel, metadata display, like toggling, and comment submission. Fully driven by inputs — no route dependency, making it independently reusable and testable.

## Component: `PostCardComponent`

### Inputs

| Input | Type | Description |
|---|---|---|
| `postId` | `string` (required) | Used to select the post from the NgRx store |
| `showBack` | `boolean` | Shows a back-navigation button when `true` |

### Outputs

| Output | Description |
|---|---|
| `openDetail` | Emitted when the post title/link is clicked |
| `back` | Emitted when the back button is clicked |

### Features

- Image carousel via `CarouselComponent` with `NgOptimizedImage`
- Like button with optimistic UI update
- Comment list and inline comment form (submit / cancel)
- Displays collaborators and hashtags
- Per-post loading state and comment-submission state tracking

## Public API

| Symbol | Type | Description |
|---|---|---|
| `PostCardComponent` | Component | Standalone, input/output-driven post card |

## Dependencies

- `@gl/data-access-auth` — current user
- `@gl/data-access-posts` — `PostsFacade`
- `@gl/ui-components/carousel` — `CarouselComponent`
- `@gl/ui-components/loading` — `LoadingComponent`
- `@angular/forms`, `@angular/material`, `@ngx-translate/core`

## Running unit tests

```bash
nx test feature-post-card
```
