import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanDeactivateFn } from '@angular/router';

import { map } from 'rxjs';

import { ConfirmDialogComponent } from '@gl/ui-components/confirm-dialog';
import { HasPendingChanges } from '@gl/util-forms';

export const canDeactivateGuard: CanDeactivateFn<HasPendingChanges> = component => {
  if (!component.hasPendingChanges()) {
    return true;
  }

  return inject(MatDialog)
    .open(ConfirmDialogComponent, {
      data: {
        titleKey: 'confirmLeave.title',
        messageKey: 'confirmLeave.message',
        cancelKey: 'confirmLeave.stay',
        confirmKey: 'confirmLeave.leave',
      },
    })
    .afterClosed()
    .pipe(map(confirmed => confirmed === true));
};
