import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import { generateInvoice } from '../utils/invoiceGenerator';
import '../Admin.css';

const AdminOrders = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [statusFilter, setStatusFilter] = useState('All');
    const [editStatus, setEditStatus] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('/api/orders', {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        if (user && user.token) {
            fetchOrders();
        }
    }, [user]);

    const handleStatusChange = async (orderId) => {
        const newStatus = editStatus[orderId];
        if (!newStatus) return;

        try {
            const response = await fetch(`/api/orders/${orderId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                setOrders(orders.map(order =>
                    order._id === orderId ? { ...order, orderStatus: newStatus } : order
                ));
                alert(`Order #${orderId.slice(-8).toUpperCase()} status updated to ${newStatus}`);
                // Clear the edit state for this order
                setEditStatus(prev => {
                    const next = { ...prev };
                    delete next[orderId];
                    return next;
                });
            } else {
                const data = await response.json();
                alert(`Failed to update status: ${data.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error updating status:', error);
            alert('An error occurred while updating the status.');
        }
    };

    const filteredOrders = orders.filter(order => {
        const matchesStatus = statusFilter === 'All' || order.orderStatus === statusFilter;
        const matchesSearch = order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (order.user?.name && order.user.name.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesStatus && matchesSearch;
    });

    return (
        <div className="admin-layout">
            <AdminSidebar activePage="orders" />

            <div className="admin-main">
                <div className="admin-page-header">
                    <div>
                        <h1 className="admin-page-title">Orders Management</h1>
                        <p style={{ color: 'var(--admin-text-muted)', margin: '5px 0 0 0' }}>Track and manage customer orders and fulfillment</p>
                    </div>
                </div>

                <div className="admin-card">
                    <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
                        <div style={{ flex: 1, minWidth: '300px', position: 'relative' }}>
                            <input
                                type="text"
                                className="admin-input"
                                placeholder="Search by Order ID or Customer..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ paddingLeft: '40px' }}
                            />
                            <span style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>🔍</span>
                        </div>
                        <select
                            className="admin-select"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            style={{ width: '200px' }}
                        >
                            <option value="All">All Statuses</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>

                    <div className="admin-table-container">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders.map(order => (
                                    <tr key={order._id}>
                                        <td>
                                            <div style={{ fontWeight: '500', fontSize: '0.85rem' }}>#{order._id.slice(-8).toUpperCase()}</div>
                                            <div style={{ fontSize: '0.7rem', color: 'var(--admin-text-muted)' }}>{order._id}</div>
                                        </td>
                                        <td>
                                            <div style={{ fontWeight: '600' }}>{order.user?.name || 'Guest'}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>{order.user?.email}</div>
                                        </td>
                                        <td style={{ color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>
                                            {new Date(order.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                        </td>
                                        <td style={{ fontWeight: '700', color: 'var(--admin-primary)' }}>₹{order.totalAmount.toLocaleString()}</td>
                                        <td>
                                            <span className={`admin-badge ${order.orderStatus === 'Delivered' ? 'badge-success' :
                                                order.orderStatus === 'Processing' ? 'badge-warning' :
                                                    order.orderStatus === 'Cancelled' ? 'badge-danger' : 'badge-info'
                                                }`}>
                                                {order.orderStatus}
                                            </span>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                                <select
                                                    value={editStatus[order._id] || order.orderStatus}
                                                    onChange={(e) => setEditStatus({ ...editStatus, [order._id]: e.target.value })}
                                                    className="admin-select"
                                                    style={{ padding: '4px 8px', fontSize: '0.75rem', width: 'auto' }}
                                                >
                                                    <option value="Processing">Processing</option>
                                                    <option value="Shipped">Shipped</option>
                                                    <option value="Delivered">Delivered</option>
                                                    <option value="Cancelled">Cancelled</option>
                                                </select>

                                                {editStatus[order._id] && editStatus[order._id] !== order.orderStatus && (
                                                    <button
                                                        className="admin-btn"
                                                        style={{
                                                            padding: '4px 12px',
                                                            fontSize: '0.75rem',
                                                            backgroundColor: 'var(--admin-primary)',
                                                            color: 'white',
                                                            border: 'none',
                                                            borderRadius: '4px',
                                                            cursor: 'pointer'
                                                        }}
                                                        onClick={() => handleStatusChange(order._id)}
                                                    >
                                                        Update
                                                    </button>
                                                )}

                                                <button
                                                    className="admin-btn-outline"
                                                    style={{ padding: '4px 8px', fontSize: '1rem', border: '1px solid var(--admin-border)', borderRadius: '4px', background: 'none' }}
                                                    onClick={() => generateInvoice(order)}
                                                    title="Download Invoice"
                                                >
                                                    📄
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredOrders.length === 0 && (
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: 'var(--admin-text-muted)' }}>
                                            No orders found matching your criteria.
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

export default AdminOrders;
