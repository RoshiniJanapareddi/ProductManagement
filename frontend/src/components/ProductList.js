import React, { useEffect, useState } from 'react';
import AddProduct from './AddProduct';
import '../App.css'; // Make sure App.css has the required styles

function ProductList() {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [sortOrder, setSortOrder] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        fetch('http://localhost:5000/api/products')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setProducts(data);
                else setProducts([]); // fallback if data is not array
            })
            .catch(err => {
                console.error(err);
                setProducts([]);
            });
    };

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (!confirmDelete) return;

        fetch(`http://localhost:5000/api/products/${id}`, { method: 'DELETE' })
            .then(res => {
                if (!res.ok) throw new Error('Failed to delete product');
                return res.json();
            })
            .then(() => setProducts(products.filter(product => product._id !== id)))
            .catch(err => console.error(err));
    };

    const handleEdit = (product) => setEditingProduct(product);

    const handleUpdate = (e) => {
        e.preventDefault();
        if (!editingProduct) return;

        fetch(`http://localhost:5000/api/products/${editingProduct._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editingProduct)
        })
            .then(res => {
                if (!res.ok) throw new Error('Failed to update product');
                return res.json();
            })
            .then(updatedProduct => {
                setProducts(products.map(p => p._id === updatedProduct._id ? updatedProduct : p));
                setEditingProduct(null);
            })
            .catch(err => console.error(err));
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditingProduct(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
        const sorted = [...products].sort((a, b) => {
            if (e.target.value === 'asc') return a.price - b.price;
            if (e.target.value === 'desc') return b.price - a.price;
            return 0;
        });
        setProducts(sorted);
    };

    const filteredProducts = Array.isArray(products)
        ? products.filter(product => product.name?.toLowerCase().includes(searchTerm.toLowerCase()))
        : [];

    return (
        <div className="product-list-container">
            <AddProduct setProducts={setProducts} products={products} />

            {editingProduct && (
                <div className="edit-form-container">
                    <h3>Edit Product</h3>
                    <form onSubmit={handleUpdate} className="edit-form">
                        <input type="text" name="name" value={editingProduct?.name || ''} onChange={handleChange} placeholder="Name" required />
                        <input type="number" name="price" value={editingProduct?.price || ''} onChange={handleChange} placeholder="Price" required />
                        <input type="text" name="category" value={editingProduct?.category || ''} onChange={handleChange} placeholder="Category" required />
                        <label>
                            <input type="checkbox" name="inStock" checked={editingProduct?.inStock || false} onChange={handleChange} /> In Stock
                        </label>
                        <button type="submit" className="edit-btn">Update</button>
                        <button type="button" onClick={() => setEditingProduct(null)}>Cancel</button>
                    </form>
                </div>
            )}

            {/* Sort and Search stacked vertically */}
            <div className="sort-search-container">
                <div className="sort-container">
                    <label>Sort by Price:</label>
                    <select value={sortOrder} onChange={handleSortChange}>
                        <option value="">None</option>
                        <option value="asc">Low to High</option>
                        <option value="desc">High to Low</option>
                    </select>
                </div>
                <div className="search-container">
                    <label>Search by Name:</label>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        placeholder="Search products..."
                    />
                </div>
            </div>

            <h2>Product List</h2>
            <div className="product-cards-container">
                {filteredProducts.map(product => (
                    <div key={product._id} className="product-card">
                        <h3>{product.name}</h3>
                        <p><strong>Price:</strong> ₹{product.price}</p>
                        <p><strong>Category:</strong> {product.category}</p>
                        <p><strong>In Stock:</strong> {product.inStock ? 'Yes' : 'No'}</p>
                        <div className="product-card-buttons">
                            <button onClick={() => handleEdit(product)} className="edit-btn">Edit</button>
                            <button onClick={() => handleDelete(product._id)} className="delete-btn">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;
