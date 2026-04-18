export interface UserProfile {
  id: string;
  avatar: string;
  bio: string;
  posts: number;
  followers: number;
  following: number;
}

export interface UpdateProfilePayload {
  bio: string;
  avatar: File | null;
}
