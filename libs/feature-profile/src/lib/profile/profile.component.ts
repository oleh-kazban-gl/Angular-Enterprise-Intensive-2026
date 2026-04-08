import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';

import { TranslatePipe } from '@ngx-translate/core';

import { ProfileFacade } from '@gl/data-access-profile';
import { CardComponent } from '@gl/ui-components/card';
import { LoadingComponent } from '@gl/ui-components/loading';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'gl-profile',
  imports: [CardComponent, MatButtonModule, TranslatePipe, LoadingComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  private readonly facade = inject(ProfileFacade);

  protected readonly profile = toSignal(this.facade.profile$, { requireSync: true });
  protected readonly loading = toSignal(this.facade.loading$, { requireSync: true });

  ngOnInit(): void {
    this.facade.loadProfile();
  }
}
