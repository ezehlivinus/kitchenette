import express from 'express';
import RestaurantController from '../controllers/restaurant.controller';

const router: express.Router = express.Router();

router.route('/')
  .post(RestaurantController.create)
  .get(RestaurantController.list);

router.route('/:id')
  .get(RestaurantController.findOne)

export default router;