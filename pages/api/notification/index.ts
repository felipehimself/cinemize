import { NextApiRequest, NextApiResponse } from 'next';
import { connect } from 'mongoose';
import {  getUserId } from '../../../utils/dbFunctions';
import Notification from '../../../models/Notification';
import User from '../../../models/User';
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
    return
  }
  
  const _id = await getUserId(jwt)
  const loggedUser = await User.findById(_id)
  if(req.method === 'GET'){
    try {
      const userNotificationss = await Notification.findOne(
        { userId:loggedUser?.userId },
        {_id: 0, createdAt:0, updatedAt:0, userId:0 },
      )
            
      const usersIds = userNotificationss?.notifications.map((not:any)=>{
        return not.userId
      })

      const notificationsCopy = JSON.parse(JSON.stringify(userNotificationss))

      const users = await User.find({userId: {$in: usersIds}})
      const usersCopy = JSON.parse(JSON.stringify(users))

      notificationsCopy?.notifications?.forEach((user:any)=>{
        usersCopy.forEach((user2:any)=>{
          if(user.userId === user2.userId){          
            user.userName = user2.userName
          }
        })
      })


      res.status(200).json(notificationsCopy)
    } catch (error) {
      res.status(400).json({message: 'Algo deu errado', success:false})
    }
  }

  if (req.method === 'PUT') {

    try {
      await Notification.updateOne({userId:loggedUser?.userId}, {hasNotification: false})
      res.status(200).json({message:'Status alterado', success: true})

    } catch (error) {
      res.status(400).json({message:'Algo deu errado', success: false})
    }


    // await Notification.create({userId: '56c150e1-34de-4013-9c18-84acc4f5c563', hasNotification: false, notifications: []})
    // res.status(201).json({message:'created'})
  }

}
