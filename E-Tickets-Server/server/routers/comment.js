const router = require('koa-router')();

const commentController = require('../controllers/comment');

router.post('/', commentController.createComment);
router.del('/', commentController.deleteComment);

module.exports = router;