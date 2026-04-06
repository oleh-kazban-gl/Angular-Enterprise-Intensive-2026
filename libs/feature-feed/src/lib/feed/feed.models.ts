export interface FeedPost {
  id: string;
  author: string;
  time: string;
  image: string;
  caption: string;
  location: string | null;
  collaborators: string[];
  hashtags: string[];
  likes?: number;
  createdAt: Date;
}
