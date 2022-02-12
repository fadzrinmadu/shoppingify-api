const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./model');
const NotFoundError = require('../../exceptions/NotFoundError');

const checkProductById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new NotFoundError(`Product with id '${id}' not found`);
  }

  const product = await Product.exists({ _id: id });

  if (!product) {
    throw new NotFoundError(`Product with id '${id}' not found`);
  }
};

exports.addProduct = async (payload) => {
  const product = new Product(payload);
  await product.save();
};

exports.getProducts = async (filters) => {
  const { terms = '' } = filters;
  
  const products = await Product.aggregate([
    {
      $match: { name: { $regex: terms, $options: 'i' } },
    },
    {
      $set: {
        image: {
          $concat: [
            'http://localhost:3000/uploads/products/',
            '$image',
          ],
        },
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        category: 1,
      },
    },
  ]);

  return products;
}

exports.getProductById = async (id) => {
  await checkProductById(id);
  
  const product = await Product.aggregate([
    {
      $match: { _id: mongoose.Types.ObjectId(id) },
    },
    {
      $set: {
        image: {
          $concat: [
            'http://localhost:3000/uploads/products/',
            '$image',
          ],
        },
      },
    },
    {
      $project: {
        __v: 0,
      },
    },
  ]);

  return product;
};

exports.deleteProductById = async (id) => {
  await checkProductById(id);
  const product = await Product.findOneAndDelete({ _id: id });
  fs.unlinkSync(path.join(`public/uploads/products/${product.image}`));
}