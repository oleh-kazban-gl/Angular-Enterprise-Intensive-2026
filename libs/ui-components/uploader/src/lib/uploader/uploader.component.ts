import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  forwardRef,
  inject,
  input,
  signal,
  computed,
  untracked,
} from '@angular/core';
import { ControlValueAccessor, ValidationErrors, Validator, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { TranslatePipe } from '@ngx-translate/core';

import { UploaderFileItemComponent } from './uploader-file-item.component';
import { FileValidator, UploaderValidator, fileType } from './uploader.validators';

@Component({
  selector: 'gl-uploader',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, TranslatePipe, UploaderFileItemComponent],
  templateUrl: './uploader.component.html',
  styleUrl: './uploader.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploaderComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => UploaderComponent),
      multi: true,
    },
  ],
})
export class UploaderComponent implements ControlValueAccessor, Validator {
  readonly multiple = input<boolean>(false);
  readonly fileValidators = input<FileValidator[]>([]);
  readonly uploaderValidators = input<UploaderValidator[]>([]);

  readonly files = signal<Set<File>>(new Set());

  readonly fileErrors = computed<Map<File, ValidationErrors>>(() => {
    const errors = new Map<File, ValidationErrors>();
    for (const file of this.files()) {
      const merged: ValidationErrors = {};
      for (const v of this.fileValidators()) {
        const result = v(file);
        if (result) {
          Object.assign(merged, result);
        }
      }
      if (Object.keys(merged).length > 0) {
        errors.set(file, merged);
      }
    }
    return errors;
  });

  readonly uploaderErrors = computed<ValidationErrors | null>(() => {
    const filesArray = [...this.files()];
    const merged: ValidationErrors = {};
    for (const v of this.uploaderValidators()) {
      const result = v(filesArray);
      if (result) {
        Object.assign(merged, result);
      }
    }
    return Object.keys(merged).length > 0 ? merged : null;
  });

  readonly uploaderErrorEntries = computed<[string, Record<string, unknown>][]>(() => {
    const errs = this.uploaderErrors();
    if (!errs) {
      return [];
    }
    return Object.entries(errs).map(([key, val]): [string, Record<string, unknown>] => [
      key,
      val === true ? {} : (val as Record<string, unknown>),
    ]);
  });

  readonly acceptedTypes = computed<string[] | null>(() => {
    for (const v of this.fileValidators()) {
      if ('acceptedTypes' in v) {
        return (v as ReturnType<typeof fileType> & { acceptedTypes: string[] }).acceptedTypes;
      }
    }
    return null;
  });

  readonly acceptAttribute = computed<string>(() => {
    const types = this.acceptedTypes();
    return types ? types.join(',') : '';
  });

  readonly supportedLabels = computed<string>(() => {
    const types = this.acceptedTypes();
    if (!types) {
      return '';
    }
    return types.map(t => t.split('/')[1].toUpperCase()).join(', ');
  });

  readonly filesArray = computed<File[]>(() => [...this.files()]);

  readonly previewUrl = signal<string | null>(null);

  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    effect(() => {
      const imageFile = [...this.files()].find(f => f.type.startsWith('image/'));
      const prev = untracked(this.previewUrl);
      if (prev) {
        URL.revokeObjectURL(prev);
      }
      this.previewUrl.set(imageFile ? URL.createObjectURL(imageFile) : null);
    });
    this.destroyRef.onDestroy(() => {
      const url = this.previewUrl();
      if (url) {
        URL.revokeObjectURL(url);
      }
    });
  }

  private onChange: (value: Set<File>) => void = () => {};
  private onTouched: () => void = () => {};
  private onValidatorChange: () => void = () => {};

  // ── ControlValueAccessor ──────────────────────────────────────────────────

  writeValue(value: Set<File> | null): void {
    this.files.set(value instanceof Set ? new Set(value) : new Set());
  }

  registerOnChange(fn: (value: Set<File>) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled.set(isDisabled);
  }

  // ── Validator ─────────────────────────────────────────────────────────────

  validate(): ValidationErrors | null {
    const uploaderErrs = this.uploaderErrors();
    const hasFileErrs = this.fileErrors().size > 0;
    if (!uploaderErrs && !hasFileErrs) {
      return null;
    }
    return { ...(uploaderErrs ?? {}), ...(hasFileErrs ? { fileErrors: true } : {}) };
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChange = fn;
  }

  // ── internal ──────────────────────────────────────────────────────────────

  readonly _disabled = signal(false);

  onFileInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) {
      return;
    }

    const incoming = Array.from(input.files);
    const current = new Set(this.files());

    for (const file of incoming) {
      if (!this.isDuplicate(file, current)) {
        current.add(file);
      }
    }

    this.files.set(new Set(current));
    this.onChange(new Set(current));
    this.onTouched();
    this.onValidatorChange();
    input.value = '';
  }

  removeFile(file: File): void {
    const updated = new Set(this.files());
    updated.delete(file);
    this.files.set(updated);
    this.onChange(new Set(updated));
    this.onValidatorChange();
  }

  private isDuplicate(incoming: File, existing: Set<File>): boolean {
    const sig = `${incoming.name}::${incoming.size}::${incoming.lastModified}`;
    for (const f of existing) {
      if (`${f.name}::${f.size}::${f.lastModified}` === sig) {
        return true;
      }
    }
    return false;
  }
}
