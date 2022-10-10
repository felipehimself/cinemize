import { NextApiRequest, NextApiResponse } from 'next';
import { connect } from 'mongoose';
import User from '../../../models/User';
import Follow from '../../../models/Follow';
import { getUserFollow, getUserId } from '../../../utils/dbFunctions';
import Notification from '../../../models/Notification';

const MONGODB_URI = process.env.MONGODB_URI || '';

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
      await Follow.updateOne({userId: loggedUser?.userId }, { $push: { following: { userId: userId } } })
      await Follow.updateOne({userId: userId }, { $push: { followers: { userId: loggedUser?.userId } } })


      await Notification.updateOne({userId: userId}, { hasNotification: true, $push: {notifications: {userId: loggedUser?.userId, message: 'começou a te seguir', redirect: `/user/${loggedUser?.userName}?q=${loggedUser?.userId}`, notificationId: loggedUser?.userId, itemToRemoveId: loggedUser?.userId} } }  )

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
      // const userFollowing = await User.findOne({userId})

      const loggedUser = await User.findById(_id)
      await Follow.updateOne({userId: loggedUser?.userId }, { $pull: { following: { userId: userId } } })
      await Follow.updateOne({userId: userId }, { $pull: { followers: { userId: loggedUser?.userId } } })
      const followedUserFollowers = await getUserFollow(userId)

      await Notification.updateOne({userId: userId}, { $pull: {notifications: {notificationId: loggedUser?.userId} } } )

      res.status(201).json({followers:followedUserFollowers.followers })

    }
  }
}
