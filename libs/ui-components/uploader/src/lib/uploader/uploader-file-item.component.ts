import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { TranslatePipe } from '@ngx-translate/core';

import { FormatBytesPipe } from '@gl/pipes';

type ErrorEntry = [string, Record<string, unknown>];

@Component({
  selector: 'gl-uploader-file-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, TranslatePipe, FormatBytesPipe],
  host: {
    role: 'listitem',
    class: 'uploader__item',
    '[class.uploader__item--error]': 'hasErrors()',
  },
  templateUrl: './uploader-file-item.component.html',
  styleUrl: './uploader-file-item.component.scss',
})
export class UploaderFileItemComponent {
  readonly file = input.required<File>();
  readonly errors = input<ValidationErrors | null>(null);
  readonly removed = output<void>();

  readonly hasErrors = computed(() => !!this.errors());

  readonly errorEntries = computed<ErrorEntry[]>(() => {
    const errs = this.errors();
    if (!errs) {
      return [];
    }
    return Object.entries(errs).map(
      ([key, val]): ErrorEntry => [key, val === true ? {} : (val as Record<string, unknown>)]
    );
  });
}
