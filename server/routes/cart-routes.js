const router = require('express').Router();
const authentication = require('../middlewares/authentication');
const isOwn = require('../middlewares/isOwn');
const cartController = require('../controllers/cart-controller');

router.post('/', authentication, isOwn, cartController.cart_post);
router.post('/delete-cart', authentication, isOwn, cartController.deleteCart_post);
router.post('/add-cart', authentication, isOwn, cartController.addCart_post);
router.post('/is-item-in-cart', cartController.isProductAdded_post);

module.exports = router;