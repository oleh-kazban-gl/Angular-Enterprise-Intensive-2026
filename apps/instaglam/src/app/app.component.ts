import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NavmenuComponent } from '@gl/feature-navmenu';

@Component({
  imports: [RouterModule, NavmenuComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
