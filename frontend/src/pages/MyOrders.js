import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const MyOrders = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('/api/orders/myorders', {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                const data = await response.json();
                if (data.success) {
                    setOrders(data.orders);
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        if (user && user.token) {
            fetchOrders();
        }
    }, [user]);

    return (
        <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', minHeight: '60vh' }}>
            <h1 style={{ marginBottom: '30px', color: '#1a1f36', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px' }}>My Orders</h1>

            {orders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                    <h3>You haven't placed any orders yet.</h3>
                    <button
                        onClick={() => navigate('/shop')}
                        style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#1a1f36', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                    >
                        Start Shopping
                    </button>
                </div>
            ) : (
                <div style={{ display: 'grid', gap: '20px' }}>
                    {orders.map(order => (
                        <div key={order._id} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px', backgroundColor: 'white' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f0f0f0', paddingBottom: '15px', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
                                <div>
                                    <p style={{ margin: 0, color: '#718096', fontSize: '0.9rem' }}>ORDER PLACED</p>
                                    <p style={{ margin: '5px 0 0 0', fontWeight: 'bold' }}>{new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p style={{ margin: 0, color: '#718096', fontSize: '0.9rem' }}>TOTAL</p>
                                    <p style={{ margin: '5px 0 0 0', fontWeight: 'bold' }}>₹{order.totalAmount}</p>
                                </div>
                                <div>
                                    <p style={{ margin: 0, color: '#718096', fontSize: '0.9rem' }}>SHIP TO</p>
                                    <p style={{ margin: '5px 0 0 0', fontWeight: 'bold' }}>{order.shippingAddress?.fullName || user.name}</p>
                                </div>
                                <div>
                                    <p style={{ margin: 0, color: '#718096', fontSize: '0.9rem' }}>STATUS</p>
                                    <span style={{
                                        padding: '5px 10px',
                                        borderRadius: '15px',
                                        fontSize: '0.85rem',
                                        backgroundColor: order.orderStatus === 'Delivered' ? '#C6F6D5' : '#FEEBC8',
                                        color: order.orderStatus === 'Delivered' ? '#22543D' : '#744210',
                                        display: 'inline-block',
                                        marginTop: '5px'
                                    }}>
                                        {order.orderStatus}
                                    </span>
                                </div>
                                <div>
                                    <p style={{ margin: 0, color: '#718096', fontSize: '0.9rem' }}>ORDER # {order._id}</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                {order.items.map((item, index) => (
                                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                        <img
                                            src={item.image || 'https://via.placeholder.com/100'}
                                            alt={item.name}
                                            style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }}
                                        />
                                        <div>
                                            <h4 style={{ margin: '0 0 5px 0', color: '#2d3748' }}>{item.name}</h4>
                                            <p style={{ margin: 0, color: '#718096' }}>Qty: {item.quantity}</p>
                                            <p style={{ margin: '5px 0 0 0', fontWeight: 'bold' }}>₹{item.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrders;
