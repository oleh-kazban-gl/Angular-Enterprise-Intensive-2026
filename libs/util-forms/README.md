# util-forms

Shared utilities for Angular Reactive Forms: per-field error extraction and unsaved-change detection.

## Public API

### `controlErrors(control: AbstractControl): Signal<ValidationErrors | null>`

Returns a signal with the validation errors of the given control only when it has been touched. Avoids showing errors before the user has interacted with a field.

```typescript
// In a component:
protected emailErrors = controlErrors(this.form.get('email')!);

// In the template:
@if (emailErrors()?.['required']) {
  <mat-error>Email is required</mat-error>
}
```

---

### `FormSnapshotBase`

Abstract class for form change detection. Extend it to enable `canDeactivateGuard` to warn users before navigating away with unsaved changes.

```typescript
@Component(...)
export class MyFormComponent extends FormSnapshotBase implements HasPendingChanges {
  protected formSnapshot = () => this.form.getRawValue();

  constructor() {
    super();
    this.takeSnapshot(); // call after form is initialized
  }
}
```

| Member                      | Description                                                   |
| --------------------------- | ------------------------------------------------------------- |
| `takeSnapshot()`            | Saves the current form value as the baseline                  |
| `hasPendingChanges()`       | Returns `true` if the current value differs from the snapshot |
| `formSnapshot()` (abstract) | Must return the serializable form value to compare against    |

---

### `HasPendingChanges`

Interface required by `canDeactivateGuard`. Implement it on any component that holds unsaved form state.

```typescript
interface HasPendingChanges {
  hasPendingChanges(): boolean;
}
```

## Running unit tests

```bash
nx test util-forms
```
