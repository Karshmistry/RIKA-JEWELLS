import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AdminSidebar.css';

const AdminSidebar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <aside className="admin-sidebar">
            <div className="admin-logo">
                <h2>Rika Admin</h2>
            </div>

            <nav className="admin-nav">
                <NavLink to="/admin" end className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
                    <span className="icon">📊</span>
                    Dashboard
                </NavLink>

                <NavLink to="/admin/products" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
                    <span className="icon">💎</span>
                    Products
                </NavLink>

                <NavLink to="/admin/orders" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
                    <span className="icon">📦</span>
                    Orders
                </NavLink>

                <NavLink to="/admin/promos" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
                    <span className="icon">📢</span>
                    Promos
                </NavLink>

                <NavLink to="/admin/banners" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
                    <span className="icon">🖼️</span>
                    Hero Banners
                </NavLink>

                <NavLink to="/admin/udari" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
                    <span className="icon">📒</span>
                    Udari System
                </NavLink>

                <NavLink to="/admin/contacts" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
                    <span className="icon">✉️</span>
                    Inquiries & Appts
                </NavLink>

                <div className="admin-nav-spacer"></div>

                <button onClick={handleLogout} className="admin-logout-btn">
                    <span className="icon">🚪</span>
                    Logout
                </button>
            </nav>
        </aside>
    );
};

export default AdminSidebar;
