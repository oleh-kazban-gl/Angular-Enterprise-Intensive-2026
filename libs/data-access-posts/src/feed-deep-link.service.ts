import { Injectable, inject } from '@angular/core';

import { DeepLinkService } from '@gl/util-services';
import { PostsFacade } from './+state/posts.facade';
import { PostsFilters } from './+state/posts.models';

@Injectable()
export class FeedDeepLinkService extends DeepLinkService<PostsFilters> {
  private readonly facade = inject(PostsFacade);

  readonly defaults: PostsFilters = { page: 1, size: 5 };

  applyFilters(filters: PostsFilters): void {
    this.facade.loadFeedPage(filters.page, filters.size);
    this.syncToUrl(filters);
  }
}
