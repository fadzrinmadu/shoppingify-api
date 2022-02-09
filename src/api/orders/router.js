const router = require('express').Router();
const multer = require('multer');
const handler = require('./handler');

router.post('/', multer().none(), handler.postOrdersHandler);
router.get('/', handler.getOrdersHandler);
router.get('/:id', handler.getOrderByIdHandler);
router.delete('/:id', handler.deleteOrderByIdHandler);

module.exports = router;