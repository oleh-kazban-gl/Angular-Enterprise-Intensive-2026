import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';

import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'gl-collaborators-set',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatChipsModule, TranslatePipe],
  template: `
    <mat-chip-set [attr.aria-label]="'post.collaborators' | translate">
      @for (person of collaborators(); track person) {
        <mat-chip>{{ '@' + person }}</mat-chip>
      }
    </mat-chip-set>
  `,
  styles: [
    `
      mat-chip {
        --mdc-chip-label-text-color: var(--linkColor);
        --mdc-chip-elevated-container-color: color-mix(in srgb, var(--linkColor) 10%, transparent);
      }
    `,
  ],
})
export class CollaboratorsSetComponent {
  readonly collaborators = input.required<string[]>();
}
