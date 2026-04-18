import { DatePipe, UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

import { TranslatePipe } from '@ngx-translate/core';

import { AuthFacade } from '@gl/data-access-auth';
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
    ReactiveFormsModule,
    CardComponent,
    CarouselComponent,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
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
  private readonly authFacade = inject(AuthFacade);
  private readonly breadcrumbService = inject(BreadcrumbService);

  protected readonly postId = toSignal(this.facade.postId$);
  protected readonly post = toSignal(this.facade.post$, { requireSync: true });
  protected readonly loading = toSignal(this.facade.loading$, { requireSync: true });
  protected readonly submittingComment = toSignal(this.facade.submittingComment$, { initialValue: false });
  protected readonly currentUser = toSignal(this.authFacade.currentUser$);

  protected readonly commentControl = new FormControl('', [Validators.required, Validators.maxLength(1000)]);

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

    this.facade.commentAdded$.pipe(takeUntilDestroyed()).subscribe(() => {
      this.commentControl.reset();
    });
  }

  protected goBack() {
    this.router.navigate(['/posts']);
  }

  protected like() {
    this.facade.toggleLike(!this.post()?.liked);
  }

  protected submitComment(): void {
    if (this.commentControl.invalid || this.submittingComment()) {
      return;
    }
    const author = this.currentUser()?.username;
    if (!author) {
      return;
    }
    this.facade.addComment(this.commentControl.value!.trim(), author);
  }
}

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
