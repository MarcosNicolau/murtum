const router = require('express').Router();
const productsController = require('../controllers/products-controller');
const authentication = require('../middlewares/authentication');
const isOwn = require('../middlewares/isOwn');

router.get('/sections', productsController.sections_get);
router.get('/:id', productsController.product_get);
router.get('/', productsController.searchResult_get);
router.post(
    '/new-product',
    authentication,
    isOwn,
    productsController.newProduct_post
);
router.post(
    '/send-question',
    authentication,
    productsController.sendQuestion_post
);

module.exports = router;
