const User = require('../models/user-model');
const Product = require('../models/product-model');
const getProduct = require('../utils/getProduct');
const editProductField = require('../utils/edit-product-field');

const myProducts_post = async (req, res) => {
    const { id, length } = req.body;
    const user = await User.findById(id);
    const productsLimit = user.products.filter((product, index) => index <= length + 9);
    let products = [];
    for await (const productId of productsLimit){
       const product = await Product.findById(productId);
       products.push({
            name: product.name,
            id: product._id,
            price: product.price,
            image: product.images[0],
            questions: product.questions,
            createdAt: product.createdAt
       });
    } 
    const hasLoaded = products.length === user.products.length ? 'loaded' : false;
    const sortProducts = products.sort((a, b) => b.createdAt - a.createdAt); 
    res.send({products: sortProducts, hasLoaded});
}

const editProduct_post = async (req, res) => {
    const id = req.body.productId;
    getProduct(id, req, res);
}

const editProductName_post = async (req, res) => {
    const { name, productId } = req.body;
    await editProductField('name', name, productId);
    getProduct(productId, req, res);
}

const editProductPrice_post = async (req, res) => {
    const { price, productId } = req.body;
    await editProductField('price', price, productId);
    getProduct(productId, req, res);
}

const editProductImages_post = async (req, res) => {
    const { images, productId } = req.body;
    await editProductField('images', images, productId);
    getProduct(productId, req, res);
}

const editProdutDescription_post = async (req, res) => {
    const { description, productId } = req.body;
    await editProductField('description', description, productId);
    getProduct(productId, req, res);
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
    editProductName_post,
    editProductPrice_post,
    editProductImages_post,
    editProdutDescription_post,
    sendAnswer_post,
    deleteProduct_post
}


