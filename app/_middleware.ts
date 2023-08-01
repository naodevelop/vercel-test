import { NextRequest, NextResponse } from 'next/server';

const USER_NAME = 'user';
const PASSWORD = 'password';

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');

  if (basicAuth) {
    const auth = basicAuth.split(' ')[1];
    const [ user, password ] = Buffer.from(auth, 'base64').toString().split(':');

    if (user === USER_NAME && password === PASSWORD) {
      return NextResponse.next();
    }
  }

  return new Response('Auth required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"'
    }
  });
}