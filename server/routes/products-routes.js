const router = require('express').Router();
const productsController = require('../controllers/products-controller');

router.get('/sections', productsController.sections_get);
router.get('/:id', productsController.product_get); 
router.get('/', productsController.searchResult_get);
router.post('/new-product', productsController.newProduct_post);
router.post('/send-question', productsController.sendQuestion_post);

module.exports = router;