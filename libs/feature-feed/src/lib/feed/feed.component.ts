import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

import { TranslatePipe } from '@ngx-translate/core';

import { FeedDeepLinkService, PostsFacade, PostsPagination } from '@gl/data-access-posts';
import { PostCardComponent } from '@gl/feature-post-card';
import { LoadingComponent } from '@gl/ui-components/loading';

@Component({
  selector: 'gl-feed',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatPaginatorModule, TranslatePipe, LoadingComponent, PostCardComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
})
export class FeedComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly facade = inject(PostsFacade);
  private readonly deepLink = inject(FeedDeepLinkService);

  protected readonly postIds = toSignal<string[]>(this.facade.feedPostIds$, { requireSync: true });
  protected readonly loading = toSignal<boolean>(this.facade.feedLoading$, { requireSync: true });
  protected readonly pagination = toSignal<PostsPagination | null>(this.facade.pagination$, {
    initialValue: null,
  });

  ngOnInit(): void {
    this.deepLink.init();
  }

  protected goToPost(postId: string): void {
    this.router.navigate(['/posts', postId]);
  }

  protected onPageChange(event: PageEvent): void {
    this.deepLink.applyFilters({ page: event.pageIndex + 1, size: event.pageSize });
  }
}
