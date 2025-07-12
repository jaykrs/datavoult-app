import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const  userService = async (email : string , password : string) => {
const user = await prisma.user.findMany({
    where: {
    email: email,
    password : password  
}
})
return user[0];
}
