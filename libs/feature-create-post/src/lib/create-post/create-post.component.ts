import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { debounceTime, of, startWith, switchMap } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';

import { AuthFacade } from '@gl/data-access-auth';
import { CreatePostFacade } from '@gl/data-access-create-post';
import { ProfileFacade, UserProfile } from '@gl/data-access-profile';
import { CardComponent } from '@gl/ui-components/card';
import { LoadingComponent } from '@gl/ui-components/loading';
import { UploaderComponent, fileType, maxFileSize, maxFiles, requiredFiles } from '@gl/ui-components/uploader';
import { FormSnapshotBase } from '@gl/util-forms';
import { Author, AuthorSearchService, Location, LocationSearchService } from '@gl/util-services';

@Component({
  selector: 'gl-create-post',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:beforeunload)': 'onBeforeUnload($event)',
  },
  imports: [
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    TranslatePipe,
    CardComponent,
    LoadingComponent,
    UploaderComponent,
  ],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss',
})
export class CreatePostComponent extends FormSnapshotBase {
  private readonly fb = inject(FormBuilder);
  private readonly locationService = inject(LocationSearchService);
  private readonly userService = inject(AuthorSearchService);
  readonly facade = inject(CreatePostFacade);
  private readonly profileFacade = inject(ProfileFacade);
  private readonly authFacade = inject(AuthFacade);

  readonly profile = toSignal<UserProfile | null>(this.profileFacade.profile$);
  readonly isProfileLoading = toSignal(this.profileFacade.loading$, { initialValue: true });
  readonly currentUser = toSignal(this.authFacade.currentUser$, { requireSync: true });
  readonly isSubmitting = toSignal(this.facade.isSubmitting$, { initialValue: false });

  constructor() {
    super();
    this.profileFacade.loadProfile();
    this.takeSnapshot();
  }

  form = this.fb.group({
    photo: [new Set<File>()],
    caption: ['', [Validators.required, Validators.maxLength(2200)]],
    location: [null as Location | string | null],
  });

  readonly photoFileValidators = [fileType(['image/png', 'image/jpeg', 'image/webp']), maxFileSize(1 * 1024 * 1024)];
  readonly photoUploaderValidators = [requiredFiles(), maxFiles(10)];

  collaboratorSearchCtrl = new FormControl('');
  selectedCollaborators = signal<Author[]>([]);

  private readonly captionValue = toSignal(this.form.controls.caption.valueChanges, {
    initialValue: '',
  });
  captionLength = computed(() => this.captionValue()?.length ?? 0);
  hashtags = signal<string[]>([]);

  onCaptionInput(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    const raw = textarea.value;

    // Extract tags confirmed by whitespace (user pressed space/enter after the tag).
    // Trailing tags without a trailing space are drained on submit instead.
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
      switchMap(v => (typeof v === 'string' && v.trim().length > 0 ? this.userService.search(v) : of([] as Author[]))),
      startWith([] as Author[])
    ),
    { initialValue: [] as Author[] }
  );

  readonly displayLocation = (value: Location | string | null): string => {
    if (!value) {
      return '';
    }
    return typeof value === 'string' ? value : value.name;
  };

  selectCollaborator(event: MatAutocompleteSelectedEvent): void {
    const user = event.option.value as Author;
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
    if (this.form.invalid) {
      return;
    }

    const { photo, location } = this.form.getRawValue();
    const photos = [...(photo ?? new Set<File>())];

    if (photos.length === 0) {
      return;
    }

    // Drain any trailing hashtag that was never followed by whitespace
    let caption = this.form.controls.caption.value ?? '';
    const trailingTags = caption.match(/#[\w-]+(?=\s|$)/g) ?? [];
    if (trailingTags.length > 0) {
      caption = caption
        .replace(/#[\w-]+(?=\s|$)/g, '')
        .replace(/\s{2,}/g, ' ')
        .trim();
      this.hashtags.update(existing => [...new Set([...existing, ...trailingTags])]);
      this.form.controls.caption.setValue(caption);
    }

    this.facade.createPost({
      author: this.currentUser()?.username ?? 'unknown',
      photos,
      caption,
      location: location ?? null,
      collaborators: this.selectedCollaborators().map(u => u.username),
      hashtags: this.hashtags(),
    });
  }

  protected formSnapshot(): unknown {
    const { caption, location, photo } = this.form.getRawValue();
    return {
      caption: caption ?? '',
      location: location ?? null,
      photoCount: photo?.size ?? 0,
      collaborators: this.selectedCollaborators()
        .map(u => u.id)
        .sort(),
      hashtags: [...this.hashtags()].sort(),
    };
  }

  protected onBeforeUnload(event: BeforeUnloadEvent): void {
    if (this.hasPendingChanges()) {
      event.preventDefault();
    }
  }
}
