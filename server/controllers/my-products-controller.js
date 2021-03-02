const User = require('../models/user-model');
const Product = require('../models/product-model');
const getProduct = require('../utils/getProduct');

const myProducts_post = async (req, res) => {
    const { id, length } = req.body;
    const user = await User.findById(id);
    const productsLimit = user.products.filter((product, index) => index <= length + 6);
    let products = [];
    for await (const productId of productsLimit){
       const product = await Product.findById(productId);
       products.push({
            name: product.name,
            id: product._id,
            price: product.price,
            image: product.images[0],
            questions: product.questions
       });
    } 
    const hasLoaded = products.length === user.products.length ? 'loaded' : false;
    res.send({products, hasLoaded});
}

const editProduct_post = async (req, res) => {
    const id = req.body.productId;
    getProduct(id, req, res);
}

const sendAnswer_post = async (req, res) => {
    const { answer, productId, item } = req.body;
    if(!answer) return res.status(400).send('You must write something');
    const product = await Product.findById(productId);
    const updatedQuestions = product.questions.map(question => question.createdAt === item.createdAt ? {...question, answer } : { question });
    console.log(updatedQuestions);
    await product.updateOne({ questions: updatedQuestions });
    const sortedQuestions = updatedQuestions.sort((a, b) => b.createdAt - a.createdAt);
    res.send(sortedQuestions);
}

const deleteProduct_post = async (req, res) => {
    const { id, productId } = req.body;
    await Product.findByIdAndDelete(productId);
    const user = await User.findById(id);
    const updatedProducts = user.products.filter(product => product != productId);
    await user.updateOne({ products: updatedProducts });
    res.status(200).send('succes');
}

module.exports = {
    myProducts_post,
    editProduct_post,
    sendAnswer_post,
    deleteProduct_post
}


