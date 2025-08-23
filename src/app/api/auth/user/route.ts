import { NextResponse } from 'next/server';
import { parseAuthCookie, verifyJwt } from '../../utils/jwt';
import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcryptjs';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const token = parseAuthCookie(request.headers.get('cookie'));
  const payload = token ? verifyJwt(token) : null;

  if (!payload) {
    return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
  }

  return NextResponse.json({ userId: payload.userId, username: payload.username });
}

export async function POST(request: Request) {
  const requestBody  = await request.json();
  const {email, name, password} = requestBody;
  const hashedPassword = hashSync(password, 10);
    const user = await prisma.user.findUnique({
      where: {
      email: email
  }
  })
    if (user) {
      return NextResponse.json({ error: 'User already exist with '+email }, { status: 401 });
    }
  const newUser = await prisma.user.create({
        data:{
          name : name ,
          email : email,
          password: hashedPassword
        }
      });
      return NextResponse.json({ message: 'user added', newUser }, { status: 200 });
}