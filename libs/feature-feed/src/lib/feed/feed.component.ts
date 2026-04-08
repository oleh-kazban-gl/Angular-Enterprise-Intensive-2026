import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

import { TranslatePipe } from '@ngx-translate/core';

import { FeedFacade, FeedPost } from '@gl/data-access-feed';
import { CardComponent } from '@gl/ui-components/card';
import { CarouselComponent } from '@gl/ui-components/carousel';
import { LoadingComponent } from '@gl/ui-components/loading';

@Component({
  selector: 'gl-feed',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
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

  protected readonly posts = toSignal(this.facade.posts$, { requireSync: true });
  protected readonly loading = toSignal(this.facade.loading$, { requireSync: true });

  ngOnInit(): void {
    this.facade.loadFeed();
  }

  protected goToPost(postId: string): void {
    this.router.navigate(['/posts', postId]);
  }

  protected likePost(post: FeedPost): void {
    this.facade.likePost(post.id);
  }
}
