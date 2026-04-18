import { DatePipe, NgOptimizedImage, UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

import { TranslatePipe } from '@ngx-translate/core';

import { AuthFacade } from '@gl/data-access-auth';
import { PostsFacade } from '@gl/data-access-posts';
import { CardComponent } from '@gl/ui-components/card';
import { CarouselComponent } from '@gl/ui-components/carousel';
import { LoadingComponent } from '@gl/ui-components/loading';
import { CollaboratorsSetComponent } from './collaborators-set.component';
import { TagsSetComponent } from './tags-set.component';

@Component({
  selector: 'gl-post-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DatePipe,
    NgOptimizedImage,
    UpperCasePipe,
    ReactiveFormsModule,
    CardComponent,
    CarouselComponent,
    LoadingComponent,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    TranslatePipe,
    CollaboratorsSetComponent,
    TagsSetComponent,
  ],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss',
})
export class PostCardComponent {
  readonly postId = input.required<string>();
  /** Show the Back button in the footer (post detail route). */
  readonly showBack = input(false);

  /** Emitted when the carousel is clicked (feed uses this to navigate to detail). */
  readonly openDetail = output<string>();
  /** Emitted when the Back button is clicked (post detail route handles navigation). */
  readonly back = output<void>();

  private readonly facade = inject(PostsFacade);
  private readonly authFacade = inject(AuthFacade);

  protected readonly post = toSignal(toObservable(this.postId).pipe(switchMap(id => this.facade.postById$(id))), {
    initialValue: null,
  });

  protected readonly loading = toSignal(
    toObservable(this.postId).pipe(switchMap(id => this.facade.isPostLoading$(id))),
    { initialValue: false }
  );

  protected readonly submittingCommentPostId = toSignal(this.facade.submittingCommentPostId$, {
    initialValue: null,
  });

  protected readonly currentUser = toSignal(this.authFacade.currentUser$);

  protected readonly commentControl = new FormControl('', [Validators.required, Validators.maxLength(1000)]);
  protected readonly commentMode = signal(false);

  constructor() {
    this.facade.commentAdded$.pipe(takeUntilDestroyed()).subscribe(({ postId }) => {
      if (postId === this.postId()) {
        this.commentControl.reset();
        this.commentMode.set(false);
      }
    });
  }

  protected onCarouselClick(): void {
    this.openDetail.emit(this.postId());
  }

  protected toggleLike(): void {
    const post = this.post();
    if (!post) return;
    this.facade.toggleLike(post.id, !post.liked);
  }

  protected discardComment(): void {
    this.commentControl.reset();
    this.commentMode.set(false);
  }

  protected submitComment(): void {
    const postId = this.postId();
    if (this.commentControl.invalid || this.submittingCommentPostId() === postId) return;
    const author = this.currentUser()?.username;
    if (!author) return;
    this.facade.addComment(postId, this.commentControl.value!.trim(), author);
  }
}
