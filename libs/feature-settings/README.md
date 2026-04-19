# feature-settings

Smart feature component for application settings: language selection and theme toggle.

## Component: `SettingsComponent`

- Loads available languages from `SettingsFacade` on init
- Language selector integrates with `LanguageService` to apply the chosen locale via `@ngx-translate`
- Theme toggle integrates with `ThemeService` (signal-based dark/light switching with cookie persistence)
- Local UI state managed with signals, separate from NgRx

## Public API

| Symbol              | Type      | Description              |
| ------------------- | --------- | ------------------------ |
| `SettingsComponent` | Component | Routable smart component |

## Dependencies

- `@gl/data-access-settings` — `SettingsFacade`
- `@gl/util-services` — `ThemeService`, `LanguageService`
- `@gl/ui-components/loading` — `LoadingComponent`
- `@angular/material`, `@ngx-translate/core`

## Running unit tests

```bash
nx test feature-settings
```
