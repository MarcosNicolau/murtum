const Product = require('../models/product-model');
const User = require('../models/user-model');
const fs = require('fs');

const newProduct_post = async (req, res) => {
    const { name, description, price, category,images, id } = req.body;
    const user = await User.findById(id);
    if(!user) return res.status(401).send('/login');

    const newProduct = new Product({
        name,
        description,
        price,
        category,
        images
    });
    try{
        const savedProduct = await newProduct.save();
        user.products.push({ productName: savedProduct.name, productId: savedProduct._id });
        await user.save();
        res.send('/my-products');
    }
    catch{
        res.status(505).send('Unexpected error');
    }
}

module.exports = {
    newProduct_post,
}