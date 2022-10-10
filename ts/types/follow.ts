export type Follow = {
  userId:string;
  followers: FollowersAndFollowing[];
  following: FollowersAndFollowing[]
}

type FollowersAndFollowing = {
  userId: string
}