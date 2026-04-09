import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Store } from '@ngrx/store';

import { AuthActions } from '@gl/data-access-auth';
import { NavmenuComponent } from '@gl/feature-navmenu';
import { LanguageService, ThemeService } from '@gl/util-services';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, NavmenuComponent],
  selector: 'gl-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  // Injecting at root level ensures effects run from app startup
  readonly themeService = inject(ThemeService);
  readonly languageService = inject(LanguageService);

  constructor() {
    inject(Store).dispatch(AuthActions.restoreAuth());
  }
}
