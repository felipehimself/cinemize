import User from '../models/User';
import Post from '../models/Post';

import { Post as PostType , PostCard } from '../ts/types/post';
import { UserId, UserPost , User as UserType, UserProfile} from '../ts/types/user';

import * as jose from 'jose';
import Follow from '../models/Follow';
const JWT_SECRET = process.env.JWT_SECRET;

export const getUserId = async (jwt: string | undefined) : Promise<string> => {
  let id:string = ''
  try {
    const response = await jose.jwtVerify( jwt!, new TextEncoder().encode(JWT_SECRET));
    const _id = await response.payload.userId as string; 
    id = _id
  } catch (error) {
    console.log(error);
  }

  return id
};

export const getAllPosts = async (_id:string) => {
  const user = await User.findById(_id, { password: 0, createdAt: 0, _id: 0, email: 0, updatedAt: 0, });
  const userResponse = JSON.parse(JSON.stringify(user));

  // const postsIds = userResponse.posts.map((post: UserPost) => post.postId);

  const userPosts = await Post.aggregate([
    {$match : {userId: user?.userId}},
    { $addFields: {
      userName:userResponse?.userName,
      isVerified: userResponse?.isVerified
    }}
  ])

  const loggedUserPosts = JSON.parse(JSON.stringify(userPosts))

  const followingIds = user?.following.map(user => user.userId)
  const userFollowing = await User.find({userId: {$in: followingIds}})

  const followingPosts = await Post.find({userId: {$in:followingIds }})
  const followingPostsParsed:PostType[] = await JSON.parse(JSON.stringify(followingPosts))

  const followingPostsWithUserName:PostCard[] = [];


  followingPostsParsed.forEach((post) => {
    userFollowing.forEach(user => {
      if(post.userId === user.userId){
        followingPostsWithUserName.push({...post, userName: user.userName, isVerified:user.isVerified})
      }
    })
  })


  return [...loggedUserPosts, ...followingPostsWithUserName ]
}

export const getUserPosts = async (_id:string) => {
  const user = await User.findOne({userId: _id}, { password: 0, createdAt: 0, _id: 0, email: 0, updatedAt: 0, });
  const userResponse = JSON.parse(JSON.stringify(user));

  const loggedUserPosts = await Post.aggregate([
    { $match: { userId: userResponse?.userId } },
    { $addFields: {
      userName:userResponse?.userName,
      isVerified: userResponse?.isVerified
    }}
  ]);

  return JSON.parse(JSON.stringify(loggedUserPosts))
}


export const getFollowersAndFollowing = async (userResponse:UserType) : Promise<{followers: UserProfile[], following: UserProfile[]}> => {
  
  // FOLLOWERS DO PERFIL VISITADO
  const followersIds = userResponse?.followers?.map((user: UserId) => user.userId );

  const followers = await User.find(
    { userId: { $in: followersIds } },
    {
      _id: 0,
      email: 0,
      password: 0,
      followers: 0,
      following: 0,
      createdAt: 0,
      updatedAt: 0,
      posts: 0,
    }
  );

  //

  // FOLLOWING DO PERFIL VISITADO
  const followingIds = userResponse?.following.map((user: UserId) => user.userId);

  const following = await User.find(
    { userId: { $in: followingIds } },
    {
      _id: 0,
      email: 0,
      password: 0,
      followers: 0,
      following: 0,
      createdAt: 0,
      updatedAt: 0,
      posts: 0,
    }
  );

  return {followers: [...JSON.parse(JSON.stringify(followers))], following: [...JSON.parse(JSON.stringify(following))]}

}

export const getUserFollow = async (id:string) => {

    const followDocument = await Follow.find({userId: id})

    const followersIds = followDocument[0]?.followers.map(follow => follow.followId)
    const followersProfile = await User.find({userId: {$in: followersIds}},{password: 0,email:0,createdAt:0,updatedAt:0,_id:0})

    const followingIds = followDocument[0]?.following.map(follow => follow.followId)
    const followingProfile = await User.find({userId: {$in: followingIds}},{password: 0,email:0,createdAt:0,updatedAt:0,_id:0})

    return {followers: JSON.parse(JSON.stringify(followersProfile)), following:JSON.parse(JSON.stringify(followingProfile))}
}