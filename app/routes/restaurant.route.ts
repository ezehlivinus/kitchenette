import express from 'express';
import RestaurantController from '../controllers/restaurant.controller';
import Auth from '../middlewares/authentication.middleware';

const router: express.Router = express.Router();

router.route('/')
  .all([Auth.authenticate])
  .post(RestaurantController.create)
  .get(RestaurantController.list);

router.route('/:id')
  .all([Auth.authenticate])
  .get(RestaurantController.findOne)

export default router;