import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

import { TranslatePipe } from '@ngx-translate/core';

import { CardComponent } from '@gl/ui-components/card';
import { FeedPost } from './feed.models';
import { FeedService } from './feed.service';

@Component({
  selector: 'gl-feed',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NgOptimizedImage, MatIconModule, MatButtonModule, CardComponent, TranslatePipe],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
})
export class FeedComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly feedService = inject(FeedService);

  protected readonly posts = this.feedService.posts;

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
