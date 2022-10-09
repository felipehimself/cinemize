import { NextApiRequest, NextApiResponse } from 'next';
import { connect } from 'mongoose';
import Post from '../../../models/Post';
import Notification from '../../../models/Notification';
import { getUserId } from '../../../utils/dbFunctions';
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
  
  if (jwt === undefined) {
    res.status(401).json({ message: 'Sem autorização', success: false });
  }
  
  if (req.method === 'DELETE') {
    const { postId } = req.query;
    
    if (!postId) {
      res.status(400).json({ message: 'Dados insuficientes', success: false });
    } else {
      try {
        const _id = await getUserId(jwt)
        const user = await User.findById(_id)

        await Post.deleteOne({ postId: postId });
        await Notification.findOneAndUpdate({userId: user?.userId}, { $pull: { notifications: { itemToRemoveId: postId }}})

        res.status(200).json({ message: 'Post deletado', success: true });
      } catch (error) {
        res
          .status(400)
          .json({ message: 'Algo deu errado ao deletar post', success: false });
      }
    }
  }
}
