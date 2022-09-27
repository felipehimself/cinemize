import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const jwt = req?.cookies?.CinemizeJWT;

  if (req.method === 'POST') {
    if (!jwt) {
      res.status(200).json({ message: 'Você já está deslogado' });
    } else {
      try {
        // para o server da Vercel entender como uma nova requisição e não como "304 - Not Modified"
        if (req.body.key === 'static_key') {
          const serialized = serialize('CinemizeJWT', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 0,
            path: '/',
          });
          res.setHeader('Set-Cookie', serialized);
          res.status(200).json({ success: true });
        }
      } catch (error) {
        res.status(400).json({ message: 'Ocorreu um erro' });
      }
    }
  }
}