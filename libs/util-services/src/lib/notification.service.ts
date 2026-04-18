import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

const DURATION_MS = 5000;
const HORIZONTAL: MatSnackBarHorizontalPosition = 'center';
const VERTICAL: MatSnackBarVerticalPosition = 'bottom';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly snackBar = inject(MatSnackBar);

  success(message: string): void {
    this.snackBar.open(message, '✕', {
      duration: DURATION_MS,
      horizontalPosition: HORIZONTAL,
      verticalPosition: VERTICAL,
      panelClass: ['notification--success'],
    });
  }

  error(message: string): void {
    this.snackBar.open(message, '✕', {
      duration: DURATION_MS,
      horizontalPosition: HORIZONTAL,
      verticalPosition: VERTICAL,
      panelClass: ['notification--error'],
    });
  }

  warn(message: string): void {
    this.snackBar.open(message, '✕', {
      duration: DURATION_MS,
      horizontalPosition: HORIZONTAL,
      verticalPosition: VERTICAL,
      panelClass: ['notification--warn'],
    });
  }

  info(message: string): void {
    this.snackBar.open(message, '✕', {
      duration: DURATION_MS,
      horizontalPosition: HORIZONTAL,
      verticalPosition: VERTICAL,
      panelClass: ['notification--info'],
    });
  }
}
