export interface Comment {
  id: string;
  postId: string;
  author: string;
  content: string;
  createdAt: string;
}

export interface Post {
  id: string;
  author: string;
  avatarUrl: string;
  images: string[];
  caption: string;
  location: string | null;
  collaborators: string[];
  hashtags: string[];
  likes: number;
  liked: boolean;
  createdAt: string;
  comments: Comment[];
}

/** Shape of the paginated response from json-server (plain array + X-Total-Count header). */
export interface PagedPostsResponse {
  posts: Post[];
  totalItems: number;
}

export interface PostsPagination {
  page: number;
  size: number;
  totalItems: number;
  totalPages: number;
}

export interface PostsFilters {
  page: number;
  size: number;
}
