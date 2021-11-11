import { Request, Response } from 'express'
import _ from "lodash";
import { CreateMenu } from '../validators/interfaces/menu.interface'
import MenuValidator from '../validators/menu.validator'
import RestaurantService from '../services/restaurant.service';
import MenuService from '../services/menu.service';

class MenuController {
   async list(req: Request, res: Response){
    const menus = await MenuService.listMenus();

    if (_.isEmpty(menus)) {
      return res.status(404).send({
        success: false,
        message: 'No menus found'
      });
    }

    return res.status(200).send({
      success: true,
      message: 'Menus list',
      data: menus
    });

  }

  async findOne(req: Request, res: Response){
    const menu = await MenuService.findByIdWithRelations(Number(req.params.id), ['restaurant', 'items']);

    if(_.isEmpty(menu)){
      return res.status(404).send({
        success: false,
        message: 'Menu not found'
      });
    }

    return res.status(200).send({
      success: true,
      message: 'Menu found',
      data: menu
    });
  }

  async create(req: Request, res: Response): Promise<Response> {  
    const validData = await MenuValidator.validateRequest(req.body);

    const restaurant = await RestaurantService.findById( Number(req.params.restaurantId));

    if(_.isEmpty(restaurant)){
      return res.status(400).send({
        success: false,
        message: 'Restaurant not found'
      });
    }

    const newMenu = await MenuService.createMenu({ ...validData, restaurantId: Number(req.params.restaurantId) });

    return res.status(201).send({
      success: true,
      message: 'Menu created successfully',
      data: newMenu
    });
  }
}

export default new MenuController();
