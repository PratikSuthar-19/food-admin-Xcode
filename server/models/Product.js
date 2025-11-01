import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: true, trim: true },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  price: { type: Number, required: true },
  status: { type: String, enum: ['available', 'unavailable'], default: 'available' },
  imageUrl: { type: String },
  imagePublicId: { type: String }
}, { timestamps: true });

export default model('Product', productSchema);
