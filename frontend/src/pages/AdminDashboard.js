import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import '../Admin.css';

const AdminDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        userCount: 0,
        orderCount: 0,
        productCount: 0,
        totalRevenue: 0
    });
    const [recentOrders, setRecentOrders] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('/api/admin/stats', {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                const data = await response.json();
                if (!response.ok) {
                    setErrorMsg(`API Error: ${response.status} - ${data.message || 'Unknown error'}`);
                } else {
                    setStats(data);
                }
            } catch (error) {
                console.error('Error fetching admin stats:', error);
            }
        };

        const fetchRecentOrders = async () => {
            try {
                const response = await fetch('/api/orders', {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                const data = await response.json();
                setRecentOrders(data.slice(0, 5));
            } catch (error) {
                console.error('Error fetching recent orders:', error);
            }
        };

        if (user && user.token) {
            fetchStats();
            fetchRecentOrders();
        }
    }, [user]);

    return (
        <div className="admin-layout">
            <AdminSidebar activePage="dashboard" />

            <div className="admin-main">
                <div className="admin-page-header">
                    <h1 className="admin-page-title">Dashboard Overview</h1>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button className="admin-btn btn-outline" onClick={() => window.location.reload()}>
                            Refresh 🔄
                        </button>
                        <button className="admin-btn btn-primary" onClick={() => navigate('/admin/products')}>
                            Manage Products
                        </button>
                    </div>
                </div>

                {errorMsg && (
                    <div style={{ padding: '15px', backgroundColor: '#ffdcd2', color: '#d32f2f', borderRadius: '8px', marginBottom: '20px', border: '1px solid #d32f2f' }}>
                        <strong>Diagnostic Issue Detected:</strong> {errorMsg}
                    </div>
                )}

                <div className="admin-grid">
                    <div className="admin-card stat-card">
                        <span className="stat-label">Total Users</span>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span className="stat-value">{stats.userCount}</span>
                            <span style={{ fontSize: '2rem' }}></span>
                        </div>
                        <div className="stat-trend trend-up">
                            <span>↑ 12%</span>
                            <span style={{ color: 'var(--admin-text-muted)', fontSize: '0.75rem' }}>vs last month</span>
                        </div>
                    </div>

                    <div className="admin-card stat-card">
                        <span className="stat-label">Total Orders</span>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span className="stat-value">{stats.orderCount}</span>
                            <span style={{ fontSize: '2rem' }}></span>
                        </div>
                        <div className="stat-trend trend-up">
                            <span>↑ 8%</span>
                            <span style={{ color: 'var(--admin-text-muted)', fontSize: '0.75rem' }}>vs last month</span>
                        </div>
                    </div>

                    <div className="admin-card stat-card">
                        <span className="stat-label">Total Products</span>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span className="stat-value">{stats.productCount}</span>
                            <span style={{ fontSize: '2rem' }}></span>
                        </div>
                        <div className="stat-trend">
                            <span style={{ color: 'var(--admin-text-muted)', fontSize: '0.75rem' }}>Active inventory</span>
                        </div>
                    </div>

                    <div className="admin-card stat-card">
                        <span className="stat-label">Total Revenue</span>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span className="stat-value" style={{ fontSize: '1.5rem' }}>
                                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(stats.totalRevenue)}
                            </span>
                            <span style={{ fontSize: '2rem' }}></span>
                        </div>
                        <div className="stat-trend trend-up">
                            <span>↑ 24%</span>
                            <span style={{ color: 'var(--admin-text-muted)', fontSize: '0.75rem' }}>vs last month</span>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                    <div className="admin-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 style={{ margin: 0 }}>Recent Orders</h3>
                            <button className="admin-btn btn-outline" style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem' }} onClick={() => navigate('/admin/orders')}>
                                View All
                            </button>
                        </div>
                        <div className="admin-table-container">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Customer</th>
                                        <th>Status</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentOrders.map(order => (
                                        <tr key={order._id}>
                                            <td style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>#{order._id.slice(-6)}</td>
                                            <td style={{ fontWeight: '500' }}>{order.user?.name || 'Guest'}</td>
                                            <td>
                                                <span className={`admin-badge ${order.orderStatus === 'Delivered' ? 'badge-success' :
                                                    order.orderStatus === 'Processing' ? 'badge-warning' : 'badge-info'
                                                    }`}>
                                                    {order.orderStatus}
                                                </span>
                                            </td>
                                            <td style={{ fontWeight: '600' }}>₹{order.totalAmount}</td>
                                        </tr>
                                    ))}
                                    {recentOrders.length === 0 && (
                                        <tr><td colSpan="4" style={{ textAlign: 'center', padding: '2rem', color: 'var(--admin-text-muted)' }}>No recent orders</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="admin-card">
                        <h3 style={{ margin: '0 0 1.5rem 0' }}>Quick Actions</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <button className="admin-btn btn-outline" style={{ justifyContent: 'flex-start' }} onClick={() => navigate('/admin/products')}>
                                <span>➕</span> Add New Product
                            </button>
                            <button className="admin-btn btn-outline" style={{ justifyContent: 'flex-start' }} onClick={() => navigate('/admin/users')}>
                                <span>🔍</span> Lookup User
                            </button>
                            <button className="admin-btn btn-outline" style={{ justifyContent: 'flex-start' }}>
                                <span>📑</span> Export Report
                            </button>
                            <button className="admin-btn btn-outline" style={{ justifyContent: 'flex-start', color: 'var(--admin-danger)' }}>
                                <span>⚙️</span> System Settings
                            </button>
                        </div>

                        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f1f5f9', borderRadius: '8px' }}>
                            <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: '600' }}>Need Help?</p>
                            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>Contact support at rika-jewels-admin@support.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
