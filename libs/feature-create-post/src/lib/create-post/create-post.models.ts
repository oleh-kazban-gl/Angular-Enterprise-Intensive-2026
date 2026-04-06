import { Location } from '@gl/util-services';

export interface Post {
  id: string;
  author: string;
  image: string;
  caption: string;
  location: string | null;
  collaborators: string[];
  hashtags: string[];
  createdAt: string;
}

export interface CreatePostPayload {
  author: string;
  photo: File;
  caption: string;
  location: Location | string | null;
  collaborators: string[];
  hashtags: string[];
}
