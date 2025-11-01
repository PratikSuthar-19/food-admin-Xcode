import Joi from 'joi';
import JoiObjectId from 'joi-objectid';
import JoiBase from 'joi';
const joiObjectId = JoiObjectId(JoiBase);

export const createProductSchema = JoiBase.object({
  name: JoiBase.string().trim().required(),
  categoryId: joiObjectId().required(),
  price: JoiBase.number().positive().required(),
  status: JoiBase.string().valid('available','unavailable').optional()
});

export const updateProductSchema = JoiBase.object({
  name: JoiBase.string().trim().optional(),
  categoryId: joiObjectId().optional(),
  price: JoiBase.number().positive().optional(),
  status: JoiBase.string().valid('available','unavailable').optional()
});
