export interface IPost {
  id: string;
  verified:boolean;
  user: string;
  type: string;
  title: string;
  genres: string[];
  comment: string;
  whereToWatch: string[];
  likes: {
    total: number;
    likedBy: ILikes[];
  };
}

interface ILikes {
  likedBy: {
    id: string;
    user:string;
  };
}
