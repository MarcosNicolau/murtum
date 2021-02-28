const router = require('express').Router();
const authentication = require('../middlewares/authentication');
const isOwn = require('../middlewares/isOwn');
const userController = require('../controllers/user-controller');

router.post('/cart', authentication, isOwn, userController.userCart_get);
router.post('/cart/delete-cart', authentication, isOwn, userController.deleteCart_post);
router.post('/cart/add-cart', authentication, isOwn, userController.addCart_post);
router.post('/cart/is-item-in-cart', userController.isProductAdded_post);
router.post('/my-products', authentication, isOwn, userController.myProducts_post);
router.post('/my-products/edit', authentication, isOwn, userController.myProductsEdit_post);
router.post('/my-products/send-answer', authentication, userController.sendAnswer_post);
module.exports = router;