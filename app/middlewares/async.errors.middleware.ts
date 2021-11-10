import log from '../config/logger';
import { NextFunction, Request, Response, Express } from 'express';

export default (error: Error, req: Request, res: Response, next: NextFunction) => {
  const data = {
    status: false,
    message: `Something failed:... ${error.message}`
  };

  console.log(error);
  log.error('From async error middleware', error);
  next(error);
  return res.status(500).send(data);
};