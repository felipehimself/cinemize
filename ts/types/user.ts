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
  posts: UserPosts[]
};

type UserId = {
  userId: string
}

export type UserPosts = {
  postId: string
}

export type Follow = {
  userName: string
  name: string
  isVerified: boolean
  userId: string
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

//export type UserProfile =  Pick<User, 'name' | 'userName' | 'description' | 'isVerified' | 'location'> & UserFollowers[] & UserFollowing[];
