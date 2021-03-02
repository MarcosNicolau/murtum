const Product = require('../models/product-model');
const Section = require('../models/section-model');
const User = require('../models/user-model');
const getProduct = require('../utils/getProduct');
const getPages = require('../utils/get-pages');


const sections_get = async (req, res) => {
    const sections = await Section.find();
    res.send(sections);
}

const searchResult_get = async (req, res) => {
    const { search, length } = req.query;
    const searchResults = await Product.find({
        $or: [
            { category: search },
            { name: search }
        ]
     }).sort({createdAt: -1});
    const contentPageLimit = 10;
    const { products, pages } = getPages(contentPageLimit, searchResults, length);
    res.send({ products, pages });
}

const product_get = async (req, res) => {
    const id = req.params.id;
    getProduct(id, req, res);
}

const sendQuestion_post = async (req, res) => {
    const { question, productId } = req.body;
    if(!question) return res.status(400).send('You must write something');
    const product = await Product.findById(productId);
    product.questions.push({ question, answer: '', createdAt: Date.now() });
    await product.save();
    const sortedQuestions = product.questions.sort((a, b) => b.createdAt - a.createdAt);
    res.send(sortedQuestions);
}

const newProduct_post = async (req, res) => {
    const { name, description, price, category, images, id } = req.body;
    if(!name || !description || !price || !category || !images.length || !id) return res.status(400).send('Complete all the fields');
    const user = await User.findById(id);
    if(!user) return res.status(401).send('/login');
    const newProduct = new Product({
        name,
        description,
        price: Number(price),
        category,
        images,
        owner: id
    });

    try{
        const savedProduct = await newProduct.save();
        user.products.push(savedProduct._id);
        await user.save();
        res.send('/my-products');
    }
    catch{
        res.status(505).send('Unexpected error');
    }
}

module.exports = {
    sections_get,
    searchResult_get,
    product_get,
    sendQuestion_post,
    newProduct_post
}