import RestaurantService from "../services/restaurant.service";
import { Request, Response } from 'express'
import _ from "lodash";
import RestaurantValidator from "../validators/restaurant.validator";


class RestaurantController {
  async list(req: Request, res: Response) {

    // get the list of restaurants
    const restaurants = await RestaurantService.find();

    if (_.isEmpty(restaurants)) {
      return res.status(404).send({ success: false, message: 'No restaurant found' });
    }

    // return the list of restaurants
    return res.status(200).send({
      success: true,
      message: 'Restaurants list',
      data: restaurants
    });
  }

  async findOne(req: Request, res: Response) {
    // get a single restaurant
    const restaurant = await RestaurantService.findByIdWithRelations(Number(req.params.id), ['menus']);

    if (!restaurant) {
      return res.status(404).send({ success: false, message: 'Restaurant not found' });
    }

    // return restaurant
    return res.status(200).send({
      success: true,
      message: 'Restaurant details',
      data: restaurant
    });
  }

  async create(req: Request, res: Response) {
      
      const validData = await RestaurantValidator.validateRestaurant(req.body);

      validData.ownerId = req.auth.id;
      // create a new restaurant
      const newRestaurant = await RestaurantService.create(validData);
  
      // return the created restaurant
      return res.status(201).send({
        success: true,
        message: 'Restaurant created successfully',
        data: newRestaurant
      });
    }
}

export default new RestaurantController();