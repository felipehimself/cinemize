import { NextApiRequest, NextApiResponse } from 'next';
import { connect } from 'mongoose';
import User from '../../../models/User';
// import * as jose from 'jose';
import { getUserId } from '../../../utils/dbFunctions';

const MONGODB_URI = process.env.MONGODB_URI || '';
// const JWT_SECRET = process.env.JWT_SECRET;

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

  if (jwt === undefined) {
    res.status(401).json({ message: 'Sem autorização', success: false });
  }

  if (req.method === 'PATCH') {
    const { userId, type } = req.body;

    if (!userId) {
      res
        .status(400)
        .json({ message: 'Todos os campos são obrigatórios', success: false });
    } else {

        try {
          const _id = await getUserId(jwt)
          // const response = await jose.jwtVerify(jwt!, new TextEncoder().encode(JWT_SECRET) );
          // const _id = await response.payload.userId;
          
          // logged user
          const currentUser = await User.findById({_id})
          
          if (type === 'follow') {

            try {
              
              // update profile followers
              await User.updateOne({ userId }, { $push: { followers:  {userId: currentUser?.userId} } });
              
              // update logged user following
              await User.updateOne({ _id }, { $push: { following:  {userId: userId} } });

              res.status(200).json({ message: 'Atualizado', success: true });
            } catch (error) {
              res.status(400).json({ message: 'Algo deu errado', success: true });
            }

          } 

          else if (type === 'unfollow'){

            try {

              // update followed user followers
              await User.updateOne({ userId },{ $pull: { followers:  {userId: currentUser?.userId} } });

              // update logged user following
              await User.updateOne({ _id },{ $pull: { following: {userId: userId}  } });

              res.status(200).json({ message: 'Atualizado', success: true });
            } catch (error) {
              res.status(400).json({ message: 'Algo deu errado', success: true });
            }

          } else {
            res.status(401).json({ message: 'Algo deu errado', success: true });

          }

          
        } catch (error) {
          res.status(401).json({message:'Algo deu errado', success: false})
        }

      
    }
  }
  
      if(req.method === 'GET'){
          const { term } = req.query

          if(term) {
            try {
            const users = await User.find({userName:  {$regex : "^" + term}},{email:0, password:0, description:0, createdAt:0, updatedAt:0})
            const parsedUsers = JSON.parse(JSON.stringify(users))

            res.status(200).json(parsedUsers)


          } catch (error) {
               res.status(400).json({message:'Algo deu errado ao buscar usuário', success:false})
          }
          } else {
            res.status(200).json([])

          }
        
        
  }       
}
