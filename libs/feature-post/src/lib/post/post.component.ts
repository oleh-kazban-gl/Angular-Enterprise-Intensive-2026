import { DatePipe, UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
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
  providers: [DatePipe],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  private readonly router = inject(Router);
  private readonly facade = inject(PostFacade);
  private readonly breadcrumbService = inject(BreadcrumbService);
  private readonly datePipe = inject(DatePipe);

  protected readonly postId = toSignal(this.facade.postId$);
  protected readonly post = toSignal(this.facade.post$, { requireSync: true });
  protected readonly loading = toSignal(this.facade.loading$, { requireSync: true });

  constructor() {
    effect(() => {
      const postId = this.postId();
      if (postId) {
        this.facade.loadPost();
      }
    });

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
    this.facade.toggleLike(!this.post()?.liked);
  }
}
