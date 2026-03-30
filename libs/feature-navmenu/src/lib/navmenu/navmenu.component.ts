import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRouteSnapshot, NavigationEnd, Router, RouterModule } from '@angular/router';

import { filter, map, startWith } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';

import { BreadcrumbService } from '@gl/util-services';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

@Component({
  selector: 'gl-navmenu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule,
    TranslatePipe,
    BreadcrumbComponent,
  ],
  templateUrl: './navmenu.component.html',
  styleUrl: './navmenu.component.scss',
})
export class NavmenuComponent {
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly router = inject(Router);
  private readonly breadcrumbService = inject(BreadcrumbService);

  protected readonly hasBreadcrumbs = computed(() => this.breadcrumbService.breadcrumbs().length > 1);

  readonly isMobile = toSignal(this.breakpointObserver.observe('(max-width: 767px)').pipe(map(r => r.matches)), {
    initialValue: false,
  });

  readonly pageTitle = toSignal(
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      startWith(null),
      map(() => {
        let route: ActivatedRouteSnapshot = this.router.routerState.snapshot.root;
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route.data['pageTitle'] as string | undefined;
      })
    )
  );
}
