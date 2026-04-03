import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AdminSidebar from '../components/AdminSidebar';
import '../Admin.css';

const AdminContacts = () => {
    const { user } = useAuth();
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterType, setFilterType] = useState('all');

    const fetchContacts = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/contacts', {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch contact inquiries');
            }
            
            const data = await response.json();
            setContacts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user && user.token) {
            fetchContacts();
        }
    }, [user]);

    const handleStatusChange = async (id, newStatus) => {
        try {
            const response = await fetch(`/api/contacts/${id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) {
                throw new Error('Failed to update status');
            }

            // Update local state
            setContacts(contacts.map(contact => 
                contact._id === id ? { ...contact, status: newStatus } : contact
            ));
        } catch (err) {
            alert(err.message);
        }
    };

    const filteredContacts = contacts.filter(contact => {
        if (filterType === 'all') return true;
        return contact.type === filterType;
    });

    const getStatusColor = (status) => {
        switch(status) {
            case 'new': return '#ffd700'; // Gold warning
            case 'in-progress': return '#2196F3'; // Blue info
            case 'resolved': return '#4CAF50'; // Green success
            case 'cancelled': return '#f44336'; // Red danger
            default: return '#ccc';
        }
    };

    return (
        <div className="admin-layout">
            <AdminSidebar activePage="contacts" />

            <div className="admin-main">
                <div className="admin-page-header">
                    <h1 className="admin-page-title">Inquiries & Appointments</h1>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <select 
                            className="admin-select"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                        >
                            <option value="all">All Submissions</option>
                            <option value="contact">Contact Forms</option>
                            <option value="appointment">Appointments</option>
                        </select>
                        <button className="admin-btn btn-outline" onClick={fetchContacts}>
                            Refresh 🔄
                        </button>
                    </div>
                </div>

                {error && <div className="admin-error">{error}</div>}

                <div className="admin-card">
                    {loading ? (
                        <p style={{ textAlign: 'center', padding: '2rem' }}>Loading data...</p>
                    ) : filteredContacts.length === 0 ? (
                        <p style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>No inquiries or appointments found.</p>
                    ) : (
                        <div className="admin-table-container">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Date Submitted</th>
                                        <th>Type</th>
                                        <th>Client Details</th>
                                        <th>Submission Info</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredContacts.map(contact => (
                                        <tr key={contact._id}>
                                            <td style={{ fontSize: '0.85rem' }}>
                                                {new Date(contact.createdAt).toLocaleDateString()}<br/>
                                                <span style={{ color: '#888' }}>{new Date(contact.createdAt).toLocaleTimeString()}</span>
                                            </td>
                                            <td>
                                                <span style={{
                                                    padding: '4px 8px',
                                                    borderRadius: '4px',
                                                    fontSize: '0.75rem',
                                                    fontWeight: 'bold',
                                                    textTransform: 'uppercase',
                                                    backgroundColor: contact.type === 'appointment' ? '#e1bee7' : '#e3f2fd',
                                                    color: contact.type === 'appointment' ? '#6a1b9a' : '#1565c0'
                                                }}>
                                                    {contact.type}
                                                </span>
                                            </td>
                                            <td>
                                                <div style={{ fontWeight: '600' }}>{contact.name}</div>
                                                <div style={{ fontSize: '0.8rem', color: '#555' }}>📞 {contact.phone}</div>
                                                {contact.email && <div style={{ fontSize: '0.8rem', color: '#555' }}>✉️ {contact.email}</div>}
                                                <div style={{ fontSize: '0.75rem', color: '#888', marginTop: '4px' }}>
                                                    Prefers: {contact.preferredContact}
                                                </div>
                                            </td>
                                            <td>
                                                {contact.type === 'appointment' ? (
                                                    <div style={{ backgroundColor: '#f9f9f9', padding: '8px', borderRadius: '4px' }}>
                                                        <div style={{ fontSize: '0.85rem' }}><strong>Store:</strong> {contact.storeLocation}</div>
                                                        <div style={{ fontSize: '0.85rem', color: '#c5a044' }}>
                                                            <strong>Date:</strong> {new Date(contact.appointmentDate).toLocaleString()}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div style={{ maxWidth: '250px' }}>
                                                        <div style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>{contact.subject}</div>
                                                        <div style={{ fontSize: '0.8rem', color: '#666', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={contact.message}>
                                                            {contact.message}
                                                        </div>
                                                    </div>
                                                )}
                                            </td>
                                            <td>
                                                <select 
                                                    value={contact.status}
                                                    onChange={(e) => handleStatusChange(contact._id, e.target.value)}
                                                    style={{
                                                        padding: '6px',
                                                        borderRadius: '4px',
                                                        border: `1px solid ${getStatusColor(contact.status)}`,
                                                        backgroundColor: 'transparent',
                                                        color: getStatusColor(contact.status),
                                                        fontWeight: 'bold'
                                                    }}
                                                >
                                                    <option value="new">🆕 New</option>
                                                    <option value="in-progress">⏳ In Progress</option>
                                                    <option value="resolved">✅ Resolved</option>
                                                    <option value="cancelled">❌ Cancelled</option>
                                                </select>
                                            </td>
                                            <td>
                                                <button 
                                                    className="admin-btn btn-outline" 
                                                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                                                    onClick={() => alert(contact.type === 'contact' ? `Message: ${contact.message}` : `Appointment details: Store: ${contact.storeLocation}`)}
                                                >
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminContacts;
