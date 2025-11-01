import Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().email().required(),
  mobile: Joi.string().trim().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('admin', 'user').optional()
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});
