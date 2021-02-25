const Product = require('../models/product-model');
const Section = require('../models/section-model');
const User = require('../models/user-model');


const sections_get = async (req, res) => {
    const sections = await Section.find();
    res.send(sections);
}

const searchResult_get = async (req, res) => {
    const { search } = req.query;
    const searchResults = await Product.find({
        $or: [
            { category: search },
            { name: search }
        ]
     }).sort({createdAt: -1});
    const setProps = searchResults.map(result => {
        return {
            id: result._id,
            images: result.images,
            name: result.name,
            price: result.price
        }
    })

    res.send(setProps);
}

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
    sections_get,
    searchResult_get,
    newProduct_post
}