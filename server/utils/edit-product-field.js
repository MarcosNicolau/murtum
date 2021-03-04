const Product = require('../models/product-model');
const editProductField = async (field, value, productId) => {
    if(!value, !productId) return res.status(400).send('Incomplete fields');
    const product = await Product.findById(productId);
    await product.updateOne({ [field]: value });
}

module.exports = editProductField;