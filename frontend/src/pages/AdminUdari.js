import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AdminSidebar from '../components/AdminSidebar';
import '../Admin.css';

const AdminUdari = () => {
    const { user } = useAuth();
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('add_customer'); // add_customer, add_transaction, view_bill
    const [newTransaction, setNewTransaction] = useState({
        type: 'credit',
        amount: '',
        description: '',
        date: new Date().toISOString().split('T')[0]
    });
    const [newCustomer, setNewCustomer] = useState({
        customerName: '',
        customerPhone: '',
        notes: ''
    });

    useEffect(() => {
        fetchRecords();
    }, [user]);

    const fetchRecords = async () => {
        if (!user || !user.token) return;
        try {
            setLoading(true);
            const response = await fetch('/api/udari', {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const data = await response.json();
                if (Array.isArray(data)) {
                    setRecords(data);
                }
            } else {
                const text = await response.text();
                console.error('Fetch records failed. Non-JSON response:', text);
            }
        } catch (error) {
            console.error('Error fetching Udari records:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateCustomer = async (e) => {
        if (e && e.preventDefault) e.preventDefault();

        if (!user || !user.token) {
            alert('Your session has expired. Please login again.');
            return;
        }

        try {
            console.log('Sending request to create customer:', newCustomer);
            const response = await fetch('/api/udari', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify(newCustomer),
            });

            let data;
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
            } else {
                const text = await response.text();
                console.error('Server returned non-JSON:', text);
                throw new Error(`Server returned HTML/Text instead of JSON. This usually means the API route was not found. Raw response: ${text.substring(0, 100)}...`);
            }

            if (response.ok) {
                fetchRecords();
                setShowModal(false);
                setNewCustomer({ customerName: '', customerPhone: '', notes: '' });
                alert('Customer ledger created successfully!');
            } else {
                console.error('Server error:', data);
                alert(`Error: ${data.message || 'Failed to create customer ledger'}`);
            }
        } catch (error) {
            console.error('Network/Parsing error:', error);
            alert(`Error: ${error.message}. Please check if the backend server is running and the Udari route is correctly loaded.`);
        }
    };

    const handleAddTransaction = async (e) => {
        if (e && e.preventDefault) e.preventDefault();
        try {
            const response = await fetch(`/api/udari/${selectedRecord._id}/transactions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify(newTransaction),
            });

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const data = await response.json();
                if (response.ok) {
                    fetchRecords();
                    setShowModal(false);
                    setNewTransaction({
                        type: 'credit',
                        amount: '',
                        description: '',
                        date: new Date().toISOString().split('T')[0]
                    });
                    alert('Transaction added successfully!');
                } else {
                    alert(`Error: ${data.message || 'Failed to add transaction'}`);
                }
            } else {
                const text = await response.text();
                throw new Error(`Server returned non-JSON response. Raw: ${text.substring(0, 100)}`);
            }
        } catch (error) {
            console.error('Error adding transaction:', error);
            alert(`Network error: ${error.message}`);
        }
    };

    const handleDeleteRecord = async (id) => {
        if (window.confirm('Are you sure you want to delete this customer ledger?')) {
            try {
                const response = await fetch(`/api/udari/${id}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                if (response.ok) {
                    setRecords(records.filter(r => r._id !== id));
                    if (selectedRecord && selectedRecord._id === id) setSelectedRecord(null);
                }
            } catch (error) {
                console.error('Error deleting record:', error);
            }
        }
    };

    const filteredRecords = records.filter(record =>
        record.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.customerPhone.includes(searchTerm)
    );

    const totalUdari = records.reduce((acc, curr) => acc + curr.totalBalance, 0);

    return (
        <div className="admin-layout">
            <AdminSidebar activePage="udari" />

            <div className="admin-main">
                <div className="admin-page-header">
                    <div>
                        <h1 className="admin-page-title">Udari System (Ledger)</h1>
                        <p style={{ color: 'var(--admin-text-muted)', margin: '5px 0 0 0' }}>Manage customer credit and payment tracking</p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <div className="admin-card" style={{ padding: '10px 20px', marginBottom: 0, display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <span style={{ fontSize: '0.9rem', color: 'var(--admin-text-muted)' }}>Total Outstanding:</span>
                            <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--admin-danger)' }}>₹{totalUdari.toLocaleString()}</span>
                        </div>
                        <button className="admin-btn btn-primary" onClick={() => { setModalType('add_customer'); setShowModal(true); }}>
                            <span>➕</span> Add New Customer
                        </button>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem' }}>
                    {/* Left: Customer List */}
                    <div className="admin-card" style={{ height: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                        <div style={{ marginBottom: '15px' }}>
                            <input
                                type="text"
                                className="admin-input"
                                placeholder="Search customer..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="customer-list">
                            {filteredRecords.length > 0 ? (
                                filteredRecords.map(record => (
                                    <div
                                        key={record._id}
                                        className={`customer-item ${selectedRecord?._id === record._id ? 'active' : ''}`}
                                        onClick={() => setSelectedRecord(record)}
                                        style={{
                                            padding: '12px',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            marginBottom: '8px',
                                            border: '1px solid var(--admin-border)',
                                            transition: 'all 0.2s',
                                            background: selectedRecord?._id === record._id ? '#f0f4ff' : 'white',
                                            borderColor: selectedRecord?._id === record._id ? 'var(--admin-primary)' : 'var(--admin-border)'
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <div>
                                                <div style={{ fontWeight: '600' }}>{record.customerName}</div>
                                                <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>{record.customerPhone}</div>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <div style={{ fontWeight: 'bold', color: record.totalBalance > 0 ? 'var(--admin-danger)' : 'var(--admin-success)' }}>
                                                    ₹{record.totalBalance.toLocaleString()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p style={{ textAlign: 'center', color: 'var(--admin-text-muted)', marginTop: '20px' }}>No records found</p>
                            )}
                        </div>
                    </div>

                    {/* Right: Detailed View */}
                    <div className="admin-card" style={{ height: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                        {selectedRecord ? (
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--admin-border)', paddingBottom: '15px' }}>
                                    <div>
                                        <h2 style={{ margin: 0 }}>{selectedRecord.customerName}</h2>
                                        <p style={{ margin: '5px 0 0 0', color: 'var(--admin-text-muted)' }}>
                                            Phone: {selectedRecord.customerPhone} | Balance: ₹{selectedRecord.totalBalance.toLocaleString()}
                                        </p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button className="admin-btn btn-outline" onClick={() => { setModalType('add_transaction'); setShowModal(true); }}>
                                            <span>📝</span> Add Entry
                                        </button>
                                        <button className="admin-btn btn-danger" onClick={() => handleDeleteRecord(selectedRecord._id)}>
                                            <span>🗑️</span> Delete Ledger
                                        </button>
                                    </div>
                                </div>

                                <h3>Transaction History</h3>
                                <div className="admin-table-container">
                                    <table className="admin-table">
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Description</th>
                                                <th>Type</th>
                                                <th style={{ textAlign: 'right' }}>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedRecord.transactions.slice().sort((a, b) => new Date(b.date) - new Date(a.date)).map((t, idx) => (
                                                <tr key={idx}>
                                                    <td>{new Date(t.date).toLocaleDateString()}</td>
                                                    <td>{t.description}</td>
                                                    <td>
                                                        <span className={`admin-badge ${t.type === 'credit' ? 'badge-danger' : 'badge-success'}`}>
                                                            {t.type === 'credit' ? 'Debt (Udari)' : 'Payment'}
                                                        </span>
                                                    </td>
                                                    <td style={{ textAlign: 'right', fontWeight: '600' }}>
                                                        {t.type === 'credit' ? '+' : '-'} ₹{t.amount.toLocaleString()}
                                                    </td>
                                                </tr>
                                            ))}
                                            {selectedRecord.transactions.length === 0 && (
                                                <tr><td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>No transactions found</td></tr>
                                            )}
                                        </tbody>
                                        <tfoot>
                                            <tr style={{ fontWeight: 'bold', borderTop: '2px solid var(--admin-border)' }}>
                                                <td colSpan="3" style={{ textAlign: 'right' }}>Current Balance:</td>
                                                <td style={{ textAlign: 'right' }}>₹{selectedRecord.totalBalance.toLocaleString()}</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                                {selectedRecord.notes && (
                                    <div style={{ marginTop: '20px', padding: '15px', background: '#f9f9f9', borderRadius: '8px' }}>
                                        <strong>Notes:</strong>
                                        <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem' }}>{selectedRecord.notes}</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '100px 0', opacity: 0.5 }}>
                                <span style={{ fontSize: '4rem' }}>📒</span>
                                <h2>Select a customer to view ledger</h2>
                            </div>
                        )}
                    </div>
                </div>

                {/* Modal */}
                {showModal && (
                    <div className="modal-overlay" style={{
                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                    }}>
                        <div className="admin-card" style={{ width: '450px', position: 'relative' }}>
                            <button
                                onClick={() => setShowModal(false)}
                                style={{ position: 'absolute', right: '15px', top: '15px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
                            >✕</button>

                            {modalType === 'add_customer' ? (
                                <form onSubmit={handleCreateCustomer}>
                                    <h2>Add New Customer</h2>
                                    <div style={{ marginBottom: '15px' }}>
                                        <label>Customer Name</label>
                                        <input
                                            type="text" required className="admin-input"
                                            value={newCustomer.customerName}
                                            onChange={(e) => setNewCustomer({ ...newCustomer, customerName: e.target.value })}
                                        />
                                    </div>
                                    <div style={{ marginBottom: '15px' }}>
                                        <label>Phone Number</label>
                                        <input
                                            type="text" required className="admin-input"
                                            value={newCustomer.customerPhone}
                                            onChange={(e) => setNewCustomer({ ...newCustomer, customerPhone: e.target.value })}
                                        />
                                    </div>
                                    <div style={{ marginBottom: '20px' }}>
                                        <label>Initial Notes (Optional)</label>
                                        <textarea
                                            className="admin-input" rows="3"
                                            value={newCustomer.notes}
                                            onChange={(e) => setNewCustomer({ ...newCustomer, notes: e.target.value })}
                                        ></textarea>
                                    </div>
                                    <button
                                        type="button"
                                        className="admin-btn btn-primary"
                                        style={{ width: '100%', opacity: loading ? 0.7 : 1 }}
                                        disabled={loading}
                                        onClick={handleCreateCustomer}
                                    >
                                        {loading ? 'Creating...' : 'Create Ledger'}
                                    </button>
                                </form>
                            ) : (
                                <form onSubmit={handleAddTransaction}>
                                    <h2>Add Entry for {selectedRecord.customerName}</h2>
                                    <div style={{ marginBottom: '15px' }}>
                                        <label>Entry Type</label>
                                        <select
                                            className="admin-select"
                                            value={newTransaction.type}
                                            onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
                                        >
                                            <option value="credit">Debt (Purchased on credit)</option>
                                            <option value="payment">Payment (Received money)</option>
                                        </select>
                                    </div>
                                    <div style={{ marginBottom: '15px' }}>
                                        <label>Amount (₹)</label>
                                        <input
                                            type="number" required className="admin-input"
                                            value={newTransaction.amount}
                                            onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                                        />
                                    </div>
                                    <div style={{ marginBottom: '15px' }}>
                                        <label>Description</label>
                                        <input
                                            type="text" required className="admin-input" placeholder="e.g. Gold Ring purchase"
                                            value={newTransaction.description}
                                            onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                                        />
                                    </div>
                                    <div style={{ marginBottom: '20px' }}>
                                        <label>Date</label>
                                        <input
                                            type="date" className="admin-input"
                                            value={newTransaction.date}
                                            onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        className="admin-btn btn-primary"
                                        style={{ width: '100%', opacity: loading ? 0.7 : 1 }}
                                        disabled={loading}
                                        onClick={handleAddTransaction}
                                    >
                                        {loading ? 'Saving...' : 'Save Entry'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminUdari;
