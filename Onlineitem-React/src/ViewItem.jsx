import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from './config';

export default function ViewItem() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const navigate = useNavigate();

    const fetchItems = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${config.url}/item/view`);
            if (!res.ok) {
                throw new Error('Failed to fetch items');
            }
            const data = await res.json();
            setItems(data);
            setError(null);
        } catch (error) {
            console.error(error);
            setError('Failed to load items. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                const res = await fetch(`${config.url}/item/delete/${id}`, { method: 'DELETE' });
                if (res.ok) {
                    setItems(items.filter(item => item.id !== id));
                } else {
                    throw new Error('Failed to delete item');
                }
            } catch (error) {
                console.error(error);
                setError('Failed to delete item. Please try again.');
            }
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    // Get unique categories for filter dropdown
    const categories = [...new Set(items.map(item => item.category))];

    // Filter items based on search term and category
    const filteredItems = items.filter(item => {
        const matchesSearch = item.itemName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === '' || item.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="view-items-page fade-in">
            <div className="page-header">
                <h1 className="page-title">Item Inventory</h1>
                <p className="page-subtitle">Browse and manage your store items</p>
            </div>

            <div className="filter-controls">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
                
                <div className="filter-container">
                    <select 
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="filter-select"
                    >
                        <option value="">All Categories</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                    
                    <button 
                        onClick={() => {
                            setSearchTerm('');
                            setFilterCategory('');
                        }}
                        className="button clear-button"
                        disabled={!searchTerm && !filterCategory}
                    >
                        Clear Filters
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading items...</p>
                </div>
            ) : error ? (
                <div className="error-message">{error}</div>
            ) : filteredItems.length === 0 ? (
                <div className="empty-state">
                    <h3>No items found</h3>
                    {searchTerm || filterCategory ? (
                        <p>Try adjusting your search or filter criteria</p>
                    ) : (
                        <p>Add your first item to get started</p>
                    )}
                </div>
            ) : (
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredItems.map(item => (
                                <tr key={item.id}>
                                    <td data-label="ID">{item.id}</td>
                                    <td data-label="Item Name">{item.itemName}</td>
                                    <td data-label="Price">${item.price.toFixed(2)}</td>
                                    <td data-label="Category">{item.category}</td>
                                    <td data-label="Actions" className="action-buttons">
                                        <button 
                                            onClick={() => navigate(`/edit-item/${item.id}`)}
                                            className="edit-button"
                                            aria-label={`Edit ${item.itemName}`}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(item.id)}
                                            className="delete-button"
                                            aria-label={`Delete ${item.itemName}`}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="refresh-container">
                <button onClick={fetchItems} className="button refresh-button">
                    Refresh Items
                </button>
            </div>
        </div>
    );
}
