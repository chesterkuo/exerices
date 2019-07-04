const router = require('koa-router')();

const ownerController = require('../controllers/cinema_owner');

router.post('/', ownerController.register);

router.get('/self', ownerController.getOwnerSelf);

module.exports = router;