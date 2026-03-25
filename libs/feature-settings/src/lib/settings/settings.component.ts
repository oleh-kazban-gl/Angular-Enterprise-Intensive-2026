import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterModule } from '@angular/router';

import { TranslatePipe } from '@ngx-translate/core';

import { CardComponent } from '@gl/ui-components/card';
import { LanguageService, ThemeService } from '@gl/util-services';
import { SettingsService } from './settings.service';

@Component({
  selector: 'gl-settings',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CardComponent,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    TranslatePipe,
    MatSelectModule,
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  readonly themeService = inject(ThemeService);
  readonly languageService = inject(LanguageService);
  readonly settingsService = inject(SettingsService);

  ngOnInit(): void {
    this.settingsService.getSettings();
  }
}
