import User from '../models/User';
import Post from '../models/Post';

import { PostCard } from '../ts/types/post';

import * as jose from 'jose';
import Follow from '../models/Follow';
import { NextResponse } from 'next/server';
const JWT_SECRET = process.env.JWT_SECRET;

export const getUserId = async (jwt: string | undefined, reqUrl?:string) : Promise<string | unknown > => {
  
  try {
    const response = await jose.jwtVerify( jwt!, new TextEncoder().encode(JWT_SECRET));
    const _id = await response.payload.userId as string; 
    return  _id
  } catch (error) {
    return NextResponse.redirect(new URL('/', reqUrl));
  }

  
};

export const getAllPosts = async (_id:string) => {
  const user = await User.findById(_id, { password: 0, createdAt: 0, _id: 0, email: 0, updatedAt: 0, });
  const userResponse = JSON.parse(JSON.stringify(user));

  const loggedUser = await Post.aggregate([
    {$match : {userId: user?.userId}},
    { $addFields: {
      userName:userResponse?.userName,
      isVerified: userResponse?.isVerified
    }}
  ])

  const loggedUserPosts = JSON.parse(JSON.stringify(loggedUser))
  const userFollowCollection = await Follow.find({userId: user?.userId})
  const userFollowingIds = userFollowCollection[0].following.map(follow =>follow.userId)

  const followingPosts = await Post.aggregate([
    {$match: {userId: {$in: userFollowingIds}}},
    {
      $lookup:
        {
          from: 'users',
          localField: 'userId',
          foreignField: 'userId',
          as: 'user'
        }
   },
   { $unwind: '$user' },
   { $replaceRoot: { newRoot: { $mergeObjects: [ "$user" , "$$ROOT" ] } } },
   {$project: {user: 0, password: 0, email:0, name:0,description:0, location:0}}
  ])
  
  
  const userFollowingPostsWithUserName:PostCard[] = await JSON.parse(JSON.stringify(followingPosts))
  
  return [...loggedUserPosts, ...userFollowingPostsWithUserName ]
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


export const getUserFollow = async (id:string) => {

    const followDocument = await Follow.find({userId: id})

    const followersIds = followDocument[0]?.followers.map(follow => follow.userId)
    const followersProfile = await User.find({userId: {$in: followersIds}},{password: 0,email:0,createdAt:0,updatedAt:0,_id:0})

    const followingIds = followDocument[0]?.following.map(follow => follow.userId)
    const followingProfile = await User.find({userId: {$in: followingIds}},{password: 0,email:0,createdAt:0,updatedAt:0,_id:0})

    return {followers: JSON.parse(JSON.stringify(followersProfile)), following:JSON.parse(JSON.stringify(followingProfile))}
}