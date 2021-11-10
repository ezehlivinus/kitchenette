  
import Joi from 'joi';
import { RestaurantInterface } from './interfaces/restaurant.interface';

class RestaurantValidator {
 static async validateRestaurant(restaurant: RestaurantInterface) {
    const schema = Joi.object({
      title: Joi.string().min(3).max(256).required(),
      description: Joi.string().min(3).required(),
      isVeg: Joi.boolean()
    });

    const value = await schema.validateAsync(restaurant);

    return value;
  }
}

export default RestaurantValidator;