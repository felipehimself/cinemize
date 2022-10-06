import { NextApiRequest, NextApiResponse } from 'next';
import { connect } from 'mongoose';
import User from '../../../models/User';
import Post from '../../../models/Post';
import { v4 as uuid } from 'uuid';
import { getUserId } from '../../../utils/dbFunctions';

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
    const { postId, isLiking, type } = req.body;

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
          const userLiking = await User.findById({ _id });
          await Post.updateOne(
            { postId },
            { $pull: { likedBy: { userId: userLiking?.userId } } }
          );
          const userDislikedId = userLiking?.userId

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
