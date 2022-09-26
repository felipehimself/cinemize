import type { NextApiRequest, NextApiResponse } from 'next';
import User from './../../../models/User';
import { connect } from 'mongoose';
import bcrypt from 'bcryptjs';
import { serialize } from 'cookie';
import * as jose from 'jose';

const MONGODB_URI = process.env.MONGODB_URI || '';
const JWT_SECRET = process.env.JWT_SECRET;

type Data = {
  message: string;
  success: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { name, email, password } = req.body;

  if (req.method === 'POST') {
    if (!name || !password || !email) {
      res
        .status(400)
        .json({ message: 'Todos os campos são obrigatórios', success: false });
    } else {
      await connect(MONGODB_URI).catch(err => res.status(400).json({message: 'Algo deu errado, tente novamente', success: false}));

      const userExists = await User.findOne({ email });

      if (userExists) {
        res
          .status(401)
          .json({ message: 'Usuário já existe', success: false });
      } else {
        try {
          const hashed = bcrypt.hashSync(password, 10);
          const user = await User.create({
            name: name,
            password: hashed,
            email: email,
          });

          const jwtToken = await new jose.SignJWT({ userId: user._id })
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
          res.status(201).json({ message: 'Usuário criado', success: true });
        } catch (error) {
          res
            .status(400)
            .json({ message: 'Algo deu errado', success: false });
        }
      }
    }
  }
}
