import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

import { getRouterSelectors } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { TranslatePipe } from '@ngx-translate/core';

import { PostsFacade, selectPostById } from '@gl/data-access-posts';
import { PostCardComponent } from '@gl/feature-post-card';
import { BreadcrumbService } from '@gl/util-services';

const { selectRouteParam } = getRouterSelectors();

@Component({
  selector: 'gl-post',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe, PostCardComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly facade = inject(PostsFacade);
  private readonly breadcrumbService = inject(BreadcrumbService);

  protected readonly postId = toSignal(this.store.select(selectRouteParam('id')));

  private readonly breadcrumbLabel = computed(() => {
    const id = this.postId();
    if (!id) {
      return null;
    }
    const post = this.store.selectSignal(selectPostById(id))();
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
      const id = this.postId();
      if (id) {
        this.facade.loadPost(id);
      }
    });

    effect(() => {
      const label = this.breadcrumbLabel();
      if (label) {
        this.breadcrumbService.setDynamicLabel(label);
      }
    });
  }

  protected goBack(): void {
    this.router.navigate(['/posts']);
  }
}
