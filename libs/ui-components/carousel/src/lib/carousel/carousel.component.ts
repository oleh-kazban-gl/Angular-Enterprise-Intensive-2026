import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'gl-carousel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, TranslatePipe],
  host: {
    role: 'region',
    '[attr.aria-label]': 'label()',
    tabindex: '0',
    '(keydown)': 'onKeydown($event)',
  },
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent {
  readonly images = input.required<string[]>();
  readonly label = input<string>('Photo carousel');

  protected readonly currentIndex = signal(0);

  protected readonly currentImage = computed<string | null>(() => {
    const imgs = this.images();
    if (imgs.length === 0) {
      return null;
    }
    return imgs[Math.min(this.currentIndex(), imgs.length - 1)];
  });

  protected readonly hasMultiple = computed(() => this.images().length > 1);

  protected prev(): void {
    const len = this.images().length;
    this.currentIndex.update(i => (i - 1 + len) % len);
  }

  protected next(): void {
    const len = this.images().length;
    this.currentIndex.update(i => (i + 1) % len);
  }

  protected goTo(index: number): void {
    this.currentIndex.set(index);
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.prev();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.next();
    }
  }
}
