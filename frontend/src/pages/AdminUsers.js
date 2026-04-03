import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import '../Admin.css';

const AdminUsers = () => {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/admin/users', {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                if (!response.ok) {
                    if (response.status === 401) throw new Error('Unauthorized: Please login again');
                    if (response.status === 403) throw new Error('Access Denied: Admin privileges required');
                    throw new Error(`Failed to fetch users: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                setUsers(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching users:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        if (user && user.token) {
            fetchUsers();
        } else {
            setLoading(false);
        }
    }, [user]);

    const filteredUsers = users.filter(u => {
        const name = u.name || '';
        const email = u.email || '';
        return name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            email.toLowerCase().includes(searchTerm.toLowerCase());
    });

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'var(--admin-bg)' }}>
                <h2>Loading Users...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-danger)' }}>
                <h2>Error: {error}</h2>
            </div>
        );
    }

    return (
        <div className="admin-layout">
            <AdminSidebar activePage="users" />

            <div className="admin-main">
                <div className="admin-page-header">
                    <div>
                        <h1 className="admin-page-title">User Management</h1>
                        <p style={{ color: 'var(--admin-text-muted)', margin: '5px 0 0 0' }}>Manage customer accounts and administrative access</p>
                    </div>
                </div>

                <div className="admin-card">
                    <div style={{ marginBottom: '20px', position: 'relative' }}>
                        <input
                            type="text"
                            className="admin-input"
                            placeholder="Search by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ paddingLeft: '40px' }}
                        />
                        <span style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>🔍</span>
                    </div>

                    <div className="admin-table-container">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Phone</th>
                                    <th>Joined Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map(u => (
                                    <tr key={u._id}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#6366f1', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.8rem' }}>
                                                    {u.name ? u.name.charAt(0).toUpperCase() : '?'}
                                                </div>
                                                <div style={{ fontWeight: '600' }}>{u.name || 'Unnamed User'}</div>
                                            </div>
                                        </td>
                                        <td>{u.email}</td>
                                        <td>
                                            <span className={`admin-badge ${u.role === 'admin' ? 'badge-danger' : 'badge-info'}`}>
                                                {u.role === 'admin' ? 'Admin' : 'Customer'}
                                            </span>
                                        </td>
                                        <td>{u.phone || 'N/A'}</td>
                                        <td style={{ color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>
                                            {u.createdAt ? new Date(u.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A'}
                                        </td>
                                        <td>
                                            <button className="admin-btn btn-outline" style={{ padding: '4px 8px', fontSize: '0.75rem' }}>
                                                Manage
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredUsers.length === 0 && (
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: 'var(--admin-text-muted)' }}>
                                            No users found.
                                            <div style={{ marginTop: '10px', fontSize: '0.8rem', opacity: 0.5 }}>
                                                Debug: Raw users count: {users.length}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Temp Debug Section */}
                <div className="admin-card" style={{ marginTop: '20px', background: '#f8fafc' }}>
                    <h4 style={{ margin: '0 0 10px 0', fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>Frontend Debug Console</h4>
                    <div style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>
                        <div>API URL: /api/admin/users</div>
                        <div>Fetch Count: {users.length}</div>
                        <div>Filter Count: {filteredUsers.length}</div>
                        <div>User Object Present: {user ? 'Yes' : 'No'}</div>
                        <div>Token Present: {user?.token ? 'Yes' : 'No'}</div>
                        {error && <div style={{ color: 'red' }}>Error: {error}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminUsers;
