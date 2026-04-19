# ui-components

Shared dumb UI component library. Organized into secondary entry points for optimal tree-shaking — import only the sub-package you need.

## Entry Points

| Entry Point                        | Selector      | Description                                                 |
| ---------------------------------- | ------------- | ----------------------------------------------------------- |
| `@gl/ui-components/card`           | `gl-card`     | Generic content wrapper with consistent padding and margin  |
| `@gl/ui-components/carousel`       | `gl-carousel` | Keyboard-navigable image carousel with dot indicators       |
| `@gl/ui-components/confirm-dialog` | —             | Material confirmation dialog used by `canDeactivateGuard`   |
| `@gl/ui-components/loading`        | `gl-loading`  | Material spinner wrapper with configurable `diameter` input |
| `@gl/ui-components/uploader`       | `gl-uploader` | `ControlValueAccessor` file picker with built-in validation |

## Usage

```typescript
// Import only what you need:
import { CardComponent } from '@gl/ui-components/card';
import { CarouselComponent } from '@gl/ui-components/carousel';
import { LoadingComponent } from '@gl/ui-components/loading';
import { UploaderComponent } from '@gl/ui-components/uploader';
```

## Uploader Validators

The `@gl/ui-components/uploader` entry point also exports reusable file validators:

| Validator                | Description                                     |
| ------------------------ | ----------------------------------------------- |
| `fileType(...mimeTypes)` | Rejects files not matching the given MIME types |
| `maxFileSize(bytes)`     | Rejects files exceeding the given size          |
| `requiredFiles()`        | Requires at least one file to be selected       |
| `maxFiles(n)`            | Limits the number of selected files             |

```typescript
import { UploaderComponent, fileType, maxFileSize, requiredFiles } from '@gl/ui-components/uploader';

// Usage in a component:
fileValidators = [fileType('image/jpeg', 'image/png'), maxFileSize(5 * 1024 * 1024)];
uploaderValidators = [requiredFiles()];
```

## Dependencies

- `@angular/material` — used in `confirm-dialog`, `loading`, and `uploader`
- No dependencies on `feature-*` or `data-access-*` libraries

## Running unit tests

```bash
nx test ui-components
```
