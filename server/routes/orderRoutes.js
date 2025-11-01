import express from 'express';
import { createOrder, getOrders } from '../controllers/orderController.js';
import { protect, adminOnly } from '../middlewares/auth.js';
import { validateBody } from '../middlewares/validate.js';
import { createOrderSchema } from '../validators/order.js';

const router = express.Router();

router.post('/', protect, adminOnly, validateBody(createOrderSchema), createOrder);
router.get('/', protect, adminOnly, getOrders);

export default router;
