  
import Joi from 'joi';
import { CreateMenu } from './interfaces/menu.interface';

class MenuValidator {
 static async validateRequest(menu: CreateMenu) {
    const schema = Joi.object({
      title: Joi.string().min(3).max(256).required(),
      description: Joi.string().min(3),
      // restaurantId: Joi.number().required()
    });

    const value = await schema.validateAsync(menu);

    return value;
  }
}

export default MenuValidator;