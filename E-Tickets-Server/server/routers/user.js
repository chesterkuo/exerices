const router = require('koa-router')();
const multer = require('koa-multer');

const uploadUtils = require('../utils/upload_utils');
const userController = require('../controllers/user');

const upload = multer({
    storage: uploadUtils.avatarEngine
});

/*Register*/
router.post('/', userController.register);

router.get('/self', userController.getUserSelf);

/*Get/Update User-Info*/
router.get('/:username', userController.queryUserInfo);
router.patch('/:username', userController.updateUserInfo);

/*Upload avatar*/
router.post('/avatar/:username', upload.single('avatar'), 
        userController.uploadAvatar);


module.exports = router;