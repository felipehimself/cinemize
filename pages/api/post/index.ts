import { NextApiRequest, NextApiResponse } from 'next';
import { connect } from 'mongoose';
import User from '../../../models/User';
import Post from '../../../models/Post';
import { v4 as uuid } from 'uuid'
import * as jose from 'jose';

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
    res
      .status(400)
      .json({ message: 'Algo deu errado', success: false,  })
  );

  if (req.method === 'POST') {

     const jwt = req?.cookies?.CinemizeJWT;

     if (jwt === undefined) {
      res.status(401).json({ message: 'Sem autorização', success: false});
    } 
    else {
      const { type, title, rating, comment, whereToWatch, genre } = req.body;

      if(!type || !title || !rating || !comment || whereToWatch.length == 0 || genre.length === 0){
        res.status(400).json({message:'Dados insuficientes', success: false})
      }
  
      else {

        try {
          const response = await jose.jwtVerify(jwt!, new TextEncoder().encode(JWT_SECRET));
          const _id = await response.payload.userId;
          const userPosting = await User.findById({_id})
          const postId = uuid()
          const post = {...req.body, userId: userPosting?.userId, postId: postId}
          await Post.create(post)
          await User.updateOne({ _id }, { $push: { posts:  { postId: postId } } });

          res.status(201).json({...post, userName: userPosting?.userName, isVerified:userPosting?.isVerified})
        } catch (error) {
          res.status(400).json({ message: 'Algo deu errado ao criar post', success: false,  });
        }
      
      }
    }
    
  }
}
