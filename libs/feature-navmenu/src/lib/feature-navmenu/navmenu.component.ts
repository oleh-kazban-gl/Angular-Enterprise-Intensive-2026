import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'gl-navmenu',
  imports: [CommonModule, RouterModule, MatSidenavModule, MatIconModule, MatListModule, MatTooltipModule],
  templateUrl: './navmenu.component.html',
  styleUrl: './navmenu.component.scss',
})
export class NavmenuComponent {}
