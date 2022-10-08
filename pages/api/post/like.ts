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
  const userLogged = await User.findById(_id)

  if (req.method === 'PUT') {
    const { postId, isLiking } = req.body;

    if (!postId) {
      res.status(400).json({ message: 'Dados insuficientes', success: false });
    } else {
      if (isLiking) {
        try {
          const userLiking = await User.findById({ _id });
          
          const likeId = uuid();
          await Post.updateOne({ postId }, { $push: { likedBy: { userId: userLiking?.userId, id: likeId } } } );
          
          const findPost = await Post.aggregate([
              { $match: { postId: postId } },
              { $unwind:'$likedBy'},
              { $match: {'likedBy.id': likeId }},
              { $project: {_id: 0, userId:0, postId:0, type:0, title:0, rating:0, comment:0,whereToWatch:0, genre:0, favoritedBy:0, createdAt:0, updatedAt:0}},
              { $replaceRoot: { newRoot: { $mergeObjects: [ "$likedBy" , "$$ROOT" ] } } },
              {$project: { likedBy:0 }}
          ])
          const userPostId = await Post.findOne({postId: postId})
          
          if(userPostId?.userId !== userLiking?.userId){
            
            await Notification.updateOne({userId: userPostId?.userId}, { hasNotification: true, $push: {notifications: {userId: userLiking?.userId, message: 'curtiu sua publicação', redirect: `/user/posts/${postId}`, notificationId: likeId} } }  )

          }
          
          const postRes = JSON.parse(JSON.stringify(findPost))

          res.status(201).json(postRes[0]);
        } catch (error) {
          console.log(error)
          res
            .status(400)
            .json({ message: 'Algo deu errado ao curtir', success: false });
        }
      } else {
        try {
          
          const userPostId = await Post.findOne({postId: postId})
          const userLiking = await User.findById({ _id });
          const userDislikedId = userLiking?.userId
          const likesArr = await Post.findOne({postId})
          const likeId = likesArr?.likedBy.find(item => item.userId === userLiking?.userId)?.id
          
          await Post.updateOne(
            { postId },
            { $pull: { likedBy: { userId: userLiking?.userId } } }
            );
            
            
            await Notification.updateOne({userId: userPostId?.userId}, { $pull: {notifications: {notificationId: likeId} } }  )

          res.status(201).json(userDislikedId);
        } catch (error) {
          res
            .status(400)
            .json({ message: 'Algo deu errado ao curtir', success: false });
        }
      }
    }
  }
}
