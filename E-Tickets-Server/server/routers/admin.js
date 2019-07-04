const router = require('koa-router')();

const adminController = require('../controllers/admin');

router.post('/', adminController.register);

router.get('/self', adminController.getAdminSelf);

module.exports = router;