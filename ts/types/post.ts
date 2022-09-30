import { Follow } from './user';

export type Post = {
  postId: string;
  type: string;
  userId: string;
  title: string;
  rating: number;
  comment: string;
  whereToWatch: string[];
  genre: string[];
  likedBy: Follow[];
  favoritedBy: Follow[];
};
