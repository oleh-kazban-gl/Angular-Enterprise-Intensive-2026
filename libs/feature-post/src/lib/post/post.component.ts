import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';

import { TranslatePipe } from '@ngx-translate/core';

import { CardComponent } from '@gl/ui-components/card';
import { Post } from './post.models';

@Component({
  selector: 'gl-post',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NgOptimizedImage, CardComponent, MatButtonModule, MatIconModule, TranslatePipe],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly post = signal<Post | null>(this.route.snapshot.data['post'] ?? null);

  protected goBack() {
    this.router.navigate(['/posts']);
  }

  protected like() {
    const current = this.post();

    if (!current) {
      return;
    }

    current.likes = (current.likes || 0) + 1;
  }
}
