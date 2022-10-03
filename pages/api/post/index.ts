import { NextApiRequest, NextApiResponse } from 'next';
import { connect } from 'mongoose';
import User from '../../../models/User';
import Post from '../../../models/Post';
import { v4 as uuid } from 'uuid'
import { getUserId } from '../../../utils/dbFunctions';

const MONGODB_URI = process.env.MONGODB_URI || '';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connect(MONGODB_URI).catch((err) =>
    res
      .status(400)
      .json({ message: 'Algo deu errado', success: false,  })
  );

  const jwt = req?.cookies?.CinemizeJWT;

     if (jwt === undefined) {
      res.status(401).json({ message: 'Sem autorização', success: false});
    } 

    const _id = await getUserId(jwt)

    if (req.method === 'POST') {

      const { type, title, rating, comment, whereToWatch, genre } = req.body;

      if(!type || !title || !rating || !comment || whereToWatch.length == 0 || genre.length === 0){
        res.status(400).json({message:'Dados insuficientes', success: false})
      }
  
      else {

        try {
          
          const userPosting = await User.findById({_id})
          const postId = uuid()
          const post = {...req.body, userId: userPosting?.userId, postId: postId}
          const postCreated = await Post.create(post)
          // await User.updateOne({ _id }, { $push: { posts:  { postId: postId } } });

          res.status(201).json({...postCreated?.toJSON(), userId: userPosting?.userId, userName: userPosting?.userName, isVerified:userPosting?.isVerified})
        } catch (error) {
          res.status(400).json({ message: 'Algo deu errado ao criar post', success: false,  });
        }
      
      }
    
    
  }  
 
}
