import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { compare } from 'bcryptjs';
// Define your user type
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

//const mockUsers: User[] = [
//  { id: '1', username: 'admin', password: '$2y$05$wFAJskpbFuRXi8wMHA3Rv.V3ChKzwzbdFUf2rpV.QQxsZ0AH69Fv6' } // Hashed password
//];

export async function POST(request: Request) {
  const { username, password } = await request.json();

  const user = await prisma.user.findUnique({
    where: {
    email: username
}
})
  if (!user) {
    return NextResponse.json({ error: 'User  does not exist' }, { status: 401 });
  }
  if (user.isActive === false) {
    return NextResponse.json({ error: 'User  is not active' }, { status: 401 });
  }
  const isPasswordValid = await compare(password, user.password);
  if (!isPasswordValid) {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
  }

  const token = jwt.sign(
    { userId: user.id, username: user.email },
    process.env.JWT_SECRET!
  );
const data = {
  "email" : user.email,
  "name" : user.name,
  "role" : user.userrole
};

  const response = NextResponse.json({ message: 'Login successful' , data});
  response.cookies.set('authToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: Number(process.env.JWT_EXPIRES_IN),
    path: '/'
  });
  return response;
}
