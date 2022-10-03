import { NextApiRequest, NextApiResponse } from 'next';
import { connect } from 'mongoose';
import User from '../../../models/User';
import Follow from '../../../models/Follow';
import * as jose from 'jose';
import { getUserFollow, getUserId } from '../../../utils/dbFunctions';

const MONGODB_URI = process.env.MONGODB_URI || '';
const JWT_SECRET = process.env.JWT_SECRET;

type Response = {
  message: string;
  success: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  await connect(MONGODB_URI).catch((err) =>
    res.status(400).json({ message: 'Algo deu errado', success: false })
  );
  
  const jwt = req?.cookies?.CinemizeJWT;

  if(jwt === undefined){
    res.status(401).json({ message: 'Não autorizado', success: false });
  }
  
  const _id = await getUserId(jwt)

  if (req.method === 'POST') {
    const { userId } = req.body;

    if (!userId) {
      res.status(400).json({ message: 'Dados Insuficientes', success: false });
    } 
    else {

      const loggedUser = await User.findById(_id)
      await Follow.updateOne({userId: loggedUser?.userId }, { $push: { following: { followId: userId } } })
      await Follow.updateOne({userId: userId }, { $push: { followers: { followId: loggedUser?.userId } } })
      const followedUserFollowers = await getUserFollow(userId)
      res.status(201).json({followers:followedUserFollowers.followers })
    }
  }

  if (req.method === 'PUT') {
    const { userId } = req.body;

    if (!userId) {
      res.status(400).json({ message: 'Dados Insuficientes', success: false });
    } 
    else {

      const loggedUser = await User.findById(_id)
      await Follow.updateOne({userId: loggedUser?.userId }, { $pull: { following: { followId: userId } } })
      await Follow.updateOne({userId: userId }, { $pull: { followers: { followId: loggedUser?.userId } } })
      const followedUserFollowers = await getUserFollow(userId)
      res.status(201).json({followers:followedUserFollowers.followers })

    }
  }
}
