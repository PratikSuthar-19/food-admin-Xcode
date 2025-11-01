import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

export const createOrder = async (payload) => {
  const user = await User.findById(payload.userId);
  if (!user) {
    const err = new Error('User not found');
    err.statusCode = 404;
    throw err;
  }
  if (!Array.isArray(payload.items) || payload.items.length === 0) {
    const err = new Error('Order must contain at least one item');
    err.statusCode = 400;
    throw err;
  }
  const itemsDetailed = [];
  let totalAmount = 0;
  for (const it of payload.items) {
    const product = await Product.findById(it.productId);
    if (!product) {
      const err = new Error(`Product not found: ${it.productId}`);
      err.statusCode = 404;
      throw err;
    }
    const qty = Number(it.quantity);
    const price = product.price;
    itemsDetailed.push({ productId: product._id, quantity: qty, price });
    totalAmount += price * qty;
  }
  const order = await Order.create({
    userId: user._id,
    items: itemsDetailed,
    totalAmount,
    orderDate: payload.orderDate ? new Date(payload.orderDate) : new Date()
  });
  return order;
};

export const getAllOrders = () => Order.find()
  .populate('userId', 'name email mobile')
  .populate('items.productId', 'name price')
  .sort({ createdAt: -1 });
