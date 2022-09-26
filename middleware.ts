import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import * as jose from 'jose';
const JWT_SECRET = process.env.JWT_SECRET;

export default async function middleware(req: NextRequest) {
  const jwt = req.cookies.get('CinemizeJWT');

  if (req.nextUrl.pathname === '/' || req.nextUrl.pathname === '/login') {
    if (jwt === undefined) {
      return NextResponse.next();
    } else {
      try {
        await jose.jwtVerify(jwt, new TextEncoder().encode(JWT_SECRET));
        return NextResponse.redirect(new URL('/home', req.url));
      } catch (error) {
        return NextResponse.next();
      }
    }
  }

  if (req.nextUrl.pathname.startsWith('/home')) {
    if (jwt === undefined) {
      return NextResponse.redirect(new URL('/', req.url));
    } else {
      try {
        await jose.jwtVerify(jwt, new TextEncoder().encode(JWT_SECRET));
        return NextResponse.next();
      } catch (error) {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }
  }
}
