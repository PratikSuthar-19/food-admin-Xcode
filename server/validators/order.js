import Joi from 'joi';
import JoiObjectId from 'joi-objectid';
import JoiBase from 'joi';
const joiObjectId = JoiObjectId(JoiBase);

export const createOrderSchema = JoiBase.object({
  userId: joiObjectId().required(),
  items: JoiBase.array().items(
    JoiBase.object({
      productId: joiObjectId().required(),
      quantity: JoiBase.number().integer().min(1).required()
    })
  ).min(1).required(),
  orderDate: JoiBase.date().optional()
});
