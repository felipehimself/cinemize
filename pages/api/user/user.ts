import { NextApiRequest, NextApiResponse } from 'next';
import { connect } from 'mongoose';
import User from '../../../models/User';
import * as jose from 'jose';

const MONGODB_URI = process.env.MONGODB_URI || '';
const JWT_SECRET = process.env.JWT_SECRET;

type Response = {
  message: string;
  success: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  await connect(MONGODB_URI).catch((err) =>
    res.status(400).json({ message: 'Algo deu errado', success: false })
  );

  if (req.method === 'PATCH') {
    const { userName, name, isVerified, type } = req.body;

    if (!userName || !isVerified || !name || !type) {
      res
        .status(400)
        .json({ message: 'Todos os campos são obrigatórios', success: false });
    } else {
      const jwt = req?.cookies?.CinemizeJWT;

      if (jwt === undefined) {
        res.status(401).json({ message: 'Sem autorização', success: false });
      } else
       {

        try {
          const response = await jose.jwtVerify(jwt!, new TextEncoder().encode(JWT_SECRET) );
          const _id = await response.payload.userId;
          
          // logged user
          const currentUser = await User.findById({_id})
          
          if (type === 'follow') {

            try {
              
              // update followed user followers
              await User.updateOne({ userName },{ $push: { followers: { userName:currentUser?.userName, name:currentUser?.name, isVerified:currentUser?.isVerified } } });
              
              // update logged user following
              await User.updateOne({ _id },{ $push: { following: { userName, name, isVerified } } });

              res.status(200).json({ message: 'Atualizado', success: true });
            } catch (error) {
              res.status(400).json({ message: 'Algo deu errado', success: true });
            }

          } 

          else if (type === 'unfollow'){

            try {

              // update followed user followers
              await User.updateOne({ userName },{ $pull: { followers: { userName:currentUser?.userName} } });

              // update logged user following
              await User.updateOne({ _id },{ $pull: { following: { userName:userName } } });

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
  }
}
