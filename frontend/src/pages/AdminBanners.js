import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import AdminSidebar from '../components/AdminSidebar';
import '../Admin.css';

const AdminBanners = () => {
    const { user } = useAuth();
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    // New banner form state
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [description, setDescription] = useState('');

    const fetchBanners = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/banners/admin', {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            const data = await response.json();
            if (Array.isArray(data)) {
                setBanners(data);
            } else {
                setBanners([]);
            }
        } catch (error) {
            console.error('Error fetching banners:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user && user.token) {
            fetchBanners();
        }
    }, [user]);

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${user.token}`,
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

    const handleAddBanner = async (e) => {
        e.preventDefault();
        if (!image) {
            alert('Please upload an image first');
            return;
        }

        try {
            const response = await fetch('/api/banners', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({ image, title, subtitle, description }),
            });

            if (response.ok) {
                setImage('');
                setTitle('');
                setSubtitle('');
                setDescription('');
                alert('Banner added successfully!');
                fetchBanners();
            } else {
                alert('Failed to add banner');
            }
        } catch (error) {
            console.error('Error adding banner:', error);
        }
    };

    const handleDeleteBanner = async (id) => {
        if (!window.confirm('Delete this banner?')) return;

        try {
            const response = await fetch(`/api/banners/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            if (response.ok) {
                fetchBanners();
            }
        } catch (error) {
            console.error('Error deleting banner:', error);
        }
    };

    const handleToggleBanner = async (id) => {
        try {
            const response = await fetch(`/api/banners/${id}/toggle`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            if (response.ok) {
                fetchBanners();
            }
        } catch (error) {
            console.error('Error toggling banner:', error);
        }
    };

    return (
        <div className="admin-layout">
            <AdminSidebar activePage="banners" />

            <div className="admin-main">
                <div className="admin-page-header">
                    <div>
                        <h1 className="admin-page-title">Home Hero Banners</h1>
                        <p style={{ color: 'var(--admin-text-muted)', margin: '5px 0 0 0' }}>Manage the rotating images on the home page hero section</p>
                    </div>
                </div>

                <div className="admin-card" style={{ marginBottom: '30px' }}>
                    <h3 style={{ marginBottom: '20px' }}>Add New Banner</h3>
                    <form onSubmit={handleAddBanner}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="admin-form-group">
                                <label className="admin-label">Banner Image</label>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <input type="text" className="admin-input" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL or upload..." style={{ flex: 1 }} />
                                    <div style={{ position: 'relative' }}>
                                        <input type="file" id="banner-upload" onChange={uploadFileHandler} style={{ display: 'none' }} />
                                        <label htmlFor="banner-upload" className="admin-btn btn-outline" style={{ whiteSpace: 'nowrap' }}>
                                            {uploading ? '...' : 'Upload 📁'}
                                        </label>
                                    </div>
                                </div>
                                {image && (
                                    <div style={{ marginTop: '10px' }}>
                                        <img src={image.startsWith('/uploads') ? `${image}` : image} alt="Preview" style={{ width: '200px', height: '100px', objectFit: 'cover', borderRadius: '4px' }} />
                                    </div>
                                )}
                            </div>
                            <div>
                                <div className="admin-form-group">
                                    <label className="admin-label">Title (Optional)</label>
                                    <input type="text" className="admin-input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Timeless Artistry" />
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-label">Subtitle (Optional)</label>
                                    <input type="text" className="admin-input" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder="e.g. Modern Elegance" />
                                </div>
                            </div>
                        </div>
                        <div className="admin-form-group">
                            <label className="admin-label">Description (Optional)</label>
                            <textarea className="admin-textarea" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short description for the hero section..." rows="2"></textarea>
                        </div>
                        <button type="submit" className="admin-btn btn-primary" style={{ width: '200px' }}>
                            Add Banner
                        </button>
                    </form>
                </div>

                <div className="admin-card">
                    <h3>Existing Banners</h3>
                    <div className="admin-table-container">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Preview</th>
                                    <th>Content</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan="4" style={{ textAlign: 'center' }}>Loading banners...</td></tr>
                                ) : banners.length === 0 ? (
                                    <tr><td colSpan="4" style={{ textAlign: 'center' }}>No banners found. Add one above!</td></tr>
                                ) : (
                                    banners.map((banner) => (
                                        <tr key={banner._id}>
                                            <td>
                                                <img src={banner.image.startsWith('/uploads') ? `${banner.image}` : banner.image} alt="Banner" style={{ width: '120px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                                            </td>
                                            <td>
                                                <div style={{ fontWeight: '600' }}>{banner.title || 'No Title'}</div>
                                                <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>{banner.subtitle || 'No Subtitle'}</div>
                                            </td>
                                            <td>
                                                <span
                                                    className={`admin-badge ${banner.isActive ? 'badge-success' : 'badge-danger'}`}
                                                    onClick={() => handleToggleBanner(banner._id)}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    {banner.isActive ? 'Active' : 'Hidden'}
                                                </span>
                                            </td>
                                            <td>
                                                <button
                                                    className="admin-btn btn-danger"
                                                    style={{ padding: '6px 12px', fontSize: '12px' }}
                                                    onClick={() => handleDeleteBanner(banner._id)}
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

export default AdminBanners;
