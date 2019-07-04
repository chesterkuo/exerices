const router = require('koa-router')();
const orderController = require('../controllers/order');

router.get('/:username/paid-orders', 
        orderController.searchPaidOrderByUser);

router.get('/:username/unpaid-orders',
        orderController.searchUnpaidOrderByUser);

module.exports = router;