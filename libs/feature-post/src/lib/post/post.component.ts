import { DatePipe, UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

import { TranslatePipe } from '@ngx-translate/core';

import { PostFacade } from '@gl/data-access-post';
import { CardComponent } from '@gl/ui-components/card';
import { CarouselComponent } from '@gl/ui-components/carousel';
import { LoadingComponent } from '@gl/ui-components/loading';
import { BreadcrumbService } from '@gl/util-services';
import { CollaboratorsSetComponent } from './collaborators-set.component';
import { TagsSetComponent } from './tags-set.component';

@Component({
  selector: 'gl-post',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DatePipe,
    UpperCasePipe,
    CardComponent,
    CarouselComponent,
    MatButtonModule,
    MatIconModule,
    TranslatePipe,
    LoadingComponent,
    CollaboratorsSetComponent,
    TagsSetComponent,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  private readonly router = inject(Router);
  private readonly facade = inject(PostFacade);
  private readonly breadcrumbService = inject(BreadcrumbService);

  protected readonly postId = toSignal(this.facade.postId$);
  protected readonly post = toSignal(this.facade.post$, { requireSync: true });
  protected readonly loading = toSignal(this.facade.loading$, { requireSync: true });

  private readonly breadcrumbLabel = computed(() => {
    const post = this.post();
    if (!post) {
      return null;
    }
    const d = new Date(post.createdAt);
    const dd = d.getDate().toString().padStart(2, '0');
    const mm = (d.getMonth() + 1).toString().padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${post.author} ${dd}.${mm}.${yyyy} post`;
  });

  constructor() {
    effect(() => {
      const postId = this.postId();
      if (postId) {
        this.facade.loadPost();
      }
    });

    effect(() => {
      const label = this.breadcrumbLabel();
      if (label) {
        this.breadcrumbService.setDynamicLabel(label);
      }
    });
  }

  protected goBack() {
    this.router.navigate(['/posts']);
  }

  protected like() {
    this.facade.toggleLike(!this.post()?.liked);
  }
}
