var express = require('express');
var router = express.Router();
const UserController = require('../controllers/UserController')
const {sendUploadToGCS, multer} = require('../helpers/UploadImage')
const { isLogin } = require('../middlewares')

/*user register*/
router.post('/', multer.single('avatar'), sendUploadToGCS, UserController.register)

/*user login*/
router.post('/login', UserController.login)

router.use(isLogin)

/*add watch tag*/
router.post('/watched/tags', UserController.watchTags)

/*find one user*/
router.get('/', UserController.findOne)


module.exports = router;
