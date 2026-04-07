import { AbstractControl } from '@angular/forms';

export type ErrorEntry = [string, Record<string, unknown>];

export function controlErrors(control: AbstractControl): ErrorEntry[] {
  if (!control.touched || !control.errors) {
    return [];
  }
  return Object.entries(control.errors).map(
    ([key, val]): ErrorEntry => [key, val === true ? {} : (val as Record<string, unknown>)]
  );
}
