const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        required: true,
        type: String
    },
    description: {
        require: true,
        type: String
    },
    price: {
        required: true,
        type: String
    },
    category: {
        required: true,
        type: String
    },
    images: {
        required: true,
        type: Array
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;