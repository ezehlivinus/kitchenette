import express from 'express';
import UserController from '../controllers/user.controller';

const router: express.Router = express.Router();

router.route('/')
  .post(UserController.create);
  

router.post('/login', UserController.login);

export default router;
