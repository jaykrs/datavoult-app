import { NextResponse } from 'next/server';
import { parseAuthCookie, verifyJwt } from '../../utils/jwt';

export async function GET(request: Request) {
  const token = parseAuthCookie(request.headers.get('cookie'));
  const payload = token ? verifyJwt(token) : null;

  if (!payload) {
    return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
  }

  return NextResponse.json({ userId: payload.userId, username: payload.username });
}
