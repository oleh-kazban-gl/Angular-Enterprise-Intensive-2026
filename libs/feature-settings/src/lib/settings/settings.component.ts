import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { CardComponent } from '@gl/ui-components/card';
import { ThemeService } from '@gl/util-services';

@Component({
  selector: 'gl-settings',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent, MatSlideToggleModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  readonly themeService = inject(ThemeService);
}
