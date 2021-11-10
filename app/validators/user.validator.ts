  
import Joi from 'joi';

// validation
const validateUser = async (user = {}) => {
  const schema = Joi.object({
    password: Joi.string().min(6).max(60).required(),
    email: Joi.string().email().trim().lowercase()
      .required()
  });

  const value = await schema.validateAsync(user);

  return value;
};

export default validateUser;