import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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

import { AuthFacade } from '@gl/data-access-auth';
import { CardComponent } from '@gl/ui-components/card';
import { controlErrors } from '@gl/util-forms';

const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.parent?.get('password')?.value;
  return password && control.value && password !== control.value ? { passwordMismatch: true } : null;
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
  private readonly facade = inject(AuthFacade);

  readonly form = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(8)] }),
    confirmPassword: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, passwordMatchValidator],
    }),
  });

  readonly controlErrors = controlErrors;

  constructor() {
    this.form.controls.password.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.form.controls.confirmPassword.updateValueAndValidity({ emitEvent: false }));
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    const { name, username, email, password } = this.form.getRawValue();
    this.facade.signUp(name, username, email, password);
  }
}
