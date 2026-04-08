import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';

import { TranslatePipe } from '@ngx-translate/core';

import { AuthFacade } from '@gl/data-access-auth';
import { CardComponent } from '@gl/ui-components/card';
import { controlErrors } from '@gl/util-forms';

@Component({
  selector: 'gl-sign-in',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    CardComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TranslatePipe,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  private readonly facade = inject(AuthFacade);

  readonly form = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  readonly controlErrors = controlErrors;

  onSubmit(): void {
    const { email, password } = this.form.getRawValue();
    this.facade.signIn(email, password);
  }
}
