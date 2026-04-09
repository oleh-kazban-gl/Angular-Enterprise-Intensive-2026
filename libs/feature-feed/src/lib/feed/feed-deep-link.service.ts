import { Injectable, inject } from '@angular/core';

import { FeedFacade, FeedFilters } from '@gl/data-access-feed';
import { DeepLinkService } from '@gl/util-services';

@Injectable()
export class FeedDeepLinkService extends DeepLinkService<FeedFilters> {
  private readonly facade = inject(FeedFacade);

  readonly defaults: FeedFilters = { page: 1, size: 5 };

  applyFilters(filters: FeedFilters): void {
    this.facade.loadFeed(filters.page, filters.size);
    this.syncToUrl(filters);
  }
}
