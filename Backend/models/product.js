const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true }, // category instead of description
    inStock: { type: Boolean, default: true }   // added inStock
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
