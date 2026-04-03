import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import '../Admin.css';

const AdminProducts = () => {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);
    const [filterCategory, setFilterCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await fetch(`/api/products/${id}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                setProducts(products.filter(product => product._id !== id));
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    const createProductHandler = async () => {
        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    name: 'New Product ' + Date.now(),
                    price: 0,
                    user: user._id,
                    image: '/images/sample.jpg',
                    brand: 'Rika',
                    category: 'Gold',
                    countInStock: 0,
                    numReviews: 0,
                    description: 'New product description',
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
                return;
            }

            const data = await response.json();
            navigate(`/admin/product/${data._id}/edit`);
        } catch (error) {
            console.error('Create product error:', error);
        }
    }

    const toggleAvailability = async (product) => {
        const newStock = product.countInStock > 0 ? 0 : 10;
        try {
            const response = await fetch(`/api/products/${product._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    countInStock: newStock
                }),
            });

            if (response.ok) {
                setProducts(products.map(p =>
                    p._id === product._id ? { ...p, countInStock: newStock } : p
                ));
            }
        } catch (error) {
            console.error('Error updating availability:', error);
            alert('Failed to update availability');
        }
    };

    const filteredProducts = products.filter(product => {
        const matchesCategory = filterCategory === 'All' || product.category === filterCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (product.brand && product.brand.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="admin-layout">
            <AdminSidebar activePage="products" />

            <div className="admin-main">
                <div className="admin-page-header">
                    <div>
                        <h1 className="admin-page-title">Product Catalog</h1>
                        <p style={{ color: 'var(--admin-text-muted)', margin: '5px 0 0 0' }}>Manage your inventory and product listings</p>
                    </div>
                    <button className="admin-btn btn-primary" onClick={createProductHandler}>
                        <span>➕</span> Add New Product
                    </button>
                </div>

                <div className="admin-card">
                    <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
                        <div style={{ flex: 1, minWidth: '300px', position: 'relative' }}>
                            <input
                                type="text"
                                className="admin-input"
                                placeholder="Search by name or brand..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ paddingLeft: '40px' }}
                            />
                            <span style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>🔍</span>
                        </div>
                        <select
                            className="admin-select"
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            style={{ width: '200px' }}
                        >
                            <option value="All">All Categories</option>
                            <option value="Gold">Gold</option>
                            <option value="Silver">Silver</option>
                            <option value="Platinum">Platinum</option>
                            <option value="Diamond">Diamond</option>
                            <option value="Gemstone">Gemstone</option>
                            <option value="Wedding">Wedding</option>
                            <option value="Gift">Gift</option>
                        </select>
                    </div>

                    <div className="admin-table-container">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Category</th>
                                    <th>Stock</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map(product => (
                                    <tr key={product._id}>
                                        <td>
                                            <img
                                                src={product.image?.startsWith('/uploads') ? `${product.image}` : product.image}
                                                alt={product.name}
                                                style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover', border: '1px solid var(--admin-border)' }}
                                            />
                                        </td>
                                        <td>
                                            <div style={{ fontWeight: '600' }}>{product.name}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>{product.brand}</div>
                                        </td>
                                        <td style={{ fontWeight: '500' }}>₹{product.price.toLocaleString()}</td>
                                        <td>
                                            <span className="admin-badge badge-info">{product.category}</span>
                                        </td>
                                        <td>{product.countInStock}</td>
                                        <td>
                                            <button
                                                onClick={() => toggleAvailability(product)}
                                                className={`admin-badge ${product.countInStock > 0 ? 'badge-success' : 'badge-danger'}`}
                                                style={{ border: 'none', cursor: 'pointer' }}
                                            >
                                                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                            </button>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <button
                                                    onClick={() => navigate(`/admin/product/${product._id}/edit`)}
                                                    className="admin-btn btn-outline"
                                                    style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product._id)}
                                                    className="admin-btn btn-danger"
                                                    style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredProducts.length === 0 && (
                                    <tr>
                                        <td colSpan="7" style={{ textAlign: 'center', padding: '3rem', color: 'var(--admin-text-muted)' }}>
                                            No products found matching your criteria.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProducts;
