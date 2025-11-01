import Product from '../models/Product.js';
import cloudinary from '../config/cloudinary.js';

// upload Buffer to Cloudinary via upload_stream
const uploadBufferToCloudinary = (buffer, folder = 'products') => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder, resource_type: 'image' }, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
    stream.end(buffer);
  });
};

export const createProduct = async ({ body, fileBuffer }) => {
  const productData = {
    name: body.name,
    categoryId: body.categoryId,
    price: body.price,
    status: body.status || 'available'
  };
  if (fileBuffer) {
    const res = await uploadBufferToCloudinary(fileBuffer);
    productData.imageUrl = res.secure_url;
    productData.imagePublicId = res.public_id;
  }
  const product = await Product.create(productData);
  return product;
};

//export const getAllProducts = () => Product.find().populate('categoryId', 'name description').sort({ createdAt: -1 });

export const getAllProducts = () =>
  Product.find({}, "name price status imageUrl imagePublicId categoryId createdAt updatedAt")
    .populate("categoryId", "name description")
    .sort({ createdAt: -1 });


export const updateProduct = async (id, { body, fileBuffer }) => {
  const product = await Product.findById(id);
  if (!product) {
    const err = new Error('Product not found');
    err.statusCode = 404;
    throw err;
  }
  if (fileBuffer) {
    if (product.imagePublicId) {
      try { await cloudinary.uploader.destroy(product.imagePublicId); } catch (e) { console.warn('Cloudinary delete', e.message); }
    }
    const res = await uploadBufferToCloudinary(fileBuffer);
    product.imageUrl = res.secure_url;
    product.imagePublicId = res.public_id;
  }
  product.name = body.name ?? product.name;
  product.categoryId = body.categoryId ?? product.categoryId;
  product.price = body.price ?? product.price;
  product.status = body.status ?? product.status;
  await product.save();
  return product;
};

export const deleteProduct = async (id) => {
  const product = await Product.findById(id);
  if (!product) {
    const err = new Error('Product not found');
    err.statusCode = 404;
    throw err;
  }
  if (product.imagePublicId) {
    try { await cloudinary.uploader.destroy(product.imagePublicId); } catch (e) { console.warn('Cloudinary delete', e.message); }
  }
  await Product.findByIdAndDelete(id);
  return product;
};
