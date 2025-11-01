import express from 'express';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { protect, adminOnly } from '../middlewares/auth.js';
import upload from '../middlewares/upload.js';
import { validateBody } from '../middlewares/validate.js';
import { createProductSchema, updateProductSchema } from '../validators/product.js';

const router = express.Router();

router.get('/', protect, getProducts);
router.post('/', protect, adminOnly, upload.single('image'), validateBody(createProductSchema), createProduct);
router.put('/:id', protect, adminOnly, upload.single('image'), validateBody(updateProductSchema), updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);

export default router;
