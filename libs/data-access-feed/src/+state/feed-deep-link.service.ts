import { Injectable, inject } from '@angular/core';

import { DeepLinkService } from '@gl/util-services';
import { FeedFacade } from './feed.facade';
import { FeedFilters } from './feed.models';

@Injectable()
export class FeedDeepLinkService extends DeepLinkService<FeedFilters> {
  private readonly facade = inject(FeedFacade);

  readonly defaults: FeedFilters = { page: 1, size: 5 };

  applyFilters(filters: FeedFilters): void {
    this.facade.loadFeed(filters.page, filters.size);
    this.syncToUrl(filters);
  }
}
