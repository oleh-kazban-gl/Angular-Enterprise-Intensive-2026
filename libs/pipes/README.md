# pipes

Standalone Angular pipes for common formatting tasks.

## Public API

| Symbol | Selector | Description |
|---|---|---|
| `FormatBytesPipe` | `formatBytes` | Converts a byte count to a human-readable string (B, KB, MB) |

## Usage

```typescript
import { FormatBytesPipe } from '@gl/pipes';

@Component({
  imports: [FormatBytesPipe],
  template: `<span>{{ fileSize | formatBytes }}</span>`,
})
```

## Running unit tests

```bash
nx test pipes
```
