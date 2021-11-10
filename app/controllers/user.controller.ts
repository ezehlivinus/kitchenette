import { Request, Response } from 'express'
import { Prisma, PrismaClient } from '@prisma/client';
import _ from 'lodash';
import bcrypt from 'bcrypt';

import UserService from '../services/user.service';
import validateUser from '../validators/user.validator';

const prisma = new PrismaClient()
const User = prisma.user;

class UserController {

  static removePassword(user: any) {
   user = _.omit(user, ['password']);
   return user;
  }

  async create(req: Request, res: Response) {

    const validData = await validateUser(req.body);
    const user = await UserService.findByEmail(validData.email);

    if (!_.isEmpty(user)) {
      return res.status(409).send({ success: false, message: 'user already exist' });
    }

    const hashedPassword = await bcrypt.hash(validData.password, 10);

    validData.password = hashedPassword;

    let newUser = await UserService.create(validData)

    const token = await UserService.generateAuthToken(newUser);

    newUser = UserController.removePassword(user)

    res.header('token', token).status(201).send({
      success: true,
      message: 'new user created',
      data: { ...newUser, token }
    });

  }

  async login(req: Request, res: Response) {
    let user: any = await UserService.findByEmail(req.body.email);
    if (_.isEmpty(user)) return res.status(400).send({ success: false, message: 'Invalid email  or password' });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send({ success: false, message: 'Invalid password or email' });

    const token = await UserService.generateAuthToken(user);
    
    user = UserController.removePassword(user)
    
    res.header('token', token).status(200).send({
      success: true,
      message: 'login success',
      data: { ...user, token }
    });
  }

}

export default new UserController();