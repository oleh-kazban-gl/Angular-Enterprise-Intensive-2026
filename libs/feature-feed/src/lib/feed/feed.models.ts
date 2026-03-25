export interface FeedPost {
  id: string;
  author: string;
  time: string;
  image: string;
  caption: string;
  likes?: number;
  createdAt: Date;
}
