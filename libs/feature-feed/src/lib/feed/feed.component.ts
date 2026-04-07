import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

import { TranslatePipe } from '@ngx-translate/core';

import { CardComponent } from '@gl/ui-components/card';
import { CarouselComponent } from '@gl/ui-components/carousel';
import { LoadingComponent } from '@gl/ui-components/loading';
import { FeedPost } from './feed.models';
import { FeedService } from './feed.service';

@Component({
  selector: 'gl-feed',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
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
  private readonly feedService = inject(FeedService);

  protected readonly posts = this.feedService.posts;
  protected readonly loading = this.feedService.loading;

  ngOnInit(): void {
    this.feedService.getPosts();
  }

  protected goToPost(postId: string): void {
    this.router.navigate(['/posts', postId]);
  }

  protected likePost(post: FeedPost): void {
    post.likes = (post.likes || 0) + 1;
  }
}
