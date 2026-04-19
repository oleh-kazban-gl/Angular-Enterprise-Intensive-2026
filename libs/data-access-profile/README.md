# data-access-profile

NgRx state slice for user profile. Handles loading and updating the authenticated user's profile, including avatar resizing.

## Responsibilities

- HTTP GET/PATCH `/users/:id` via `ProfileService`
- Tracks separate `callState` (fetching) and `saveState` (saving) to distinguish load vs. update
- Resizes avatar images to 128×128 using the HTML5 Canvas API before upload

## Public API

| Symbol                 | Type         | Description                                                                 |
| ---------------------- | ------------ | --------------------------------------------------------------------------- |
| `ProfileFacade`        | Service      | Exposes `profile$`, `loading$`, `saving$`, `saved$`, `error$`, `saveError$` |
| `ProfileActions`       | NgRx Actions | `loadProfile`, `updateProfile` with success/failure variants                |
| `profileReducer`       | Reducer      | Manages `ProfileState`                                                      |
| `ProfileEffects`       | Effects      | Load/save profile, triggered off `selectCurrentUserId` from auth            |
| `UserProfile`          | Model        | `{ id, username, bio, avatarUrl, followers, following }`                    |
| `UpdateProfilePayload` | Model        | Partial profile update shape                                                |

## Dependencies

- `@ngrx/store`, `@ngrx/effects`
- `@gl/data-access-auth` — `selectCurrentUserId`
- `@gl/util-ngrx` — `CallState`

## Running unit tests

```bash
nx test data-access-profile
```
