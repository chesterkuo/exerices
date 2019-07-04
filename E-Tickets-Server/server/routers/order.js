const router = require('koa-router')();
const orderController = require('../controllers/order');

router.post('/', orderController.createOrder);

router.patch('/payment/:order_id', 
        orderController.payOrder);

router.get('/:username/:order_id', 
        orderController.getOrderInfo);

module.exports = router;