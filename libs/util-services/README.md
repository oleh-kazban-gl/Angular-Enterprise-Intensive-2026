# util-services

Cross-cutting application services. Covers HTTP infrastructure, storage, theming, i18n, notifications, breadcrumbs, search, and deep-linking.

## Public API

### Infrastructure

| Symbol | Type | Description |
|---|---|---|
| `AppConfigService` | Service | Loads `config.json` at startup; provides `hostBaseUrl` and `apiBaseUrl` |
| `provideAppConfig` | Provider | `APP_INITIALIZER` provider for `AppConfigService` |
| `apiUrlInterceptor` | Interceptor | Prepends base URL to relative API requests (skips `/i18n/` and `/config.json`) |
| `errorInterceptor` | Interceptor | Handles 401 (redirects to sign-in) and maps error codes to i18n keys |
| `logInterceptor` | Interceptor | Logs HTTP requests and responses to the console |

### Storage

| Symbol | Type | Description |
|---|---|---|
| `LocalStorageService` | Service | Generic JSON-serialized `localStorage` wrapper |
| `SessionStorageService` | Service | Generic JSON-serialized `sessionStorage` wrapper |
| `CookiesStorageService` | Service | Cookie-based key/value storage |

### UI & Theming

| Symbol | Type | Description |
|---|---|---|
| `ThemeService` | Service | Signal-based dark/light theme toggle; persists choice in cookies |
| `LanguageService` | Service | Sets the active `@ngx-translate` language; persists in cookies |
| `NotificationService` | Service | `MatSnackBar` wrapper with `success()`, `error()`, `warn()`, `info()` |
| `BreadcrumbService` | Service | Builds breadcrumb trail from router events; supports dynamic label overrides via signals |

### Route Guards

| Symbol | Type | Description |
|---|---|---|
| `authGuard` | `CanActivateFn` | Redirects to `/auth/sign-in` unless `isLoggedIn` signal is true |
| `guestGuard` | `CanActivateFn` | Redirects to `/feed` if `isLoggedIn` signal is true |
| `canDeactivateGuard` | `CanDeactivateFn` | Shows a confirm dialog if the component implements `HasPendingChanges` |

### Search

| Symbol | Type | Description |
|---|---|---|
| `AuthorSearchService` | Service | `GET /authors?username_like=…` typeahead |
| `LocationSearchService` | Service | `GET /locations?name_contains=…` typeahead |

### Deep Linking

| Symbol | Type | Description |
|---|---|---|
| `DeepLinkService<TFilters>` | Abstract Service | Bidirectional sync between URL query params and NgRx state |

### Models

`AppConfig`, `Author`, `Location`, `Breadcrumb`

## Dependencies

- `@angular/material` — snackbar, dialog
- `@ngx-translate/core`

## Running unit tests

```bash
nx test util-services
```
