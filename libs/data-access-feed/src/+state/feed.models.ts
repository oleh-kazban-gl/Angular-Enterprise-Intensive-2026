export interface FeedPost {
  id: string;
  author: string;
  avatarUrl: string;
  time: string;
  images: string[];
  caption: string;
  location: string | null;
  likes: number;
  liked: boolean;
  createdAt: string;
}

/** Shape of the paginated envelope returned by json-server v1. */
export interface PagedFeedResponse {
  data: FeedPost[];
  items: number;
  pages: number;
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
}

/** Pagination metadata stored in NgRx feed state. */
export interface FeedPagination {
  page: number;
  size: number;
  totalItems: number;
  totalPages: number;
}

/** Query-param filter shape for the feed deep-link service. */
export interface FeedFilters {
  page: number;
  size: number;
}
