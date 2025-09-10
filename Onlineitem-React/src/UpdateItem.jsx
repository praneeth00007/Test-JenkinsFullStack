import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import config from './config';

export default function UpdateItem() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [itemName, setItemName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);

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

    // Fetch item data when component mounts
    useEffect(() => {
        const fetchItem = async () => {
            try {
                const res = await fetch(`${config.url}/item/${id}`);
                
                if (!res.ok) {
                    throw new Error('Item not found');
                }
                
                const item = await res.json();
                
                // Set form fields with item data
                setItemName(item.itemName);
                setPrice(item.price);
                setCategory(item.category);
                setFetchError(null);
            } catch (error) {
                console.error('Error fetching item:', error);
                setFetchError('Could not load item data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchItem();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const updatedItem = {
            itemName,
            price: parseInt(price),
            category
        };
        
        try {
            const res = await fetch(`${config.url}/item/update/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedItem)
            });

            if (res.ok) {
                setMessageType('success');
                setMessage('Item updated successfully!');
                
                // Navigate back to view items after a brief delay
                setTimeout(() => {
                    navigate('/view-item');
                }, 2000);
            } else {
                setMessageType('error');
                setMessage('Failed to update item');
            }
        } catch (error) {
            console.error('Error updating item:', error);
            setMessageType('error');
            setMessage('Error: ' + error.message);
        }
    };

    if (loading) {
        return (
            <div className="update-item-page fade-in">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading item data...</p>
                </div>
            </div>
        );
    }

    if (fetchError) {
        return (
            <div className="update-item-page fade-in">
                <div className="error-message">
                    <p>{fetchError}</p>
                    <button 
                        onClick={() => navigate('/view-item')} 
                        className="button"
                    >
                        Back to Items
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="update-item-page fade-in">
            <div className="page-header">
                <h1 className="page-title">Update Item</h1>
                <p className="page-subtitle">Edit the details of your item</p>
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
                    
                    <div className="button-group">
                        <button type="submit" className="button form-submit">
                            Update Item
                        </button>
                        <button 
                            type="button" 
                            onClick={() => navigate('/view-item')}
                            className="button cancel-button"
                        >
                            Cancel
                        </button>
                    </div>
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