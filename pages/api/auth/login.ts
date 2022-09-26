import { NextApiRequest, NextApiResponse } from 'next';
import { connect } from 'mongoose';
import bcrypt from 'bcryptjs';

import User from '../../../models/User';
import { serialize } from 'cookie';
import * as jose from 'jose';

const MONGODB_URI = process.env.MONGODB_URI || '';
const JWT_SECRET = process.env.JWT_SECRET;

type Response = {
  message: string;
  success: boolean;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const { email, password } = req.body;

  if (req.method === 'POST') {
    if (!email || !password) {
      res
        .status(400)
        .json({ message: 'Todos os campos são obrigatórios', success: false });
    } else {
      await connect(MONGODB_URI).catch((err) =>
        res.status(400).json({ message: 'Algo deu errado', success: false })
      );

      const userExists = await User.findOne({ email });

      if (userExists) {
        const isValidPassword = bcrypt.compareSync(
          password,
          userExists.password
        );

        if (isValidPassword) {
          const jwtToken = await new jose.SignJWT({ userId: userExists._id })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('30d')
            .sign(new TextEncoder().encode(JWT_SECRET));

          const serialized = serialize('CinemizeJWT', jwtToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 30,
            path: '/',
          });

          res.setHeader('Set-Cookie', serialized);
          res
            .status(200)
            .json({ message: 'Login efetuado com sucesso', success: true });
        } else {
          res
            .status(400)
            .json({ message: 'Usuário ou senha inválidos', success: false });
        }
      } else {
        res
          .status(400)
          .json({ message: 'Usuário ou senha inválidos', success: false });
      }
    }
  }
}
