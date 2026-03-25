export interface Post {
  id: string;
  author: string;
  time: string;
  image: string;
  caption: string;
  likes?: number;
  createdAt: Date;
}
