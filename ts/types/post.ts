import { UserId } from './user';

export type Post = {
  postId: string;
  type: string;
  userId: string;
  title: string;
  rating: number;
  comment: string;
  whereToWatch: string[];
  genre: string[];
  likedBy: UserId[];
  favoritedBy: UserId[];
};

export type PostCard = Post & { userName: string; isVerified: boolean };
