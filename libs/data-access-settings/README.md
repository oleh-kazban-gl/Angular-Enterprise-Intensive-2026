# data-access-settings

NgRx state slice for application settings. Loads available languages from the API.

## Public API

| Symbol            | Type         | Description                                                  |
| ----------------- | ------------ | ------------------------------------------------------------ |
| `SettingsFacade`  | Service      | Exposes `languages$`, `isLoading$`, `error$`                 |
| `SettingsActions` | NgRx Actions | `loadSettings`, `loadSettingsSuccess`, `loadSettingsFailure` |
| `settingsReducer` | Reducer      | Manages `SettingsState`                                      |
| `SettingsEffects` | Effects      | Fetches settings from the `/settings` endpoint               |
| `Language`        | Model        | `{ code, label }`                                            |
| `AppSettings`     | Model        | `{ languages: Language[] }`                                  |

## Dependencies

- `@ngrx/store`, `@ngrx/effects`
- `@gl/util-ngrx` — `CallState`

## Running unit tests

```bash
nx test data-access-settings
```
