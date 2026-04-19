# feature-navmenu

Main application layout shell. Provides the responsive sidebar navigation and breadcrumb trail.

## Components

- **`NavmenuComponent`** — Material sidenav layout with a responsive hamburger menu on small screens. Reads dynamic page titles from route `data`. Uses `BreakpointObserver` to toggle between `side` and `over` drawer modes.
- **`BreadcrumbComponent`** — Renders the breadcrumb trail from `BreadcrumbService`. Semantically marked up with `aria-label` and `aria-current` for accessibility.

## Public API

| Symbol | Type | Description |
|---|---|---|
| `NavmenuComponent` | Component | Top-level app shell layout |
| `BreadcrumbComponent` | Component | Breadcrumb navigation bar |

## Dependencies

- `@gl/util-services` — `BreadcrumbService`
- `@angular/cdk` — `BreakpointObserver`
- `@angular/material` — sidenav, toolbar, list, icon
- `@ngx-translate/core`

## Running unit tests

```bash
nx test feature-navmenu
```
