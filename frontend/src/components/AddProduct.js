import React, { useState } from 'react';

function AddProduct({ setProducts, products }) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [inStock, setInStock] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newProduct = {
            name,
            price: parseFloat(price),
            category,
            inStock
        };

        fetch('http://localhost:5000/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProduct)
        })
        .then(res => {
            if (!res.ok) throw new Error('Failed to add product');
            return res.json();
        })
        .then(data => {
            console.log("Product added:", data);
            if (data && data._id) {
                setProducts([...products, data]);
                setName('');
                setPrice('');
                setCategory('');
                setInStock(true);
            } else {
                console.error("Invalid product received:", data);
            }
        })
        .catch(err => console.error("Error adding product:", err));
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required />
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" required />
            <label>
                <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} /> In Stock
            </label>
            <button type="submit" style={{ padding: '5px 10px', cursor: 'pointer' }}>Add Product</button>
        </form>
    );
}

export default AddProduct;
