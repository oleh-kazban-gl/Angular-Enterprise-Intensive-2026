import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';

import { TranslatePipe } from '@ngx-translate/core';

import { CardComponent } from '@gl/ui-components/card';
import { LoadingComponent } from '@gl/ui-components/loading';
import { BreadcrumbService } from '@gl/util-services';
import { PostService } from './post.service';

@Component({
  selector: 'gl-post',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    CardComponent,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    TranslatePipe,
    LoadingComponent,
  ],
  providers: [DatePipe],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly postService = inject(PostService);
  private readonly breadcrumbService = inject(BreadcrumbService);
  private readonly datePipe = inject(DatePipe);

  protected readonly post = this.postService.post;
  protected readonly loading = this.postService.loading;

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.postService.getPost(id);
    }

    effect(() => {
      const post = this.post();
      if (!post) {
        return;
      }
      const dateStr = this.datePipe.transform(post.createdAt, 'dd.MM.yyyy') ?? '';
      this.breadcrumbService.setDynamicLabel(`${post.author} ${dateStr} post`);
    });
  }

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
