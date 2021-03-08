const User = require('../models/user-model');
const Product = require('../models/product-model');

const cart_post = async (req, res) => {  
    const id = req.body.id;
    const user = await User.findById(id);
    const cart = user.cart;
    let products = [];
    for await (const item of cart){
       const product = await Product.findById(item);
       products.push({
            name: product.name,
            id: product._id,
            price: product.price,
            image: product.images[0]
       });
    }
    res.send(products);
}

const isProductAdded_post = async (req, res) => {
    const { id, productId } = req.body;
    if(!id || !productId) return res.status(400).send('Need values');
    const user = await User.findById(id);
    const isProductInCart = user.cart.find(product => product === productId);
    if(!isProductInCart) return res.send(false);
    res.send(true);
}

const addCart_post = async (req, res) => {
    const { id, productId } = req.body;
    const user = await User.findById(id);
    const isAdded = user.cart.find(product => product === productId);
    if(isAdded) {
        const updatedCart = user.cart.filter(product => product !== productId);
        await user.updateOne({ cart: updatedCart });
        return res.send(false)
    }
    user.cart.push(productId);
    await user.save();
    res.send(true);
}

const deleteCart_post = async (req, res) => {
    const { id, productId } = req.body;
    const user = await User.findById(id);
    const updatedProducts = user.cart.filter(product => product !== productId);
    await user.updateOne({ cart: updatedProducts });
    res.send(updatedProducts);
}

module.exports = {
    cart_post,
    isProductAdded_post,
    addCart_post,
    deleteCart_post
}