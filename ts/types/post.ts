export type Post = {
  postId: string;
  type: string;
  userId: string;
  title: string;
  rating: number;
  comment: string;
  whereToWatch: string[];
  genre: string[];
  likedBy: Status[];
  favoritedBy: Status[];
  createdAt:string
};

export type Status = {
    userId: string
    id: string
}

export type PostCardType = Post & {
  userName: string;
  isVerified: boolean;
  loggedUserId: string;
};

export type PostCard = Post & { userName: string; isVerified: boolean ;};
