import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { Observable, of } from 'rxjs';

import { HasPendingChanges } from '@gl/util-forms';

import { canDeactivateGuard } from './can-deactivate.guard';

describe('canDeactivateGuard', () => {
  const clean: HasPendingChanges = { hasPendingChanges: () => false };
  const dirty: HasPendingChanges = { hasPendingChanges: () => true };

  function setup(dialogResult: boolean): MatDialog {
    const dialogRef = { afterClosed: () => of(dialogResult) } as unknown as MatDialogRef<unknown>;
    const dialogMock = { open: jest.fn().mockReturnValue(dialogRef) } as unknown as MatDialog;

    TestBed.configureTestingModule({
      providers: [{ provide: MatDialog, useValue: dialogMock }],
    });

    return dialogMock;
  }

  function run(component: HasPendingChanges): boolean | Observable<boolean> {
    return TestBed.runInInjectionContext(() => canDeactivateGuard(component, null!, null!, null!));
  }

  it('returns true synchronously when there are no pending changes', () => {
    TestBed.configureTestingModule({});
    expect(run(clean)).toBe(true);
  });

  it('does not open dialog when there are no pending changes', () => {
    const dialog = setup(true);
    run(clean);
    expect(dialog.open).not.toHaveBeenCalled();
  });

  it('opens the dialog when there are pending changes', () => {
    const dialog = setup(true);
    run(dirty);
    expect(dialog.open).toHaveBeenCalledTimes(1);
  });

  it('returns observable true when user confirms leaving', done => {
    setup(true);
    (run(dirty) as Observable<boolean>).subscribe(result => {
      expect(result).toBe(true);
      done();
    });
  });

  it('returns observable false when user cancels', done => {
    setup(false);
    (run(dirty) as Observable<boolean>).subscribe(result => {
      expect(result).toBe(false);
      done();
    });
  });

  it('passes the correct i18n keys to the dialog', () => {
    const dialog = setup(true);
    run(dirty);
    expect(dialog.open).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        data: expect.objectContaining({
          titleKey: 'confirmLeave.title',
          messageKey: 'confirmLeave.message',
          cancelKey: 'confirmLeave.stay',
          confirmKey: 'confirmLeave.leave',
        }),
      })
    );
  });
});
