import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminSidebar from '../components/AdminSidebar';
import '../Admin.css';

const AdminProductEdit = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');

    // New fields for detailed product info
    const [material, setMaterial] = useState('');
    const [purity, setPurity] = useState('');
    const [jewelleryType, setJewelleryType] = useState('');
    const [gemstone, setGemstone] = useState('');
    const [occasion, setOccasion] = useState('');
    const [weight, setWeight] = useState('');
    const [delivery, setDelivery] = useState('5-7 days');

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [uploading, setUploading] = useState(false);

    const categories = ['Gold', 'Silver', 'Platinum', 'Diamond', 'Gemstone', 'Wedding', 'Gift'];

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${user.token} `,
                },
            };

            const { data } = await axios.post('/api/upload', formData, config);

            setImage(data);
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
            alert('Image upload failed');
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/products/${id}`);
                const data = await response.json();

                if (response.ok) {
                    setName(data.name);
                    setPrice(data.price);
                    setImage(data.image);
                    setBrand(data.brand);
                    setCategory(data.category);
                    setCountInStock(data.countInStock);
                    setDescription(data.description);

                    // Set new fields
                    setMaterial(data.material || '');
                    setPurity(data.purity || '');
                    setJewelleryType(data.jewelleryType || '');
                    setGemstone(data.gemstone || '');
                    setOccasion(data.occasion || '');
                    setWeight(data.weight || '');
                    setDelivery(data.delivery || '5-7 days');
                } else {
                    setError(data.message);
                }
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    name, price, image, brand, category, countInStock, description,
                    material, purity, jewelleryType, gemstone, occasion, weight, delivery
                }),
            });

            const data = await response.json();

            if (response.ok) {
                navigate('/admin/products');
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) return <div className="admin-layout" style={{ justifyContent: 'center', alignItems: 'center' }}><h2>Loading...</h2></div>;
    if (error) return <div className="admin-layout" style={{ justifyContent: 'center', alignItems: 'center' }}>Error: {error}</div>;

    return (
        <div className="admin-layout">
            <AdminSidebar activePage="products" />

            <div className="admin-main">
                <div className="admin-page-header">
                    <div>
                        <Link to="/admin/products" style={{ textDecoration: 'none', color: 'var(--admin-accent)', fontSize: '0.9rem', fontWeight: '600' }}>
                            &larr; Back to Products
                        </Link>
                        <h1 className="admin-page-title" style={{ marginTop: '10px' }}>Edit Product</h1>
                    </div>
                    <button onClick={submitHandler} className="admin-btn btn-primary">
                        Save Changes
                    </button>
                </div>

                {error && <div style={{ padding: '1rem', background: '#fee2e2', color: '#991b1b', borderRadius: '8px', marginBottom: '1.5rem' }}>{error}</div>}

                <div className="admin-card">
                    <form onSubmit={submitHandler}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
                            {/* Basic Info Section */}
                            <div>
                                <h3 style={{ borderBottom: '1px solid var(--admin-border)', paddingBottom: '10px', marginBottom: '20px' }}>Basic Information</h3>

                                <div className="admin-form-group">
                                    <label className="admin-label">Product Name</label>
                                    <input type="text" className="admin-input" value={name} onChange={(e) => setName(e.target.value)} required />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div className="admin-form-group">
                                        <label className="admin-label">Price (₹)</label>
                                        <input type="number" className="admin-input" value={price} onChange={(e) => setPrice(e.target.value)} required />
                                    </div>
                                    <div className="admin-form-group">
                                        <label className="admin-label">Stock Status</label>
                                        <input type="number" className="admin-input" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} required />
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div className="admin-form-group">
                                        <label className="admin-label">Category</label>
                                        <select className="admin-select" value={category} onChange={(e) => setCategory(e.target.value)} required>
                                            <option value="">Select Category</option>
                                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                        </select>
                                    </div>
                                    <div className="admin-form-group">
                                        <label className="admin-label">Brand</label>
                                        <input type="text" className="admin-input" value={brand} onChange={(e) => setBrand(e.target.value)} required />
                                    </div>
                                </div>

                                <div className="admin-form-group">
                                    <label className="admin-label">Product Image</label>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <input type="text" className="admin-input" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL" style={{ flex: 1 }} />
                                        <div style={{ position: 'relative' }}>
                                            <input type="file" id="image-file" onChange={uploadFileHandler} style={{ display: 'none' }} />
                                            <label htmlFor="image-file" className="admin-btn btn-outline" style={{ whiteSpace: 'nowrap' }}>
                                                {uploading ? '...' : 'Upload 📁'}
                                            </label>
                                        </div>
                                    </div>
                                    {image && (
                                        <div style={{ marginTop: '10px' }}>
                                            <img src={image.startsWith('/uploads') ? `${image}` : image} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--admin-border)' }} />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Details Section */}
                            <div>
                                <h3 style={{ borderBottom: '1px solid var(--admin-border)', paddingBottom: '10px', marginBottom: '20px' }}>Product Specifications</h3>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div className="admin-form-group">
                                        <label className="admin-label">Material</label>
                                        <input type="text" className="admin-input" value={material} onChange={(e) => setMaterial(e.target.value)} placeholder="e.g. Gold, Silver" />
                                    </div>
                                    <div className="admin-form-group">
                                        <label className="admin-label">Purity</label>
                                        <input type="text" className="admin-input" value={purity} onChange={(e) => setPurity(e.target.value)} placeholder="e.g. 22K, 18K" />
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div className="admin-form-group">
                                        <label className="admin-label">Jewellery Type</label>
                                        <input type="text" className="admin-input" value={jewelleryType} onChange={(e) => setJewelleryType(e.target.value)} placeholder="e.g. Ring, Necklace" />
                                    </div>
                                    <div className="admin-form-group">
                                        <label className="admin-label">Gemstone</label>
                                        <input type="text" className="admin-input" value={gemstone} onChange={(e) => setGemstone(e.target.value)} placeholder="e.g. Diamond, Ruby" />
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div className="admin-form-group">
                                        <label className="admin-label">Occasion</label>
                                        <input type="text" className="admin-input" value={occasion} onChange={(e) => setOccasion(e.target.value)} placeholder="e.g. Wedding, Party" />
                                    </div>
                                    <div className="admin-form-group">
                                        <label className="admin-label">Weight</label>
                                        <input type="text" className="admin-input" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g. 5.5g" />
                                    </div>
                                </div>

                                <div className="admin-form-group">
                                    <label className="admin-label">Delivery Estimate</label>
                                    <input type="text" className="admin-input" value={delivery} onChange={(e) => setDelivery(e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div className="admin-form-group" style={{ marginTop: '1rem' }}>
                            <label className="admin-label">Description</label>
                            <textarea className="admin-textarea" value={description} onChange={(e) => setDescription(e.target.value)} rows="5" required></textarea>
                        </div>

                        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                            <button type="button" onClick={() => navigate('/admin/products')} className="admin-btn btn-outline" style={{ minWidth: '150px' }}>
                                Cancel
                            </button>
                            <button type="submit" className="admin-btn btn-primary" style={{ minWidth: '150px' }}>
                                Update Product
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminProductEdit;
