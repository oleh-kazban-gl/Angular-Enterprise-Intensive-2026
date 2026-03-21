import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterModule } from '@angular/router';

import { CardComponent } from '@gl/ui-components/card';
import { ThemeService } from '@gl/util-services';

@Component({
  selector: 'gl-settings',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent, MatSlideToggleModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  readonly themeService = inject(ThemeService);
}
