import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const itemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
}, { _id: false });

const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [itemSchema],
  totalAmount: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now }
}, { timestamps: true });

export default model('Order', orderSchema);
