import { FormControl, Validators } from '@angular/forms';

import { controlErrors } from './control-errors';

describe('controlErrors', () => {
  it('returns [] when control is untouched', () => {
    const ctrl = new FormControl('', Validators.required);
    expect(controlErrors(ctrl)).toEqual([]);
  });

  it('returns [] when control has no errors', () => {
    const ctrl = new FormControl('value', Validators.required);
    ctrl.markAsTouched();
    expect(controlErrors(ctrl)).toEqual([]);
  });

  it('returns [] when touched but errors is null', () => {
    const ctrl = new FormControl('valid');
    ctrl.markAsTouched();
    expect(controlErrors(ctrl)).toEqual([]);
  });

  it('normalizes boolean true error values to empty object', () => {
    const ctrl = new FormControl('', Validators.required);
    ctrl.markAsTouched();
    const errors = controlErrors(ctrl);
    expect(errors).toEqual([['required', {}]]);
  });

  it('returns error entries with object values as-is', () => {
    const ctrl = new FormControl('ab', Validators.minLength(5));
    ctrl.markAsTouched();
    const errors = controlErrors(ctrl);
    expect(errors).toHaveLength(1);
    expect(errors[0][0]).toBe('minlength');
    expect(errors[0][1]).toEqual({ requiredLength: 5, actualLength: 2 });
  });

  it('returns multiple error entries when multiple validators fail', () => {
    const ctrl = new FormControl('', [Validators.required, Validators.minLength(3)]);
    ctrl.markAsTouched();
    const errors = controlErrors(ctrl);
    expect(errors.length).toBeGreaterThanOrEqual(1);
    const keys = errors.map(([k]) => k);
    expect(keys).toContain('required');
  });
});
