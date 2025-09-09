import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Assuming the styles are here

function Home() {
    return (
        <div className="home-container">
            <h1>Welcome to Product Management</h1>
            <p>Manage your products efficiently and easily.</p>
            <div className="home-links">
                

                <h2>Features</h2>
                <ul padding-left="0">
                    <li> Add, edit, and delete products effortlessly.</li>
                    <li> Sort and search products to find what you need fast.</li>
                    <li> Track stock availability in real time.</li>
                </ul>
                <Link to="/products" className="home-btn">View Products</Link>
            </div>
        </div>
    );
}

export default Home;
