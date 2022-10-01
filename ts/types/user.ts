export type User = {
  name: string;
  userName: string;
  userId: string;
  email: string;
  password: string;
  description: string;
  location: string;
  isVerified: boolean;
  followers: UserId[]
  following: UserId[]
  posts: UserPost[]
};

export type UserId = {
  userId: string
}

export type UserPost = {
  postId: string
}


export type UserFollowers = {
  name:string
  userName:string;
  isVerified: boolean
}

export type UserFollowing = {
  name:string
  userName:string;
}

export type UserProfile =   Omit<User, 'email' | 'password'> ;
