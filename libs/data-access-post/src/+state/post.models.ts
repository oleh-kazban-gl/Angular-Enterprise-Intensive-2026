export interface Post {
  id: string;
  author: string;
  time: string;
  images: string[];
  caption: string;
  location: string | null;
  collaborators: string[];
  hashtags: string[];
  likes: number;
  liked: boolean;
  createdAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  author: string;
  content: string;
  createdAt: string;
}
