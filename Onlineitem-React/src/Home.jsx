import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  // Sample featured items
  const featuredItems = [
    { id: 1, name: 'Premium Headphones', price: 129, category: 'Electronics', image: '🎧' },
    { id: 2, name: 'Fitness Tracker', price: 79, category: 'Wearables', image: '⌚' },
    { id: 3, name: 'Smart Speaker', price: 99, category: 'Electronics', image: '🔊' },
    { id: 4, name: 'Wireless Charger', price: 49, category: 'Accessories', image: '🔌' }
  ];

  return (
    <div className="home-page fade-in">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to the Online Item Store</h1>
          <p className="hero-subtitle">
            Find the best products at competitive prices. Shop now and enjoy!
          </p>
          <div className="hero-buttons">
            <Link to="/view-item" className="button primary-button">
              Browse Items
            </Link>
            <Link to="/add-item" className="button secondary-button">
              Add New Item
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Items Section */}
      <section className="featured-section">
        <div className="section-header">
          <h2 className="section-title">Featured Items</h2>
          <p className="section-subtitle">Check out our most popular items</p>
        </div>

        <div className="item-grid">
          {featuredItems.map(item => (
            <div key={item.id} className="item-card">
              <div className="item-image">
                <span className="item-icon">{item.image}</span>
              </div>
              <div className="item-content">
                <h3 className="item-title">{item.name}</h3>
                <p className="item-price">${item.price}</p>
                <span className="item-category">{item.category}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to start selling?</h2>
          <p className="cta-text">Add your items to our marketplace and reach thousands of customers.</p>
          <Link to="/add-item" className="button cta-button">
            Add Item Now
          </Link>
        </div>
      </section>
    </div>
  );
}
