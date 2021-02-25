const router = require('express').Router();
const productsController = require('../controllers/products-controller');

router.get('/', productsController.searchResult_get);
router.get('/sections', productsController.sections_get);
router.post('/new-product', productsController.newProduct_post);

module.exports = router;