const router = require('express').Router();
const handler = require('./handler');
const { uploadImage } = require('./middleware');

router.post('/', uploadImage, handler.postProductsHandler);
router.get('/', handler.getProductsHandler);
router.get('/:id', handler.getProductByIdHandler);
router.delete('/:id', handler.deleteProductByIdHandler);

module.exports = router;