import { NextApiRequest, NextApiResponse } from 'next';
import { connect } from 'mongoose';
import { getUserId } from '../../../utils/dbFunctions';
import Notification from '../../../models/Notification';

import {NotificationsArr} from  './../../../ts/types/notification'
import {User as UserType} from  './../../../ts/types/user'

import User from '../../../models/User';
const MONGODB_URI = process.env.MONGODB_URI || '';

// INCLUIR LINK NA NOTIFICAÇÃO PARA O PERFIL OU PUBLICAÇÃO (LIKE OU BOOKMARK)
// INCLUIR TORA PARA LINK DA NOTIFICAÇÃO LIKE OU BOOKMARK
// NOTIFICATION ICON NA BOTTOM TAB, QUE DEVE ABRIR UM MODAL COM A LISTA DE NOTIFICAÇÕES

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connect(MONGODB_URI).catch((err) =>
    res.status(400).json({ message: 'Algo deu errado', success: false })
  );

  const jwt = req?.cookies?.CinemizeJWT;

  if (jwt === undefined) {
    res.status(401).json({ message: 'Não autorizado', success: false });
    return;
  }

  const _id = await getUserId(jwt);
  const loggedUser = await User.findById(_id);
  if (req.method === 'GET') {
    try {
      //      const response =  await Notification.aggregate([
      //         {$match: { userId:loggedUser?.userId }},
      //         {
      //           $lookup:
      //             {
      //               from: 'users',
      //               localField: 'notifications.userId',
      //               foreignField: 'userId',
      //               as: 'idss'
      //             }
      //         },

      //        {$project: {'idss.email': 0, 'idss.password':0, 'idss._id':0, 'idss.description':0, 'idss.createdAt':0, 'idss.updatedAt':0, 'idss.location':0}},

      //         {$addFields: {
      //                 notifications: {
      //               $map:
      //                  {
      //                    input: "$notifications",
      //                    as: "item",
      //                    in: { $mergeObjects: ["$$item", {userName: {$filter: {input: '$idss', as: "uuids",  cond: { $eq: [ "$$uuids.userId", "$$item.userId"] }  }}  }                                          ] } }
      //                  }
      //             }
      //          },

      //        {$project: { idss: 0, createdAt:0 ,updatedAt:0 }},

      //  ])

      const userNotificationss = await Notification.findOne(
        { userId: loggedUser?.userId },
        { _id: 0, createdAt: 0, updatedAt: 0, userId: 0 }
      );

      const usersIds = userNotificationss?.notifications.map((not: any) => {
        return not.userId;
      });

      const notificationsCopy = JSON.parse(JSON.stringify(userNotificationss));

      const users = await User.find({ userId: { $in: usersIds } });
      const usersCopy = JSON.parse(JSON.stringify(users));

      notificationsCopy?.notifications?.forEach((user: NotificationsArr) => {
        usersCopy.forEach((user2: UserType) => {
          if (user.userId === user2.userId) {
            user.userName = user2.userName;
          }
        });
      });

      res.status(200).json(notificationsCopy);
    } catch (error) {
      res.status(400).json({ message: 'Algo deu erradoss', success: false });
    }
  }

  if (req.method === 'PUT') {
    try {
      await Notification.updateOne(
        { userId: loggedUser?.userId },
        { hasNotification: false }
      );
      res.status(200).json({ message: 'Status alterado', success: true });
    } catch (error) {
      res.status(400).json({ message: 'Algo deu errado', success: false });
    }
  }
}
