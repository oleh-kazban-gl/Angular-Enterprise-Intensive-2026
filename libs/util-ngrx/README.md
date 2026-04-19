# util-ngrx

Shared NgRx utilities used across all `data-access-*` libraries.

## Public API

| Symbol | Type | Description |
|---|---|---|
| `CallState` | Type | `'init' \| 'loading' \| 'loaded' \| { error: string }` |
| `getError` | Function | Extracts the error string from a `CallState`, or `null` if not in an error state |

## Usage

```typescript
import { CallState, getError } from '@gl/util-ngrx';

interface MyState {
  callState: CallState;
  data: MyModel[];
}

// In a reducer:
on(MyActions.loadSuccess, (state, { data }) => ({
  ...state,
  data,
  callState: 'loaded',
})),

// In a selector:
export const selectError = createSelector(
  selectState,
  (state) => getError(state.callState)
);
```

## Running unit tests

Run `nx test util-ngrx` to execute the unit tests via [Jest](https://jestjs.io).
