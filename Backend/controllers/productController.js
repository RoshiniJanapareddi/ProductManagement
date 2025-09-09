const Product = require('../models/Product');

const getProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        next(err);
    }
};

const addProduct = async (req, res, next) => {
    try {
        const { name, price, category, inStock } = req.body;
        const product = new Product({
            name,
            price,
            category,
            inStock: inStock !== undefined ? inStock : true // default true if missing
        });
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        console.error(err); // log the error
        res.status(500).json({ message: 'Failed to add product', error: err.message });
    }
};

const updateProduct = async (req, res, next) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedProduct);
    } catch (err) {
        next(err);
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted' });
    } catch (err) {
        next(err);
    }
};

module.exports = { getProducts, addProduct, updateProduct, deleteProduct };
