import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NavmenuComponent } from '@gl/feature-navmenu';
import { ThemeService } from '@gl/util-services';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, NavmenuComponent],
  selector: 'gl-root',
  selector: 'gl-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  // Injecting ThemeService at root level ensures the effect runs from app startup
  readonly themeService = inject(ThemeService);
}
