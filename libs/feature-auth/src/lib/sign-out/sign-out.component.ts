import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

import { timer } from 'rxjs';

import { LoadingComponent } from '@gl/ui-components/loading';
import { AuthService } from '@gl/util-services';

@Component({
  selector: 'gl-sign-out',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LoadingComponent],
  template: '<gl-loading />',
  styles: [':host { display: flex; height: 100%; }'],
})
export class SignOutComponent {
  constructor() {
    const authService = inject(AuthService);
    const router = inject(Router);

    timer(3000)
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        authService.signOut();
        router.navigate(['/auth/sign-in']);
      });
  }
}
