const router = require('koa-router')();

const sessionController = require('../controllers/session');

router.post('/user', sessionController.userLogIn);
router.del('/user', sessionController.userLogOut);

router.post('/admin', sessionController.adminLogIn);
router.del('/admin', sessionController.adminLogOut);

router.post('/owner', sessionController.ownerLogIn);
router.del('/owner', sessionController.ownerLogOut);

module.exports = router;