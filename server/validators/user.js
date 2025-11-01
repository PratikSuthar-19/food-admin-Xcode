import Joi from 'joi';

export const createUserSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().email().required(),
  mobile: Joi.string().trim().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('admin','user').optional()
});

export const updateUserSchema = Joi.object({
  name: Joi.string().trim().optional(),
  email: Joi.string().email().optional(),
  mobile: Joi.string().trim().optional(),
  password: Joi.string().min(6).optional(),
  role: Joi.string().valid('admin','user').optional()
});
