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

/** Shape of the paginated response returned by json-server v0 (plain array + X-Total-Count header). */
export interface PagedFeedResponse {
  posts: FeedPost[];
  totalItems: number;
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

export interface FeedComment {
  id: string;
  postId: string;
  author: string;
  content: string;
  createdAt: string;
}
