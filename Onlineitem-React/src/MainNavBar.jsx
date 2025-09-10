import React, { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Home from './Home'
import AddItem from './AddItem'
import ViewItem from './ViewItem'
import UpdateItem from './UpdateItem'

export default function MainNavBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    return (
        <div className="site-wrapper">
            <header className="main-header">
                <div className="container header-container">
                    <div className="logo-container">
                        <h1 className="site-logo">
                            <span className="logo-icon">🛍️</span> 
                            <span className="logo-text">Online Item Store</span>
                        </h1>
                    </div>

                    <button className="mobile-menu-toggle" onClick={toggleMenu}>
                        <span className="menu-icon">{menuOpen ? '✕' : '☰'}</span>
                    </button>

                    <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
                        <Link className="nav-link" to="/">
                            <span className="nav-icon">🏠</span> Home
                        </Link>
                        <Link className="nav-link" to="/add-item">
                            <span className="nav-icon">➕</span> Add Item
                        </Link>
                        <Link className="nav-link" to="/view-item">
                            <span className="nav-icon">📋</span> View Items
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="main-content">
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/add-item" element={<AddItem />} />
                        <Route path="/view-item" element={<ViewItem />} />
                        <Route path="/edit-item/:id" element={<UpdateItem />} />
                    </Routes>
                </div>
            </main>
            
            <footer className="main-footer">
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} Online Item Store. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
