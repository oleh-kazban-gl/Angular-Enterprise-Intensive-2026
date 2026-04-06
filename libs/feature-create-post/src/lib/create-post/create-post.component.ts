import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

import { debounceTime, of, startWith, switchMap } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';

import { CardComponent } from '@gl/ui-components/card';
import { UploaderComponent, fileType, maxFileSize, maxFiles, requiredFiles } from '@gl/ui-components/uploader';
import { Location, LocationSearchService, User, UserSearchService } from '@gl/util-services';
import { CreatePostService } from './create-post.service';

@Component({
  selector: 'gl-create-post',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    TranslatePipe,
    CardComponent,
    UploaderComponent,
  ],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss',
})
export class CreatePostComponent {
  private readonly fb = inject(FormBuilder);
  private readonly locationService = inject(LocationSearchService);
  private readonly userService = inject(UserSearchService);
  private readonly createPostService = inject(CreatePostService);
  private readonly router = inject(Router);

  readonly submitting = signal(false);

  form = this.fb.group({
    photo: [new Set<File>()],
    caption: ['', [Validators.required, Validators.maxLength(2200)]],
    location: [null as Location | string | null],
  });

  readonly photoFileValidators = [fileType(['image/png', 'image/jpeg', 'image/webp']), maxFileSize(1 * 1024 * 1024)];
  readonly photoUploaderValidators = [requiredFiles(), maxFiles(1)];

  collaboratorSearchCtrl = new FormControl('');
  selectedCollaborators = signal<User[]>([]);

  private readonly captionValue = toSignal(this.form.controls.caption.valueChanges, {
    initialValue: '',
  });
  captionLength = computed(() => this.captionValue()?.length ?? 0);
  hashtags = signal<string[]>([]);

  onCaptionInput(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    const raw = textarea.value;

    // Only extract tags that are "completed" — followed by whitespace
    const completedTags = raw.match(/#[\w-]+(?=\s)/g) ?? [];

    if (completedTags.length > 0) {
      const cleanText = raw
        .replace(/#[\w-]+(?=\s)/g, '')
        .replace(/\s{2,}/g, ' ')
        .trimStart();
      textarea.value = cleanText;
      this.hashtags.update(existing => [...new Set([...existing, ...completedTags])]);
      this.form.controls.caption.setValue(cleanText);
    } else {
      this.form.controls.caption.setValue(raw);
    }
  }

  locationSuggestions = toSignal(
    this.form.controls.location.valueChanges.pipe(
      debounceTime(300),
      switchMap(v =>
        typeof v === 'string' && v.trim().length > 0 ? this.locationService.search(v) : of([] as Location[])
      ),
      startWith([] as Location[])
    ),
    { initialValue: [] as Location[] }
  );

  collaboratorSuggestions = toSignal(
    this.collaboratorSearchCtrl.valueChanges.pipe(
      debounceTime(300),
      switchMap(v => (typeof v === 'string' && v.trim().length > 0 ? this.userService.search(v) : of([] as User[]))),
      startWith([] as User[])
    ),
    { initialValue: [] as User[] }
  );

  readonly displayLocation = (value: Location | string | null): string => {
    if (!value) {
      return '';
    }
    return typeof value === 'string' ? value : value.name;
  };

  selectCollaborator(event: MatAutocompleteSelectedEvent): void {
    const user = event.option.value as User;
    if (!this.selectedCollaborators().find(u => u.id === user.id)) {
      this.selectedCollaborators.update(list => [...list, user]);
    }
    this.collaboratorSearchCtrl.setValue('', { emitEvent: false });
  }

  removeHashtag(tag: string): void {
    this.hashtags.update(list => list.filter(t => t !== tag));
  }

  removeCollaborator(userId: string): void {
    this.selectedCollaborators.update(list => list.filter(u => u.id !== userId));
  }

  onSubmit(): void {
    if (this.form.invalid || this.submitting()) {
      return;
    }

    const { photo, caption, location } = this.form.getRawValue();
    const [firstPhoto] = photo ?? [];

    if (!firstPhoto) {
      return;
    }

    this.submitting.set(true);
    this.createPostService
      .create({
        author: 'janedoe',
        photo: firstPhoto,
        caption: caption ?? '',
        location: location ?? null,
        collaborators: this.selectedCollaborators().map(u => u.username),
        hashtags: this.hashtags(),
      })
      .subscribe({
        next: () => this.router.navigate(['/']),
        error: () => this.submitting.set(false),
      });
  }
}
