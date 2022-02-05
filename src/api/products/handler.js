const fs = require('fs');
const productService = require('./service');
const { mapProductsModel } = require('../../utils');

exports.postProductsHandler = async (request, response, next) => {
  try {
    console.log(request.body);
    console.log(request.file);
    
    const payload = request.body;
    const fileUploaded = request.file;

    if (fileUploaded) {
      await productService.addProduct({
        ...payload,
        image: fileUploaded.filename,
      });

      return response.status(201).end();
    }
    
    await productService.addProduct(payload);

    return response.status(201).end();
  } catch (error) {
    if (request.file && request.file.path) {
      fs.unlinkSync(request.file.path);
    }

    return next(error);
  }
};

exports.getProductsHandler = async (request, response, next) => {
  try {
    const filters = request.query;
    
    const products = await productService.getProducts(filters);
    
    return response.status(200).json({
      status: 'success',
      data: mapProductsModel(products),
    });
  } catch (error) {
    return next(error)
  }
};

exports.getProductByIdHandler = async (request, response, next) => {
  try {
    const { id } = request.params;
    const product = await productService.getProductById(id);
    
    return response.status(200).json({
      status: 'success',
      data: product,
    });
  } catch (error) {
    return next(error);
  }
};

exports.deleteProductByIdHandler = async (request, response, next) => {
  try {
    const { id } = request.params;

    await productService.deleteProductById(id);
    
    return response.status(200).json({
      status: 'success',
      message: `Product with id '${id}' has been deleted`,
    });
  } catch (error) {
    return next(error);
  }
};