export type User = {
  name: string;
  userName: string;
  email: string;
  password: string;
  description: string;
  location: string;
  isVerified: boolean;
  followers: Follow[]
  following: Follow[]
};

export type Follow = {
  userName: string
  name: string
  isVerified: boolean
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
