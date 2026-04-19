# feature-create-post

Smart feature component for creating a new post. Supports image upload, caption editing with automatic hashtag extraction, location search, and collaborator search.

## Component: `CreatePostComponent`

- File picker via `UploaderComponent` with JPEG/PNG type and 5 MB size validators
- Caption textarea with live hashtag extraction (signal-based)
- Location typeahead backed by `LocationSearchService`
- Author/collaborator typeahead backed by `AuthorSearchService`
- Image preview carousel
- Extends `FormSnapshotBase` — warns on navigation if there are unsaved changes

## Public API

| Symbol | Type | Description |
|---|---|---|
| `CreatePostComponent` | Component | Routable smart component |

## Dependencies

- `@gl/data-access-create-post` — `CreatePostFacade`
- `@gl/data-access-profile` — current user avatar display
- `@gl/data-access-auth` — current user
- `@gl/ui-components/*` — carousel, uploader, loading
- `@gl/util-forms` — `FormSnapshotBase`, `controlErrors`
- `@gl/util-services` — `AuthorSearchService`, `LocationSearchService`
- `@angular/forms`, `@angular/material`, `@ngx-translate/core`

## Running unit tests

```bash
nx test feature-create-post
```
