import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TranslatePipe } from '@ngx-translate/core';

import { BreadcrumbService } from '@gl/util-services';

@Component({
  selector: 'gl-breadcrumb',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, TranslatePipe],
  template: `
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <ol class="breadcrumb__list">
        @for (crumb of crumbs(); track crumb.label; let last = $last) {
          <li class="breadcrumb__item" [class.breadcrumb__item--current]="last">
            @if (crumb.url && !last) {
              <a class="breadcrumb__link" [routerLink]="crumb.url">{{ crumb.label | translate }}</a>
            } @else {
              <span [attr.aria-current]="last ? 'page' : null">{{ crumb.label | translate }}</span>
            }
            @if (!last) {
              <span class="breadcrumb__separator" aria-hidden="true">/</span>
            }
          </li>
        }
      </ol>
    </nav>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .breadcrumb {
        padding: 0.25rem 0;

        &__list {
          display: flex;
          align-items: center;
          list-style: none;
          margin: 0;
          padding: 0;
          gap: 0.375rem;
          flex-wrap: wrap;
        }

        &__item {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          font-size: 0.875rem;
          color: var(--textMuted);

          &--current {
            font-weight: 600;
            color: var(--textColor);
          }
        }

        &__link {
          color: var(--linkColor);
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }

          &:focus-visible {
            outline: 2px solid var(--activeColor);
            outline-offset: 2px;
            border-radius: 2px;
          }
        }

        &__separator {
          color: var(--textMuted);
          user-select: none;
        }
      }
    `,
  ],
})
export class BreadcrumbComponent {
  private readonly breadcrumbService = inject(BreadcrumbService);
  protected readonly crumbs = this.breadcrumbService.breadcrumbs;
}
