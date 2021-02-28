const User = require('../models/user-model');
const Product = require('../models/product-model');

const userCart_get = async (req, res) => {  
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

const myProducts_post = async (req, res) => {
    const id = req.body.id;
    const user = await User.findById(id);
    let products = [];
    for await (const index of user.products){
       const product = await Product.findById(index.productId);
       products.push({
            name: product.name,
            id: product._id,
            price: product.price,
            image: product.images[0],
            questions: product.questions
       });
    } 
    res.send(products);
}

const myProductsEdit_post = async (req, res) => {
    const id  = req.body.productId;
    const product = await Product.findById(id);
    if(!product) return res.status(404).send(product);
    const { name, images, price, description, questions } = product;
    const sortedQuestions = questions.sort((a, b) => b.createdAt - a.createdAt);
    res.send({ name, images, price, description, questions: sortedQuestions });
}

const sendAnswer_post = async (req, res) => {
    const { answer, productId, item } = req.body;
    if(!answer) return res.status(400).send('You must write something');
    const product = await Product.findById(productId);
    const updatedQuestions = product.questions.map(question => question.createdAt === item.createdAt ? {...question, answer } : { question });
    await product.updateOne({ questions: updatedQuestions });
    const sortedQuestions = updatedQuestions.sort((a, b) => b.createdAt - a.createdAt);
    res.send(sortedQuestions);
}

module.exports = {
    userCart_get,
    isProductAdded_post,
    addCart_post,
    deleteCart_post,
    myProducts_post,
    myProductsEdit_post,
    sendAnswer_post
}


