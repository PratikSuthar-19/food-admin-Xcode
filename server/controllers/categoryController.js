import * as categoryService from '../services/categoryService.js';

export const getCategories = async (req, res, next) => {
  try {
    const cats = await categoryService.getAllCategories();
    res.json({ success: true, data: cats });
  } catch (err) { next(err); }
};

export const createCategory = async (req, res, next) => {
  try {
    const cat = await categoryService.createCategory(req.body);
    res.status(201).json({ success: true, data: cat });
  } catch (err) { next(err); }
};

export const updateCategory = async (req, res, next) => {
  try {
    const updated = await categoryService.updateCategory(req.params.id, req.body);
    res.json({ success: true, data: updated });
  } catch (err) { next(err); }
};

export const deleteCategory = async (req, res, next) => {
  try {
    await categoryService.deleteCategory(req.params.id);
    res.json({ success: true, message: 'Category deleted' });
  } catch (err) { next(err); }
};
