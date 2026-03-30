import { Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRouteSnapshot, NavigationEnd, NavigationStart, Router } from '@angular/router';

import { filter, map, startWith } from 'rxjs';

export interface Breadcrumb {
  label: string;
  url: string | null;
}

@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
  private readonly router = inject(Router);
  private readonly dynamicLabel = signal<string | null>(null);

  private readonly staticBreadcrumbs = toSignal(
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      startWith(null),
      map(() => this.buildStaticBreadcrumbs())
    ),
    { initialValue: [] as Breadcrumb[] }
  );

  readonly breadcrumbs = computed<Breadcrumb[]>(() => {
    const crumbs = this.staticBreadcrumbs();
    const dynamic = this.dynamicLabel();

    if (!dynamic || crumbs.length === 0) {
      return crumbs;
    }

    return [...crumbs.slice(0, -1), { ...crumbs[crumbs.length - 1], label: dynamic }];
  });

  constructor() {
    this.router.events
      .pipe(
        filter((e): e is NavigationStart => e instanceof NavigationStart),
        takeUntilDestroyed()
      )
      .subscribe(() => this.dynamicLabel.set(null));
  }

  setDynamicLabel(label: string): void {
    this.dynamicLabel.set(label);
  }

  private buildStaticBreadcrumbs(): Breadcrumb[] {
    const crumbs: Breadcrumb[] = [];
    let route: ActivatedRouteSnapshot | null = this.router.routerState.snapshot.root;
    let url = '';

    while (route) {
      const segments = route.url.map(s => s.path).join('/');
      if (segments) {
        url += `/${segments}`;
      }
      if (route.url.length > 0 && route.data['breadcrumb']) {
        crumbs.push({
          label: route.data['breadcrumb'] as string,
          url: route.firstChild ? url : null,
        });
      }
      route = route.firstChild;
    }

    return crumbs;
  }
}
