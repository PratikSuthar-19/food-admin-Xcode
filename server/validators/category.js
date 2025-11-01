import Joi from 'joi';

export const createCategorySchema = Joi.object({
  name: Joi.string().trim().required(),
  description: Joi.string().optional().allow('')
});

export const updateCategorySchema = Joi.object({
  name: Joi.string().trim().optional(),
  description: Joi.string().optional().allow('')
});
