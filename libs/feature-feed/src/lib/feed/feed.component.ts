import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

import { TranslatePipe } from '@ngx-translate/core';

import { FeedFacade, FeedPagination, FeedPost, FeedDeepLinkService } from '@gl/data-access-feed';
import { CardComponent } from '@gl/ui-components/card';
import { CarouselComponent } from '@gl/ui-components/carousel';
import { LoadingComponent } from '@gl/ui-components/loading';

@Component({
  selector: 'gl-feed',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgOptimizedImage,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    CardComponent,
    CarouselComponent,
    TranslatePipe,
    LoadingComponent,
  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
})
export class FeedComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly facade = inject(FeedFacade);
  private readonly deepLink = inject(FeedDeepLinkService);

  protected readonly posts = toSignal<FeedPost[]>(this.facade.posts$, { requireSync: true });
  protected readonly loading = toSignal<boolean>(this.facade.loading$, { requireSync: true });
  protected readonly pagination = toSignal<FeedPagination | null>(this.facade.pagination$, { initialValue: null });

  ngOnInit(): void {
    this.deepLink.init();
  }

  protected goToPost(postId: string): void {
    this.router.navigate(['/posts', postId]);
  }

  protected toggleLike(post: FeedPost): void {
    this.facade.toggleLike(post.id, !post.liked);
  }

  protected onPageChange(event: PageEvent): void {
    this.deepLink.applyFilters({ page: event.pageIndex + 1, size: event.pageSize });
  }
}
