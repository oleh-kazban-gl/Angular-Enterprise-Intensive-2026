import { ChangeDetectionStrategy, Component } from '@angular/core';

import { LoadingComponent } from '@gl/ui-components/loading';

@Component({
  selector: 'gl-sign-out',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LoadingComponent],
  template: '<gl-loading />',
  styles: [':host { display: flex; height: 100%; }'],
})
export class SignOutComponent {}
