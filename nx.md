# Running the Project

## Development

Start the app:

```Shell
pnpm start
```

Start the mock API:

```Shell
pnpm start:api
```

## Testing & Linting

Run all tests:

```Shell
pnpm test
```

Run affected tests only:

```Shell
pnpm test:affected
```

Run all linting:

```Shell
pnpm lint
```

Run affected linting only:

```Shell
pnpm lint:affected
```

## Bundle Analysis

Build with source maps and open an interactive bundle treemap:

```Shell
pnpm analyze
```

---

# Code Generation

## Generate a Feature Library

```Shell
pnpm nx g @nx/angular:library libs/feature-<FEATURE_NAME> --style=scss --tags=type:feature,scope:<FEATURE_NAME>
```

## Generate a Data-access Library

```Shell
pnpm nx g @nx/angular:lib libs/data-access-<FEATURE_NAME> --skipTests
```

## Add NgRx Store to a Data-access Library

```Shell
pnpm nx g @nx/angular:ngrx-feature-store <FEATURE_NAME> --parent=libs/data-access-<FEATURE_NAME>/src/index.ts --facade --directory=+state --skipImport
```

---

# NgRx Setup

## Add NgRx Packages

```Shell
pnpm add @ngrx/store @ngrx/effects @ngrx/entity @ngrx/operators @ngrx/store-devtools
```

## Add Root Store

```Shell
nx g @nx/angular:ngrx-root-store <APP_NAME> --minimal --addDevTools
```

---

# Migrate to esbuild

Angular 17+ ships with an esbuild-based builder (`application`) that is significantly faster than the legacy webpack builder (`browser`).

Run the official migration schematic:

```Shell
npx nx g @angular-devkit/build-angular:use-application-builder --project instaglam
```

This updates `project.json` automatically:

- Executor changes from `browser` to `application`
- `main` option is renamed to `browser`
- `outputPath` becomes an object with `base` and `browser` keys
- Unsupported webpack-only options are removed (`buildOptimizer`, `vendorChunk`, `namedChunks`)
