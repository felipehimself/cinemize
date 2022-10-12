import { NextApiRequest, NextApiResponse } from 'next';
import { connect } from 'mongoose';
import User from '../../../models/User';
import * as jose from 'jose';
import { getUserId } from '../../../utils/dbFunctions';

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
    res
      .status(400)
      .json({ message: 'Algo deu errado', success: false,  })
  );

  const { name, userName, description, location } = req.body;

  if(!userName){
    res.status(400).json({ message: 'Dados insuficientes', success: true,  });
    return
  }


  if (req.method === 'PATCH') {

    const jwt = req?.cookies?.CinemizeJWT;

    if (jwt === undefined) {
      res
        .status(401)
        .json({ message: 'Sem autorização', success: false});
        
    } else {
      try {
        const _id = await getUserId(jwt, req.url)
        // const response = await jose.jwtVerify(jwt!, new TextEncoder().encode(JWT_SECRET));
        // const _id = await response.payload.userId;
        const userNameExists = await User.findOne({userName})

        if(userNameExists && (userNameExists?._id.toString() !== _id)){
          res.status(302).json({message: 'Nome de usuário já existe', success:false, })
        } else {
          await User.findByIdAndUpdate(_id, { name, userName, description, location });
          res.status(201).json({message:'Atualizado com sucesso', success:true, })
        }

      } catch (error) {
        res.status(400).json({ message: 'Algo deu errado', success: true,  });
      }
    }
  }
}
