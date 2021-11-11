import express from 'express';
import MenuController from '../controllers/menu.controller';

const router: express.Router = express.Router();

router.route('/:restaurantId/menus')
  .post(MenuController.create)
  .get(MenuController.list);

router.route('/:restaurantId/menus/:id')
  .get(MenuController.findOne)

export default router;