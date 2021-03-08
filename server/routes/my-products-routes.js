const router = require('express').Router();
const authentication = require('../middlewares/authentication');
const isOwn = require('../middlewares/isOwn');
const userController = require('../controllers/my-products-controller');

router.post('/', authentication, isOwn, userController.myProducts_post);
router.post('/edit', authentication, isOwn, userController.editProduct_post);
router.post('/edit/name', authentication, isOwn, userController.editProductName_post);
router.post('/edit/price', authentication, isOwn, userController.editProductPrice_post);
router.post('/edit/images', authentication, isOwn, userController.editProductImages_post);
router.post('/edit/description', authentication, isOwn, userController.editProdutDescription_post);
router.post('/send-answer', authentication, isOwn, userController.sendAnswer_post);
router.post('/delete-product', authentication, isOwn, userController.deleteProduct_post);
module.exports = router;