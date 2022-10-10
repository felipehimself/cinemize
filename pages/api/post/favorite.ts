import { NextApiRequest, NextApiResponse } from 'next';
import { connect } from 'mongoose';
import User from '../../../models/User';
import Post from '../../../models/Post';
import { v4 as uuid } from 'uuid';
import { getUserId } from '../../../utils/dbFunctions';
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

  if (jwt === undefined) {
    res.status(401).json({ message: 'Sem autorização', success: false });
  }

  const _id = await getUserId(jwt);

  if (req.method === 'PUT') {
    const { postId, isFavoriting } = req.body;

    if (!postId) {
      res.status(400).json({ message: 'Dados insuficientes', success: false });
    } else {
      if (isFavoriting) {
        try {
          const userFavoriting = await User.findById({ _id });
          
          const favoriteId = uuid();
          await Post.updateOne({ postId }, { $push: { favoritedBy: { userId: userFavoriting?.userId, id: favoriteId } } } );
         
          const findPost = await Post.aggregate([
              { $match: { postId: postId } },
              { $unwind:'$favoritedBy'},
              { $match: {'favoritedBy.id': favoriteId }},
              { $project: {_id: 0, userId:0, postId:0, type:0, title:0, rating:0, comment:0,whereToWatch:0, genre:0, likedBy:0, createdAt:0, updatedAt:0}},
              { $replaceRoot: { newRoot: { $mergeObjects: [ "$favoritedBy" , "$$ROOT" ] } } },
              {$project: { favoritedBy:0 }}
          ])

          const postRes = JSON.parse(JSON.stringify(findPost))

          const userPostId = await Post.findOne({postId: postId})

          if(userPostId?.userId !== userFavoriting?.userId){
            
            await Notification.updateOne({userId: userPostId?.userId}, { hasNotification: true, $push: {notifications: {userId: userFavoriting?.userId, message: 'favoritou sua publicação', redirect: `/user/posts/${postId}?q=${favoriteId}`, notificationId: favoriteId, itemToRemoveId:postId} } }  )

          }

          res.status(201).json(postRes[0]);
        } catch (error) {
          console.log(error)
          res
            .status(400)
            .json({ message: 'Algo deu errado ao curtir', success: false });
        }
      } else {
        try {
          const userFavoriting = await User.findById({ _id });
          const userPostId = await Post.findOne({postId: postId})
          const favArr = await Post.findOne({postId})
          const favId = favArr?.likedBy.find(item => item.userId === userFavoriting?.userId)?.id
          const userUnfavoriteId = userFavoriting?.userId
          
          await Post.updateOne(
            { postId },
            { $pull: { favoritedBy: { userId: userFavoriting?.userId } } }
          );

          await Notification.updateOne({userId: userPostId?.userId}, { $pull: {notifications: {notificationId: favId} } }  )


          res.status(201).json(userUnfavoriteId);
        } catch (error) {
          res
            .status(400)
            .json({ message: 'Algo deu errado ao curtir', success: false });
        }
      }
    }
  }
}
