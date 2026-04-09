import { Location } from '@angular/common';
import { inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * Abstract base for feature-specific deep-link services.
 *
 * Each feature extending this class declares its filter shape via `defaults`
 * (a plain object whose keys are the query-param names and whose values are
 * the typed defaults).  The base class owns bidirectional URL ↔ NgRx sync;
 * the concrete class owns the dispatch logic.
 *
 * Usage:
 *   1. Extend with a concrete `@Injectable()` class in the feature.
 *   2. Declare `readonly defaults` with every param key and its default value.
 *   3. Implement `applyFilters(filters)` – dispatch to the store + call `syncToUrl`.
 *   4. Call `this.deepLink.init()` from the feature component's `ngOnInit`.
 */
export abstract class DeepLinkService<TFilters extends { [K in keyof TFilters]: string | number }> {
  protected readonly router = inject(Router);
  protected readonly route = inject(ActivatedRoute);
  private readonly location = inject(Location);

  /** Default values that also define the shape and types of the filter params. */
  abstract readonly defaults: TFilters;

  /**
   * Dispatch the resolved filters to NgRx and sync the URL.
   * Implemented by the concrete feature service.
   */
  abstract applyFilters(filters: TFilters): void;

  /**
   * Read query params from the current URL, merge with defaults (type-coercing
   * numeric params), then call `applyFilters` with the resolved values.
   * Call this once from the feature component's `ngOnInit`.
   */
  init(): void {
    const queryParams = this.route.snapshot.queryParams;
    const filters = { ...this.defaults } as TFilters;

    for (const key of Object.keys(this.defaults) as (keyof TFilters)[]) {
      const rawVal = queryParams[key as string];
      if (rawVal !== undefined) {
        const defaultVal = this.defaults[key];
        (filters as Record<keyof TFilters, unknown>)[key] =
          typeof defaultVal === 'number' ? Number(rawVal) : String(rawVal);
      }
    }

    this.applyFilters(filters);
  }

  /**
   * Update the browser URL with the given filter values without adding a
   * browser-history entry.  Uses Location.replaceState so no router navigation
   * is triggered — avoids any re-render or ngOnInit loop.
   */
  syncToUrl(filters: TFilters): void {
    const path = this.router.url.split('?')[0];
    const urlTree = this.router.createUrlTree([path], { queryParams: filters });
    this.location.replaceState(this.router.serializeUrl(urlTree));
  }
}
