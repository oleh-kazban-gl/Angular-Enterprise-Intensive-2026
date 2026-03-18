import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NavmenuComponent } from '@gl/feature-navmenu';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, NavmenuComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
