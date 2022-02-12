const router = require('express').Router();
const handler = require('./handler');

router.get('/', handler.getStatisticsHandler);

module.exports = router;