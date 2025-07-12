import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const users = await prisma.user.findMany({
    where: {
    email: "jaykrs@gmail.com",
    password : "Welcome@0"  
}
});

  return NextResponse.json(users);
}