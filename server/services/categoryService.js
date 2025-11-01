import Category from '../models/Category.js';

export const createCategory = async (payload) => {
  const exists = await Category.findOne({ name: payload.name });
  if (exists) {
    const err = new Error('Category already exists');
    err.statusCode = 400;
    throw err;
  }
  return Category.create(payload);
};

export const getAllCategories = () => Category.find().sort({ createdAt: -1 });

export const updateCategory = async (id, payload) => {
  const updated = await Category.findByIdAndUpdate(id, payload, { new: true });
  if (!updated) {
    const err = new Error('Category not found');
    err.statusCode = 404;
    throw err;
  }
  return updated;
};

export const deleteCategory = async (id) => {
  const deleted = await Category.findByIdAndDelete(id);
  if (!deleted) {
    const err = new Error('Category not found');
    err.statusCode = 404;
    throw err;
  }
  return deleted;
};
