const router = require('express').Router();
const authentication = require('../middlewares/authentication');
const isOwn = require('../middlewares/isOwn');
const userController = require('../controllers/my-products-controller');

router.post('/', authentication, isOwn, userController.myProducts_post);
router.post('/edit', authentication, isOwn, userController.editProduct_post);
router.post('/edit/name', authentication, userController.editProductName_post);
router.post('/edit/price', authentication, userController.editProductPrice_post);
router.post('/edit/images', authentication, userController.editProductImages_post);
router.post('/send-answer', authentication, userController.sendAnswer_post);
router.post('/delete-product', authentication, isOwn, userController.deleteProduct_post);
module.exports = router;