# feature-profile

Smart feature component for viewing and editing the authenticated user's profile.

## Components

- **`ProfileComponent`** — Loads the current user's profile, toggles between read and edit mode, and implements `HasPendingChanges` to prevent accidental navigation away from unsaved changes.
- **`EditProfileComponent`** — Input/output-driven form for editing bio (max 150 chars) and uploading a new avatar. Avatar changes are processed by `ProfileService` (canvas resize to 128×128).

## Public API

| Symbol | Type | Description |
|---|---|---|
| `ProfileComponent` | Component | Routable smart component |
| `EditProfileComponent` | Component | Input/output-driven edit form |

## Dependencies

- `@gl/data-access-profile` — `ProfileFacade`
- `@gl/data-access-auth` — current user
- `@gl/ui-components/*` — uploader, loading, card
- `@gl/util-forms` — `HasPendingChanges`, `controlErrors`
- `@angular/material`, `@ngx-translate/core`

## Running unit tests

```bash
nx test feature-profile
```
