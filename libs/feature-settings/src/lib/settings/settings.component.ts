import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterModule } from '@angular/router';

import { TranslatePipe } from '@ngx-translate/core';

import { SettingsFacade } from '@gl/data-access-settings';
import { CardComponent } from '@gl/ui-components/card';
import { LoadingComponent } from '@gl/ui-components/loading';
import { LanguageService, ThemeService } from '@gl/util-services';

@Component({
  selector: 'gl-settings',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    CardComponent,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    TranslatePipe,
    MatSelectModule,
    LoadingComponent,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
  readonly themeService = inject(ThemeService);
  readonly languageService = inject(LanguageService);
  readonly facade = inject(SettingsFacade);

  ngOnInit(): void {
    this.facade.loadSettings();
  }
}
