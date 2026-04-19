# data-access-auth

NgRx state slice for authentication. Manages login, signup, signout, and current user data. Persists the JWT token to `localStorage`.

## Responsibilities

- HTTP calls to `/login` and `/register` via `AuthService`
- Stores `User`, auth loading, and error state in NgRx
- Exposes route guards (`authGuard`, `guestGuard`) and `authInterceptor`
- Provides `AuthFacade` for use in feature components

## Public API

| Symbol | Type | Description |
|---|---|---|
| `AuthFacade` | Service | Reactive access to auth state: `isLoggedIn$`, `isLoading$`, `error$`, `currentUser$` |
| `authGuard` | Guard | Redirects to `/auth/sign-in` if not authenticated |
| `guestGuard` | Guard | Redirects to `/feed` if already authenticated |
| `authInterceptor` | Interceptor | Attaches Bearer token to outgoing HTTP requests |
| `AuthActions` | NgRx Actions | `restoreAuth`, `signIn`, `signUp`, `signOut`, `loadUser` |
| `authReducer` | Reducer | Manages `AuthState` |
| `AuthEffects` | Effects | Handles async auth operations with localStorage persistence |
| `selectCurrentUser` | Selector | Currently authenticated `User` |
| `selectCurrentUserId` | Selector | ID of the currently authenticated user |
| `selectIsLoggedIn` | Selector | Boolean login status |
| `User` | Model | `{ id, username, email, avatarUrl }` |
| `AuthResponse` | Model | `{ token }` |

## Dependencies

- `@ngrx/store`, `@ngrx/effects`
- `@gl/util-ngrx` — `CallState`
- `@gl/util-services` — `LocalStorageService`

## Running unit tests

```bash
nx test data-access-auth
```
