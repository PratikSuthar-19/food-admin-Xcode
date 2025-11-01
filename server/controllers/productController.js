import * as productService from '../services/productService.js';

export const getProducts = async (req, res, next) => {
  try {
    const products = await productService.getAllProducts();
    res.json({ success: true, data: products });
  } catch (err) { next(err); }
};

export const createProduct = async (req, res, next) => {
  try {
    const fileBuffer = req.file ? req.file.buffer : null;
    const product = await productService.createProduct({ body: req.body, fileBuffer });
    res.status(201).json({ success: true, data: product });
  } catch (err) { next(err); }
};

export const updateProduct = async (req, res, next) => {
  try {
    const fileBuffer = req.file ? req.file.buffer : null;
    const product = await productService.updateProduct(req.params.id, { body: req.body, fileBuffer });
    res.json({ success: true, data: product });
  } catch (err) { next(err); }
};

export const deleteProduct = async (req, res, next) => {
  try {
    await productService.deleteProduct(req.params.id);
    res.json({ success: true, message: 'Product deleted' });
  } catch (err) { next(err); }
};
