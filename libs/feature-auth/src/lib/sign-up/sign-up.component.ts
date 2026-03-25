import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';

import { TranslatePipe } from '@ngx-translate/core';

import { CardComponent } from '@gl/ui-components/card';

const passwordMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;
  return password && confirmPassword && password !== confirmPassword ? { passwordMismatch: true } : null;
};

@Component({
  selector: 'gl-sign-up',
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
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  readonly form = new FormGroup(
    {
      name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
      password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(8)] }),
      confirmPassword: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    },
    { validators: passwordMatchValidator }
  );

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    // TODO: connect to auth service
  }
}
