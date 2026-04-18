import { ChangeDetectionStrategy, Component, OnInit, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { TranslatePipe } from '@ngx-translate/core';

import { UpdateProfilePayload, UserProfile } from '@gl/data-access-profile';
import { UploaderComponent, fileType, maxFileSize, maxFiles } from '@gl/ui-components/uploader';

@Component({
  selector: 'gl-edit-profile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, TranslatePipe, UploaderComponent],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
})
export class EditProfileComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  readonly profile = input.required<UserProfile | null>();
  readonly saving = input<boolean>(false);
  readonly cancelled = output<void>();
  readonly saved = output<UpdateProfilePayload>();

  readonly avatarFileValidators = [fileType(['image/png', 'image/jpeg', 'image/webp']), maxFileSize(2 * 1024 * 1024)];
  readonly avatarUploaderValidators = [maxFiles(1)];

  form = this.fb.group({
    bio: ['', Validators.maxLength(150)],
    avatar: [new Set<File>()],
  });

  ngOnInit(): void {
    const profile = this.profile();
    if (profile) {
      this.form.patchValue({ bio: profile.bio });
    }
  }

  onCancel(): void {
    this.cancelled.emit();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const { bio, avatar } = this.form.getRawValue();
    const avatarFile = avatar && avatar.size > 0 ? [...avatar][0] : null;

    this.saved.emit({
      bio: bio ?? '',
      avatar: avatarFile,
    });
  }
}
