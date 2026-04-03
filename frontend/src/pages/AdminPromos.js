import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AdminSidebar from '../components/AdminSidebar';
import '../Admin.css';

const AdminPromos = () => {
    const { user } = useAuth();
    const [promos, setPromos] = useState([]);
    const [newPromo, setNewPromo] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchPromos = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/promos');
            const data = await response.json();
            console.log('Fetched promos:', data);
            if (Array.isArray(data)) {
                setPromos(data);
            } else {
                console.error('Invalid data format received:', data);
                setPromos([]);
            }
        } catch (error) {
            console.error('Error fetching promos:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPromos();
    }, []);

    const handleAddPromo = async (e) => {
        e.preventDefault();
        const promoText = newPromo.trim();
        if (!promoText) return;

        if (!user || !user.token) {
            alert('Authentication error. Please login again.');
            return;
        }

        try {
            const response = await fetch('/api/promos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({ text: promoText }),
            });

            const data = await response.json();
            console.log('Add promo response:', data);

            if (response.ok) {
                setNewPromo('');
                alert('Promo added successfully!');
                await fetchPromos(); // Refresh the list
            } else {
                alert(`Error: ${data.message || 'Failed to add promo'}`);
            }
        } catch (error) {
            console.error('Error adding promo:', error);
            alert('Network error while adding promo.');
        }
    };

    const handleDeletePromo = async (id) => {
        if (!window.confirm('Delete this promo message?')) return;

        try {
            const response = await fetch(`/api/promos/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            if (response.ok) {
                fetchPromos();
            }
        } catch (error) {
            console.error('Error deleting promo:', error);
        }
    };

    const handleTogglePromo = async (id) => {
        try {
            const response = await fetch(`/api/promos/${id}/toggle`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            if (response.ok) {
                fetchPromos();
            }
        } catch (error) {
            console.error('Error toggling promo:', error);
        }
    };

    return (
        <div className="admin-layout">
            <AdminSidebar activePage="promos" />

            <div className="admin-main">
                <div className="admin-page-header">
                    <div>
                        <h1 className="admin-page-title">Promo Bar Management</h1>
                        <p style={{ color: 'var(--admin-text-muted)', margin: '5px 0 0 0' }}>Manage messages displayed in the top bar of the website</p>
                    </div>
                </div>

                <div className="admin-card" style={{ marginBottom: '30px' }}>
                    <form onSubmit={handleAddPromo} style={{ display: 'flex', gap: '15px' }}>
                        <input
                            type="text"
                            className="admin-input"
                            placeholder="Type new promo message (e.g., 🚚 FREE SHIPPING on orders above ₹10,000)..."
                            value={newPromo}
                            onChange={(e) => setNewPromo(e.target.value)}
                            required
                        />
                        <button type="submit" className="admin-btn btn-primary" style={{ width: '150px' }}>
                            Add Promo
                        </button>
                    </form>
                </div>

                <div className="admin-card">
                    <div className="admin-table-container">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Promo Message</th>
                                    <th>Status</th>
                                    <th>Date Added</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan="4" style={{ textAlign: 'center' }}>Loading promos...</td></tr>
                                ) : promos.length === 0 ? (
                                    <tr><td colSpan="4" style={{ textAlign: 'center' }}>No promos found. Add one above!</td></tr>
                                ) : (
                                    promos.map((promo) => (
                                        <tr key={promo._id}>
                                            <td style={{ fontWeight: '500' }}>{promo.text}</td>
                                            <td>
                                                <span
                                                    className={`admin-badge ${promo.isActive ? 'badge-success' : 'badge-danger'}`}
                                                    onClick={() => handleTogglePromo(promo._id)}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    {promo.isActive ? 'Active' : 'Hidden'}
                                                </span>
                                            </td>
                                            <td style={{ color: 'var(--admin-text-muted)' }}>
                                                {new Date(promo.createdAt).toLocaleDateString()}
                                            </td>
                                            <td>
                                                <button
                                                    className="admin-btn btn-danger"
                                                    style={{ padding: '6px 12px', fontSize: '12px' }}
                                                    onClick={() => handleDeletePromo(promo._id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPromos;
