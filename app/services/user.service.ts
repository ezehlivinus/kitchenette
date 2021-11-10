import { Prisma, PrismaClient } from '@prisma/client';
import jwt, { Secret } from 'jsonwebtoken'
const prisma = new PrismaClient();
const User = prisma.user;

interface User {
  id: number;
  email: string;
  role: string;
}


class UserService {
  async findByEmail(email: string) {
    const user = await User.findUnique({
      where: { email },
    })

    return user;
  }

  async findById(id: number) {
    const user = await User.findUnique({
      where: { id: Number(id) },
    })

    return user;
  }

  async create(data: any) { 
    const user = await User.create({ data })

    return user;
  }

  async generateAuthToken(user: User) {
    const secret: Secret = <Secret>process.env.JWT_SECRET;
    
    const token = jwt.sign({
      id: user.id,
      email: user.email,
      role: user.role
    }, secret , { expiresIn: '7 days' });
  
    return token;
  }
}

export default new UserService();