import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction  } from 'express'
import userService from '../services/user.service';

class Authenticate {
  async authenticate(req: Request, res: Response, next: NextFunction) {
    const token = req.header('token');

    if (!token) return res.status(401).send({ success: false, message: 'Access Denied: Token not provided' });

    const decoded: any = jwt.verify(token, <Secret>process.env.JWT_SECRET);

    const user = await userService.findById(decoded.id);
    if (!user) return res.status(404).send({ success: false, message: 'user not found or might have been deleted' });

    req.auth = user;

    return next();
  }
}

export default new Authenticate();