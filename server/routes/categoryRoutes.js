import express from 'express';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../controllers/categoryController.js';
import { protect, adminOnly } from '../middlewares/auth.js';
import { validateBody } from '../middlewares/validate.js';
import { createCategorySchema, updateCategorySchema } from '../validators/category.js';

const router = express.Router();

router.get('/', protect, getCategories);
router.post('/', protect, adminOnly, validateBody(createCategorySchema), createCategory);
router.put('/:id', protect, adminOnly, validateBody(updateCategorySchema), updateCategory);
router.delete('/:id', protect, adminOnly, deleteCategory);

export default router;
