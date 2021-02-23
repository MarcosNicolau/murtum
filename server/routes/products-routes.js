const router = require('express').Router();
const productsController = require('../controllers/products-controller');

router.post('/new-product', productsController.newProduct_post);

module.exports = router;