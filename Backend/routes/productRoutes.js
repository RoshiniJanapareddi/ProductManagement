const express = require('express');
const router = express.Router();
const { getProducts, addProduct, updateProduct, deleteProduct } = require('../controllers/productController');

// Get all products
router.get('/', getProducts);

// Add a new product
router.post('/', addProduct);

// Update a product
router.put('/:id', updateProduct);

// Delete a product
router.delete('/:id', deleteProduct);

module.exports = router;
