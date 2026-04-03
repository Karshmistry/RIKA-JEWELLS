import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './Collections.css'; // Reuse collections styling

function Search() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    const [quickViewProduct, setQuickViewProduct] = useState(null);

    // Get query from URL
    const search = useLocation().search;
    const query = new URLSearchParams(search).get('q') || '';

    useEffect(() => {
        const fetchSearchResults = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/products?keyword=${encodeURIComponent(query)}`);
                if (!response.ok) throw new Error('Failed to fetch results');
                const data = await response.json();
                setProducts(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        if (query) {
            fetchSearchResults();
        } else {
            setLoading(false);
            setProducts([]);
        }
    }, [query]);

    const handleAddToCart = (product) => {
        addToCart({
            id: product._id,
            name: product.name,
            price: product.price,
            image: product.image ? (product.image.startsWith('/uploads') ? `${product.image}` : product.image) : 'https://via.placeholder.com/300',
            quantity: 1
        });
        showNotification(`${product.name} added to cart!`);
    };

    const handleQuickView = (e, product) => {
        e.stopPropagation();
        setQuickViewProduct(product);
    };

    // Dummy notification if needed, or import it
    const showNotification = (msg) => { alert(msg); };

    return (
        <div className="collections-page">
            <div className="collections-hero" style={{ minHeight: '30vh' }}>
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h1 className="hero-title">Search Results</h1>
                    <p className="hero-subtitle">
                        Showing results for "{query}"
                    </p>
                </div>
            </div>

            <div className="collections-container">
                <div className="collections-main" style={{ width: '100%', padding: '40px 0' }}>
                    {loading ? (
                        <div className="loading-state" style={{ textAlign: 'center', padding: '100px' }}>
                            <div className="spinner"></div>
                            <p>Searching for your perfect piece...</p>
                        </div>
                    ) : error ? (
                        <div className="error-state" style={{ textAlign: 'center', padding: '100px', color: 'red' }}>
                            <p>Error: {error}</p>
                        </div>
                    ) : products.length > 0 ? (
                        <div className="collections-grid">
                            {products.map(item => (
                                <div key={item._id} className="product-card-container">
                                    <div className="product-card" onClick={(e) => handleQuickView(e, item)}>
                                        <div className="product-image-wrapper">
                                            <img
                                                src={item.image ? (item.image.startsWith('/uploads') ? `${item.image}` : item.image) : 'https://via.placeholder.com/300'}
                                                alt={item.name}
                                                className="product-image"
                                            />
                                            {item.discount > 0 && <span className="discount-badge">-{item.discount}%</span>}
                                        </div>
                                        <div className="product-details">
                                            <h3 className="product-name">{item.name}</h3>
                                            <p className="product-category">{item.category}</p>
                                            <div className="product-pricing">
                                                <span className="current-price">₹{item.price.toLocaleString()}</span>
                                                {item.originalPrice > item.price && (
                                                    <span className="original-price">₹{item.originalPrice.toLocaleString()}</span>
                                                )}
                                            </div>
                                            <div className="collections-button-group">
                                                <button
                                                    className="add-to-cart-btn"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleAddToCart(item);
                                                    }}
                                                >
                                                    CART
                                                </button>
                                                <button
                                                    className="buy-now-btn"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleAddToCart(item);
                                                        navigate('/cart');
                                                    }}
                                                >
                                                    BUY NOW
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-results" style={{ textAlign: 'center', padding: '100px' }}>
                            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🔍</div>
                            <h3>No matches found</h3>
                            <p>We couldn't find any products matching "{query}".</p>
                            <p>Try searching for gold, rings, necklaces, or diamonds.</p>
                            <button
                                className="shop-now-btn"
                                style={{ marginTop: '20px', padding: '10px 30px', background: '#0d47a1', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                                onClick={() => navigate('/collections')}
                            >
                                Browse All Collections
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* QUICK VIEW MODAL */}
            {quickViewProduct && (
                <div className="quickview-overlay" onClick={() => setQuickViewProduct(null)} style={{zIndex: 3000}}>
                    <div className="quickview-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="quickview-close" onClick={() => setQuickViewProduct(null)}>✕</button>
                        <div className="quickview-content">
                            <div className="quickview-image">
                                <img src={quickViewProduct.image ? (quickViewProduct.image.startsWith('/uploads') ? `${quickViewProduct.image}` : quickViewProduct.image) : 'https://via.placeholder.com/300'} alt={quickViewProduct.name} />
                            </div>
                            <div className="quickview-details">
                                <h2>{quickViewProduct.name}</h2>
                                <h3 style={{color: '#666', textTransform: 'uppercase', fontSize: '0.9rem', marginBottom: '15px'}}>{quickViewProduct.category}</h3>
                                
                                <p className="quickview-price" style={{fontSize: '1.8rem', fontWeight: 800, margin: '15px 0'}}>
                                    ₹{quickViewProduct.price.toLocaleString()}
                                </p>
                                
                                <div className="quickview-desc" style={{marginBottom: 20}}>
                                    {quickViewProduct.description || "A beautiful piece for your collection."}
                                </div>

                                <div className="quickview-actions">
                                    <button 
                                        onClick={(e) => { handleAddToCart(quickViewProduct); setQuickViewProduct(null); }}
                                        style={{width: '100%', padding: "15px", borderRadius: "0", background: "var(--wedding-dark, #1a1a1a)", color: "var(--wedding-primary, #ffffff)", border: "none", cursor: "pointer", fontWeight: 700, textTransform: "uppercase"}}
                                    >
                                        ADD TO CART
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Search;
