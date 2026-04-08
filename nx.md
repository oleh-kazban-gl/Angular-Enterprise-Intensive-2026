# Generate a Library

```Shell
pnpm nx g @nx/angular:library libs/feature-<FEATURE_NAME> --style=scss --tags=type:feature,scope:<FEATURE_NAME>
```

# Add Root store

```Shell
nx g @nx/angular:ngrx-root-store <APP_NAME> --minimal --addDevTools
```

# Generate a Data-access Library

```Shell
pnpm nx g @nx/angular:lib libs/data-access-<FEATURE_NAME> --skipTests
```

## Add to a Data-access Library Store

```Shell
pnpm nx g @nx/angular:ngrx-feature-store <FEATURE_NAME> --parent=libs/data-access-<FEATURE_NAME>/src/index.ts --facade --directory=+state --skipImport
```
