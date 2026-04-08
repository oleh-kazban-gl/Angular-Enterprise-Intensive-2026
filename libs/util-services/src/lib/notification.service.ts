import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

const DURATION_MS = 5000;

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly snackBar = inject(MatSnackBar);

  success(message: string): void {
    this.snackBar.open(message, '✕', {
      duration: DURATION_MS,
      panelClass: ['notification--success'],
    });
  }

  error(message: string): void {
    this.snackBar.open(message, '✕', {
      duration: DURATION_MS,
      panelClass: ['notification--error'],
    });
  }

  warn(message: string): void {
    this.snackBar.open(message, '✕', {
      duration: DURATION_MS,
      panelClass: ['notification--warn'],
    });
  }

  info(message: string): void {
    this.snackBar.open(message, '✕', {
      duration: DURATION_MS,
      panelClass: ['notification--info'],
    });
  }
}
