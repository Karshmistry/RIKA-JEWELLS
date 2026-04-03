import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './Diamond.css';

const Diamond = () => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  // State for notification
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success"
  });
  
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // State variables
  const { category } = useParams();
  const [sortBy, setSortBy] = useState("featured");
  const [filterPrice, setFilterPrice] = useState([0, 1000000]);
  const [showFilter, setShowFilter] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(true);
  const [newArrivals, setNewArrivals] = useState(false);
  const [bestsellers, setBestsellers] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedCarat, setSelectedCarat] = useState([]);
  const [selectedCertification, setSelectedCertification] = useState([]);
  const [diamondCollections, setDiamondCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  // Diamond Rate State
  const [diamondRate, setDiamondRate] = useState(250000);
  const [calcData, setCalcData] = useState({
    carat: 1.0,
    clarity: "VS1",
    color: "G",
    cut: "Excellent",
    total: 250000
  });

  // Effect to update diamond rate
  useEffect(() => {
    const interval = setInterval(() => {
      setDiamondRate(prev => {
        const change = Math.random() > 0.5 ? 500 : -400;
        return Math.max(240000, Math.min(270000, prev + change));
      });
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();

        const diamondProducts = data.filter(p =>
          (p.category && p.category.toLowerCase() === 'diamond') ||
          (p.gemstone && p.gemstone.toLowerCase() === 'diamond') ||
          (p.name && p.name.toLowerCase().includes('diamond'))
        );

        const formattedProducts = diamondProducts.map(p => {
          let cat = p.jewelleryType ? p.jewelleryType.toLowerCase().replace(' ', '-') : 'rings';
          if (cat === 'ring') cat = 'rings';
          if (cat === 'bracelet') cat = 'bracelets';
          if (cat === 'earring') cat = 'earrings';
          if (cat === 'necklace') cat = 'necklaces';
          if (cat === 'bangle') cat = 'bangles';
          if (cat === 'nose-pin') cat = 'nose-pins';

          return {
            id: p._id,
            name: p.name,
            category: cat,
            price: p.price,
            originalPrice: p.originalPrice || p.price,
            discount: p.discount || 0,
            image: p.image ? (p.image.startsWith('/uploads') ? `${p.image}` : p.image) : 'https://via.placeholder.com/300',
            rating: p.rating || 4.5,
            reviews: p.numReviews || 0,
            description: p.description,
            inStock: p.countInStock > 0,
            isNew: p.isNew || false,
            isBestseller: p.isBestseller || false,
            isCertified: p.isHallmark || true,
            carat: "1.00",
            certification: "IGI",
            clarity: "VS1",
            color: "E"
          };
        });

        setDiamondCollections(formattedProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching diamond products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // UI Handlers
  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification(prev => ({ ...prev, show: false })), 3000);
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      quantity: 1,
      description: product.description,
      inStock: product.inStock,
      category: 'diamond'
    });
    showNotification(`${product.name} added to cart!`);
  };

  const handleBuyNow = (e, product) => {
    e.stopPropagation();
    handleAddToCart(e, product);
    navigate("/checkout");
  };

  const handleAddToWishlist = (e, product) => {
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      showNotification(`${product.name} removed from wishlist!`, "info");
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image
      });
      showNotification(`${product.name} added to wishlist!`, "success");
    }
  };

  const handleQuickView = (e, product) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handlePriceFilter = (min, max) => setFilterPrice([min, max]);

  const handleTypeToggle = (type) => {
    const formattedType = type.toLowerCase().replace(' ', '-').replace('necklaces', 'necklace').replace('rings', 'ring');
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleClearFilters = () => {
    setFilterPrice([0, 1000000]);
    setInStockOnly(true);
    setNewArrivals(false);
    setBestsellers(false);
    setSelectedTypes([]);
    setSelectedCarat([]);
    setSelectedCertification([]);
  };

  // Filter Logic
  const filteredProducts = diamondCollections.filter(product => {
    if (product.price < filterPrice[0] || product.price > filterPrice[1]) return false;
    if (inStockOnly && !product.inStock) return false;
    if (newArrivals && !product.isNew) return false;
    if (bestsellers && !product.isBestseller) return false;

    if (selectedTypes.length > 0) {
      const productType = product.category.replace('-', ' ').toLowerCase();
      const match = selectedTypes.some(t => {
        const typeL = t.toLowerCase();
        return typeL === productType || typeL === productType + 's' || typeL + 's' === productType || (typeL === 'nose pins' && productType === 'nose-pin');
      });
      if (!match) return false;
    }

    return true;
  });

  const getCategoryTitle = () => {
    if (selectedTypes.length === 1) return `Exquisite ${selectedTypes[0]}`;
    if (selectedTypes.length > 1) return "Curated Selection";
    return "Diamond Collection";
  };

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low": return a.price - b.price;
      case "price-high": return b.price - a.price;
      case "rating": return b.rating - a.rating;
      case "discount": return b.discount - a.discount;
      default: return 0;
    }
  });

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    return <span className="stars-gold">{"★".repeat(fullStars)}</span>;
  };

  const formatPrice = (price) => new Intl.NumberFormat('en-IN').format(price);

  return (
    <div className="diamond-page">
      {/* Notification Toast */}
      {notification.show && (
        <div className={`cart-notification ${notification.type}`}>
          {notification.message}
          <button className="notification-close" onClick={() => setNotification(prev => ({ ...prev, show: false }))}>✕</button>
        </div>
      )}

      {/* ===== HERO SECTION ===== */}
      <section className="diamond-hero">
        <div className="hero-overlay">
          <div className="diamond-hero-content">
            <span className="diamond-hero-tag">Exclusively at RIKA JEWELLS</span>
            <h1 className="diamond-hero-title">Icy Brilliance</h1>
            <p className="diamond-hero-subtitle">Discover the world's most exquisite certified diamonds</p>

            {/* In-Hero Rate Banner */}
            <div className="diamond-rate-banner">
              <div className="rate-card">
                <span className="rate-label">Current Market Value</span>
                <span className="rate-value">₹{(diamondRate / 100000).toFixed(2)}L</span>
                <span className="rate-trend positive">+1.2% ↑</span>
                <span className="rate-update">Last updated 5m ago</span>
              </div>
              <div className="rate-card">
                <span className="rate-label">IGI Certified Quality</span>
                <span className="rate-value">VVS1+</span>
                <span className="rate-trend positive">Stable</span>
                <span className="rate-update">Verified Collection</span>
              </div>
            </div>

            {/* <div className="diamond-hero-btns">
              <button className="diamond-btn-primary" onClick={() => document.getElementById('shop-section').scrollIntoView({ behavior: 'smooth' })}>Explore Collection</button>
              <button className="diamond-btn-outline" onClick={() => document.getElementById('guide-section').scrollIntoView({ behavior: 'smooth' })}>Diamond Guide</button>
            </div> */}
          </div>
        </div>
        <div className="diamond-hero-scroll">
          <span>Scroll to Discover</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* ===== TRUST BAR ===== */}
      <div className="diamond-trust-bar">
        <div className="container">
          <div className="trust-items">
            <div className="trust-item">
              <span className="trust-icon">💎</span>
              <div className="trust-text">
                <strong>Certified Diamonds</strong>
                <p>IGI & GIA Verified Quality</p>
              </div>
            </div>
            <div className="trust-item">
              <span className="trust-icon">🛡️</span>
              <div className="trust-text">
                <strong>Secure Shipping</strong>
                <p>Fully Insured Global Delivery</p>
              </div>
            </div>
            <div className="trust-item">
              <span className="trust-icon">🔄</span>
              <div className="trust-text">
                <strong>30-Day Returns</strong>
                <p>Hassle-free Exchange Policy</p>
              </div>
            </div>
            <div className="trust-item">
              <span className="trust-icon">✨</span>
              <div className="trust-text">
                <strong>Lifetime Warranty</strong>
                <p>Ensuring Lasting Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== CATEGORY SECTION ===== */}
      <section className="diamond-categories">
        <div className="container">
          <h2 className="diamond-section-title">Shop by Category</h2>
          <div className="diamond-category-tabs">
            <button
              className={`diamond-category-tab ${selectedTypes.length === 0 ? 'active' : ''}`}
              onClick={() => setSelectedTypes([])}
            >
              All Collections
            </button>
            {["Necklaces", "Earrings", "Bracelets", "Rings", "Mangalsutra", "Anklets"].map(type => (
              <button
                key={type}
                className={`diamond-category-tab ${selectedTypes.includes(type) ? 'active' : ''}`}
                onClick={() => handleTypeToggle(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MAIN SHOP SECTION ===== */}
      <section className="diamond-main" id="shop-section">
        <div className="container">
          <div className="diamond-content">
            {/* Sidebar Filters */}
            <aside className="diamond-filters-sidebar">
              <div className="diamond-filter-header">
                <h3>Refine Search</h3>
                <button className="diamond-close-filter">✕</button>
              </div>

              <div className="diamond-filter-section">
                <h4>Price Range</h4>
                <div className="diamond-price-inputs">
                  <div className="diamond-price-input">
                    <label>Min</label>
                    <input
                      type="number"
                      value={filterPrice[0]}
                      onChange={(e) => setFilterPrice([parseInt(e.target.value) || 0, filterPrice[1]])}
                    />
                  </div>
                  <div className="diamond-price-input">
                    <label>Max</label>
                    <input
                      type="number"
                      value={filterPrice[1]}
                      onChange={(e) => setFilterPrice([filterPrice[0], parseInt(e.target.value) || 1000000])}
                    />
                  </div>
                </div>
                <div className="diamond-price-quick-filters">
                  <button className="diamond-price-quick-btn" onClick={() => handlePriceFilter(0, 100000)}>Under ₹1 Lakh</button>
                  <button className="diamond-price-quick-btn" onClick={() => handlePriceFilter(100000, 500000)}>₹1L - ₹5L</button>
                  <button className="diamond-price-quick-btn" onClick={() => handlePriceFilter(500000, 2000000)}>Investment Grade</button>
                </div>
              </div>

              <div className="diamond-filter-section">
                <h4>Availability</h4>
                <label className="diamond-checkbox-label">
                  <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} />
                  In Stock Only
                </label>
                <label className="diamond-checkbox-label">
                  <input type="checkbox" checked={newArrivals} onChange={(e) => setNewArrivals(e.target.checked)} />
                  Limited Editions
                </label>
              </div>

              <button className="diamond-clear-filters-btn" onClick={handleClearFilters}>Reset Filters</button>
            </aside>

            {/* Products Grid */}
            <div className="diamond-products-section">
              <div className="diamond-products-header">
                <div className="diamond-products-info">
                  <h3>{getCategoryTitle()}</h3>
                  <span className="diamond-products-count">{sortedProducts.length} Premium Pieces</span>
                </div>
                <div className="diamond-sort-dropdown">
                  <label>Sort By:</label>
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="featured">Exclusive</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>
              </div>

              {loading ? (
                <div className="loading-state">Curating the finest selection...</div>
              ) : (
                <div className="products-grid">
                  {sortedProducts.map(product => (
                    <div key={product.id} className="diamond-product-card" onClick={(e) => handleQuickView(e, product)}>
                      <div className="diamond-product-image">
                        <div className="diamond-product-badges">
                          {product.isNew && <span className="diamond-badge new">New</span>}
                          {product.isBestseller && <span className="diamond-badge luxury">Bestseller</span>}
                        </div>
                        <div className="diamond-float-actions">
                          <button
                            className="float-btn view"
                            onClick={(e) => handleQuickView(e, product)}
                          >
                            👁️
                          </button>
                          <button
                            className={`float-btn wishlist ${isInWishlist(product.id) ? 'active' : ''}`}
                            onClick={(e) => handleAddToWishlist(e, product)}
                          >
                            {isInWishlist(product.id) ? '❤️' : '🤍'}
                          </button>
                        </div>
                        <img src={product.image} alt={product.name} />
                      </div>
                      <div className="diamond-product-info">
                        <h4 className="diamond-product-name">{product.name}</h4>
                        <div className="diamond-specs-badges">
                          <span className="spec-badge">1.0ct</span>
                          <span className="spec-badge">IGI</span>
                          <span className="spec-badge">VVS</span>
                        </div>
                        <p className="diamond-product-description">{product.description}</p>

                        <div className="diamond-price-section">
                          <span className="diamond-current-price">₹{formatPrice(product.price)}</span>
                          {product.discount > 0 && (
                            <span className="diamond-original-price">₹{formatPrice(product.originalPrice)}</span>
                          )}
                        </div>

                        <div className={`diamond-stock-status ${product.inStock ? 'in-stock' : 'out-stock'}`}>
                          {product.inStock ? '• Available for Instant Delivery' : '• Secure Pre-order Available'}
                        </div>

                        <div className="diamond-product-actions-row">
                          <button className="diamond-add-to-cart-btn" onClick={(e) => handleAddToCart(e, product)}>CART</button>
                          <button className="diamond-buy-now-btn" onClick={(e) => handleBuyNow(e, product)}>BUY NOW</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* QUICK VIEW MODAL */}
      {quickViewProduct && (
        <div className="quickview-overlay" onClick={() => setQuickViewProduct(null)}>
          <div className="quickview-modal" onClick={(e) => e.stopPropagation()}>
            <button className="quickview-close" onClick={() => setQuickViewProduct(null)}>✕</button>
            <div className="quickview-content">
              <div className="quickview-image">
                <img src={quickViewProduct.image} alt={quickViewProduct.name} />
              </div>
              <div className="quickview-details">
                <h2>{quickViewProduct.name}</h2>
                <div className="diamond-rating-row" style={{marginBottom: '15px'}}>
                  <span className="stars-gold">
                    {"★".repeat(Math.floor(quickViewProduct.rating || 4))}
                  </span>
                  <span className="rating-score" style={{fontWeight: 700, marginLeft: 5}}>{quickViewProduct.rating || "4.8"}</span>
                  <span className="review-count" style={{color: '#999', marginLeft: 5}}>({quickViewProduct.reviews || "150"} reviews)</span>
                </div>
                <p className="quickview-price" style={{fontSize: '1.8rem', fontWeight: 800, margin: '15px 0'}}>₹{formatPrice(quickViewProduct.price)}</p>
                <div className="quickview-desc" style={{marginBottom: 20}}>
                  {quickViewProduct.description}
                </div>
                
                <div className="quickview-specs" style={{marginBottom: 20}}>
                  <div className="spec-row" style={{display: 'flex', justifyContent: 'space-between', marginBottom: 10}}>
                    <span className="spec-label" style={{color: '#666'}}>Category: </span>
                    <span className="spec-value" style={{fontWeight: 600}}>{quickViewProduct.category}</span>
                  </div>
                  {quickViewProduct.carat && (
                    <div className="spec-row" style={{display: 'flex', justifyContent: 'space-between', marginBottom: 10}}>
                      <span className="spec-label" style={{color: '#666'}}>Carat: </span>
                      <span className="spec-value" style={{fontWeight: 600}}>{quickViewProduct.carat} ct</span>
                    </div>
                  )}
                </div>

                <div className="quickview-actions">
                  <button 
                    className="diamond-add-to-cart-btn" 
                    onClick={(e) => { handleAddToCart(e, quickViewProduct); setQuickViewProduct(null); }}
                    disabled={!quickViewProduct.inStock}
                    style={{width: '100%', padding: "15px", borderRadius: "0", background: "#f8f9fa", border: "1px solid #1a1a1a", color: "#1a1a1a", fontWeight: "bold", cursor: "pointer"}}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== DIAMOND GUIDE & CALCULATOR ===== */}
      <section className="diamond-guide" id="guide-section">
        <div className="container">
          <h2 className="diamond-section-title">The Diamond Mastery</h2>
          <div className="diamond-guide-grid">
            <div className="diamond-guide-card">
              <span className="diamond-guide-icon">💎</span>
              <h3>The 4 C's</h3>
              <p>Learn how Carat, Cut, Clarity, and Color define the ultimate value and fire of your diamond.</p>
            </div>
            <div className="diamond-guide-card">
              <span className="diamond-guide-icon">📏</span>
              <h3>Sizing Expert</h3>
              <p>Our comprehensive guide helps you find the perfect fit for rings and bracelets with precision.</p>
            </div>
            <div className="diamond-guide-card">
              <span className="diamond-guide-icon">📋</span>
              <h3>Certification</h3>
              <p>Understanding IGI and GIA grading reports to ensure your investment is fully authenticated.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CALCULATOR SECTION ===== */}
      <section className="diamond-calculator-section">
        <div className="container">
          <div className="diamond-calc-card">
            <div className="diamond-calc-header">
              <h2>Value Estimator</h2>
              <p>Calculate the approximate market value for your custom diamond selection</p>
            </div>
            <div className="diamond-calc-grid">
              <div className="diamond-calc-inputs">
                <div className="diamond-calc-input-group">
                  <label>Carat Weight</label>
                  <input
                    type="number"
                    step="0.01"
                    value={calcData.carat}
                    onChange={(e) => setCalcData({ ...calcData, carat: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div className="diamond-calc-input-group">
                  <label>Clarity Grade</label>
                  <select
                    value={calcData.clarity}
                    onChange={(e) => setCalcData({ ...calcData, clarity: e.target.value })}
                  >
                    <option value="IF">IF (Internally Flawless)</option>
                    <option value="VVS1">VVS1 / VVS2</option>
                    <option value="VS1">VS1 / VS2</option>
                    <option value="SI1">SI1</option>
                  </select>
                </div>
                <div className="diamond-calc-input-group">
                  <label>Color Grade</label>
                  <select
                    value={calcData.color}
                    onChange={(e) => setCalcData({ ...calcData, color: e.target.value })}
                  >
                    <option value="D">D (Colorless)</option>
                    <option value="E">E - F</option>
                    <option value="G">G - H</option>
                  </select>
                </div>
                <div className="diamond-calc-input-group">
                  <label>Cut Quality</label>
                  <select
                    value={calcData.cut}
                    onChange={(e) => setCalcData({ ...calcData, cut: e.target.value })}
                  >
                    <option value="Excellent">Excellent</option>
                    <option value="Very Good">Very Good</option>
                    <option value="Good">Good</option>
                  </select>
                </div>
              </div>
              <div className="diamond-calc-result">
                <span className="result-label">Estimated Value</span>
                <span className="result-price">₹{formatPrice(Math.round(diamondRate * calcData.carat * (calcData.clarity === "IF" ? 1.5 : 1.1)))}*</span>
                <p className="result-disclaimer">*Market rates are subject to daily change and verification.</p>
                <button className="diamond-btn-primary" onClick={() => navigate('/contact')}>Get Expert Quote</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== REFINED FOOTER ===== */}
      <footer className="footer-professional">
        <div className="container">
          <div className="footer-top">
            <div className="footer-logo">RIKA JEWELLS</div>
            <div className="footer-links">
              <span>Collection</span>
              <span>Bespoke</span>
              <span>Contact</span>
              <span>Privilege Club</span>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 RIKA JEWELLS. All Rights Reserved. Crafted for Perfection.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Diamond;
