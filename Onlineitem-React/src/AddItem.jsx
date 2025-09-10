import React, { useState } from 'react';
import config from './config';

export default function AddItem() {
    const [itemName, setItemName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [loading, setLoading] = useState(false);

    // Predefined categories
    const categories = [
        'Electronics', 
        'Clothing', 
        'Home & Kitchen', 
        'Books', 
        'Toys & Games',
        'Beauty & Personal Care',
        'Sports & Outdoors',
        'Automotive',
        'Other'
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const item = { itemName, price: parseInt(price), category };
        
        setLoading(true);
        try {
            const res = await fetch(`${config.url}/item/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item)
            });

            if (res.ok) {
                setMessageType('success');
                setMessage("Item added successfully!");
                setItemName('');
                setPrice('');
                setCategory('');
            } else {
                setMessageType('error');
                setMessage("Failed to add item");
            }
        } catch (error) {
            console.error(error);
            setMessageType('error');
            setMessage("Error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-item-page fade-in">
            <div className="page-header">
                <h1 className="page-title">Add New Item</h1>
                <p className="page-subtitle">Fill in the details to add a new item to the store</p>
            </div>
            
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="itemName" className="form-label">Item Name</label>
                        <input
                            id="itemName"
                            type="text"
                            placeholder="Enter item name"
                            value={itemName}
                            onChange={e => setItemName(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="price" className="form-label">Price ($)</label>
                        <input
                            id="price"
                            type="number"
                            placeholder="Enter price"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            min="0"
                            step="0.01"
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="category" className="form-label">Category</label>
                        <select
                            id="category"
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                            required
                        >
                            <option value="" disabled>Select a category</option>
                            {categories.map((cat, index) => (
                                <option key={index} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                    
                    <button 
                        type="submit" 
                        className="button form-submit"
                        disabled={loading}
                    >
                        {loading ? 'Adding...' : 'Add Item'}
                    </button>
                </form>
                
                {message && (
                    <div className={`form-message ${messageType === 'success' ? 'success-message' : 'error-message'}`}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}
