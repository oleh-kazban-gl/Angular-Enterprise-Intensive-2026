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
