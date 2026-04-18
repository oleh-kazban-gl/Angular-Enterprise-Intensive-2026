import { ChangeDetectionStrategy, Component, OnInit, inject, signal, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';

import { TranslatePipe } from '@ngx-translate/core';

import { AuthFacade } from '@gl/data-access-auth';
import { ProfileFacade, UpdateProfilePayload } from '@gl/data-access-profile';
import { CardComponent } from '@gl/ui-components/card';
import { LoadingComponent } from '@gl/ui-components/loading';
import { HasPendingChanges } from '@gl/util-forms';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'gl-profile',
  host: {
    '(window:beforeunload)': 'onBeforeUnload($event)',
  },
  imports: [CardComponent, MatButtonModule, TranslatePipe, LoadingComponent, EditProfileComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit, HasPendingChanges {
  private readonly profileFacade = inject(ProfileFacade);
  private readonly authFacade = inject(AuthFacade);

  protected readonly profile = toSignal(this.profileFacade.profile$, { requireSync: true });
  protected readonly loading = toSignal(this.profileFacade.loading$, { requireSync: true });
  protected readonly saving = toSignal(this.profileFacade.saving$, { initialValue: false });
  protected readonly saved = toSignal(this.profileFacade.saved$, { initialValue: false });
  protected readonly currentUser = toSignal(this.authFacade.currentUser$, { requireSync: true });

  protected readonly isEditing = signal(false);

  constructor() {
    effect(() => {
      if (this.saved()) {
        this.isEditing.set(false);
      }
    });
  }

  ngOnInit(): void {
    this.profileFacade.loadProfile();
  }

  protected startEdit(): void {
    this.isEditing.set(true);
  }

  hasPendingChanges(): boolean {
    return this.isEditing();
  }

  protected onBeforeUnload(event: BeforeUnloadEvent): void {
    if (this.hasPendingChanges()) {
      event.preventDefault();
    }
  }

  protected cancelEdit(): void {
    this.isEditing.set(false);
  }

  protected saveProfile(payload: UpdateProfilePayload): void {
    this.profileFacade.updateProfile(payload);
  }
}
