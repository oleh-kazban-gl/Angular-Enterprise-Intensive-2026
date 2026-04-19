# feature-auth

Smart feature library for authentication flows. Provides lazy-loaded routes for sign-in, sign-up, and sign-out.

## Routes

| Path             | Component          | Guard        |
| ---------------- | ------------------ | ------------ |
| `/auth/sign-in`  | `SignInComponent`  | `guestGuard` |
| `/auth/sign-up`  | `SignUpComponent`  | `guestGuard` |
| `/auth/sign-out` | `SignOutComponent` | `authGuard`  |

## Components

- **`SignInComponent`** — Reactive form with email and password fields. Displays per-field validation errors using `controlErrors()`.
- **`SignUpComponent`** — Reactive form with email, username, password, and confirm-password. Includes a cross-field password match validator.
- **`SignOutComponent`** — Dispatches `AuthActions.signOut` on init and shows a loading spinner.

## Public API

| Symbol       | Type   | Description               |
| ------------ | ------ | ------------------------- |
| `authRoutes` | Routes | Lazy-loadable route array |

## Dependencies

- `@gl/data-access-auth` — `AuthFacade`, `authGuard`, `guestGuard`
- `@gl/ui-components/card` — `CardComponent`
- `@gl/util-forms` — `controlErrors`
- `@angular/forms`, `@angular/material`, `@ngx-translate/core`

## Running unit tests

```bash
nx test feature-auth
```
