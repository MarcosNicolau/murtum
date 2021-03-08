const Product = require('../models/product-model');

const getProduct = async (id, req, res) => {
    const product = await Product.findById(id);
    if(!product) return res.status(404).send(product);
    const { name, images, price, description, questions, owner } = product;
    const sortedQuestions = questions.sort((a, b) => b.createdAt - a.createdAt);
    res.send({ name, images, price, description, questions: sortedQuestions, owner });
}

module.exports = getProduct