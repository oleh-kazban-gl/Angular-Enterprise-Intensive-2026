import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';

import { TranslatePipe } from '@ngx-translate/core';

import { AuthFacade } from '@gl/data-access-auth';
import { ProfileFacade } from '@gl/data-access-profile';
import { CardComponent } from '@gl/ui-components/card';
import { LoadingComponent } from '@gl/ui-components/loading';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'gl-profile',
  imports: [NgOptimizedImage, CardComponent, MatButtonModule, TranslatePipe, LoadingComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  private readonly profileFacade = inject(ProfileFacade);
  private readonly authFacade = inject(AuthFacade);

  protected readonly profile = toSignal(this.profileFacade.profile$, { requireSync: true });
  protected readonly loading = toSignal(this.profileFacade.loading$, { requireSync: true });
  protected readonly currentUser = toSignal(this.authFacade.currentUser$, { requireSync: true });

  ngOnInit(): void {
    this.profileFacade.loadProfile();
  }
}
