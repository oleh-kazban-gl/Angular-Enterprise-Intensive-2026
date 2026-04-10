import { FormSnapshotBase } from './form-snapshot.base';

class TestForm extends FormSnapshotBase {
  value = { name: '', count: 0 };

  init(): void {
    this.takeSnapshot();
  }

  protected formSnapshot(): unknown {
    return this.value;
  }
}

describe('FormSnapshotBase', () => {
  let form: TestForm;

  beforeEach(() => {
    form = new TestForm();
  });

  it('returns false when takeSnapshot was never called', () => {
    expect(form.hasPendingChanges()).toBe(false);
  });

  it('returns false immediately after taking a snapshot', () => {
    form.init();
    expect(form.hasPendingChanges()).toBe(false);
  });

  it('returns true when value changes after snapshot', () => {
    form.init();
    form.value = { name: 'Jane', count: 0 };
    expect(form.hasPendingChanges()).toBe(true);
  });

  it('returns false when value is restored to initial state', () => {
    form.init();
    form.value = { name: 'Jane', count: 0 };
    form.value = { name: '', count: 0 };
    expect(form.hasPendingChanges()).toBe(false);
  });

  it('detects numeric field changes', () => {
    form.init();
    form.value = { name: '', count: 5 };
    expect(form.hasPendingChanges()).toBe(true);
  });

  it('is sensitive to field ordering in the snapshot object', () => {
    form.init();
    // Same data, different key order — JSON.stringify is order-sensitive
    const snapshot = JSON.stringify(form['formSnapshot']());
    const reversed = JSON.stringify({ count: 0, name: '' });
    expect(snapshot).not.toBe(reversed);
  });
});
