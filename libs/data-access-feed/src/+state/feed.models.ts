export interface FeedPost {
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
