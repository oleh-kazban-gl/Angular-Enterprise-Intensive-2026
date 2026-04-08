import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'gl-tags-set',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatChipsModule],
  template: `
    <mat-chip-set aria-label="Hashtags">
      @for (tag of tags(); track tag) {
        <mat-chip>{{ tag }}</mat-chip>
      }
    </mat-chip-set>
  `,
})
export class TagsSetComponent {
  readonly tags = input.required<string[]>();
}
