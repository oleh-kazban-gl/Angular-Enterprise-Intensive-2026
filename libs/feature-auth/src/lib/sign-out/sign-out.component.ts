import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { AuthFacade } from '@gl/data-access-auth';
import { LoadingComponent } from '@gl/ui-components/loading';

@Component({
  selector: 'gl-sign-out',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LoadingComponent],
  template: '<gl-loading />',
  styles: [':host { display: flex; height: 100%; }'],
})
export class SignOutComponent {
  constructor() {
    inject(AuthFacade).signOut();
  }
}
