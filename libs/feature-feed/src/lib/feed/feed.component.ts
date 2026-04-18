import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

import { TranslatePipe } from '@ngx-translate/core';

import { AuthFacade } from '@gl/data-access-auth';
import { FeedFacade, FeedPagination, FeedPost, FeedDeepLinkService } from '@gl/data-access-feed';
import { CardComponent } from '@gl/ui-components/card';
import { CarouselComponent } from '@gl/ui-components/carousel';
import { LoadingComponent } from '@gl/ui-components/loading';

@Component({
  selector: 'gl-feed',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgOptimizedImage,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
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
  private readonly authFacade = inject(AuthFacade);
  private readonly deepLink = inject(FeedDeepLinkService);

  protected readonly posts = toSignal<FeedPost[]>(this.facade.posts$, { requireSync: true });
  protected readonly loading = toSignal<boolean>(this.facade.loading$, { requireSync: true });
  protected readonly pagination = toSignal<FeedPagination | null>(this.facade.pagination$, { initialValue: null });
  protected readonly submittingCommentPostId = toSignal(this.facade.submittingCommentPostId$, { initialValue: null });
  protected readonly currentUser = toSignal(this.authFacade.currentUser$);

  protected readonly openCommentPostId = signal<string | null>(null);
  protected readonly commentControls = new Map<string, FormControl<string | null>>();

  constructor() {
    this.facade.commentAdded$.pipe(takeUntilDestroyed()).subscribe(({ postId }) => {
      this.commentControls.get(postId)?.reset();
      this.openCommentPostId.set(null);
    });
  }

  ngOnInit(): void {
    this.deepLink.init();
  }

  protected getCommentControl(postId: string): FormControl<string | null> {
    if (!this.commentControls.has(postId)) {
      this.commentControls.set(postId, new FormControl('', [Validators.required, Validators.maxLength(1000)]));
    }
    return this.commentControls.get(postId)!;
  }

  protected goToPost(postId: string): void {
    this.router.navigate(['/posts', postId]);
  }

  protected toggleLike(post: FeedPost): void {
    this.facade.toggleLike(post.id, !post.liked);
  }

  protected toggleComment(postId: string): void {
    this.openCommentPostId.update(current => (current === postId ? null : postId));
  }

  protected submitComment(postId: string): void {
    const control = this.commentControls.get(postId);
    if (!control || control.invalid || this.submittingCommentPostId() === postId) {
      return;
    }
    const author = this.currentUser()?.username;
    if (!author) {
      return;
    }
    this.facade.addComment(postId, control.value!.trim(), author);
  }

  protected onPageChange(event: PageEvent): void {
    this.deepLink.applyFilters({ page: event.pageIndex + 1, size: event.pageSize });
  }
}
