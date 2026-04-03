import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Silver.css";
import { CartContext } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const Silver = () => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();

  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [filterPrice, setFilterPrice] = useState([0, 50000]);
  const [showFilter, setShowFilter] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(true);
  const [newArrivals, setNewArrivals] = useState(false);
  const [bestsellers, setBestsellers] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedFinishes, setSelectedFinishes] = useState([]);
  const [loading, setLoading] = useState(false);

  // State for notification
  const [notification, setNotification] = useState({ show: false, message: "", type: "success" });

  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [silverCollections, setSilverCollections] = useState([]);
  const [silverRate, setSilverRate] = useState(98);
  const [calcData, setCalcData] = useState({ weight: 10, purity: 0.925, total: 980 });

  useEffect(() => {
    const purityFactor = calcData.purity;
    setCalcData(prev => ({ ...prev, total: (calcData.weight * silverRate * (purityFactor / 0.925)).toFixed(2) }));
  }, [calcData.weight, calcData.purity, silverRate]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/products');
        const data = await response.json();

        // Filter for Silver products
        const silverProducts = data.filter(p =>
          (p.category && p.category.toLowerCase() === 'silver') ||
          (p.material && p.material.toLowerCase() === 'silver') ||
          (p.name && p.name.toLowerCase().includes('silver'))
        );

        const formattedProducts = silverProducts.map(p => {
          // Normalize category
          let cat = p.jewelleryType ? p.jewelleryType.toLowerCase().replace(' ', '-') : 'necklaces';
          // Fix singular/plural mismatch
          if (cat === 'necklace') cat = 'necklaces';
          if (cat === 'ring') cat = 'rings';
          if (cat === 'earring') cat = 'earrings';
          if (cat === 'bangle') cat = 'bangles';
          if (cat === 'bracelet') cat = 'bracelets';
          if (cat === 'anklet') cat = 'anklets';
          if (cat === 'toe-ring') cat = 'toe-rings';

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
            isHandmade: p.isHandmade || false,
            type: p.type || "Traditional",
            finish: p.finish || "Polished"
          };
        });

        setSilverCollections(formattedProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching silver products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Show notification function
  const showNotification = (message, type = "success") => {
    setNotification({
      show: true,
      message,
      type
    });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  const categories = [
    { id: "all", name: "All Collections", count: silverCollections.length },
    { id: "necklaces", name: "Necklaces", count: silverCollections.filter(item => item.category === "necklaces").length },
    { id: "earrings", name: "Earrings", count: silverCollections.filter(item => item.category === "earrings").length },
    { id: "bracelets", name: "Bracelets", count: silverCollections.filter(item => item.category === "bracelets").length },
    { id: "rings", name: "Rings", count: silverCollections.filter(item => item.category === "rings").length },
    { id: "mangalsutra", name: "Mangalsutra", count: silverCollections.filter(item => item.category === "mangalsutra").length },
    { id: "anklets", name: "Anklets", count: silverCollections.filter(item => item.category === "anklets").length }
  ];

  const sortOptions = [
    { id: "featured", name: "Featured" },
    { id: "newest", name: "Newest First" },
    { id: "price-low", name: "Price: Low to High" },
    { id: "price-high", name: "Price: High to Low" },
    { id: "rating", name: "Highest Rated" },
    { id: "discount", name: "Best Discount" }
  ];

  const priceRanges = [
    { label: "Under ₹1k", min: 0, max: 999 },
    { label: "₹1k-3k", min: 1000, max: 2999 },
    { label: "₹3k-5k", min: 3000, max: 4999 },
    { label: "₹5k-10k", min: 5000, max: 9999 },
    { label: "Above ₹10k", min: 10000, max: 50000 }
  ];

  const jewelleryTypes = ["Diamond", "Gemstone", "Tribal", "Filigree", "Statement", "Traditional", "Minimalist"];
  const finishes = ["Polished", "Matte", "Oxidized", "High Polish", "Antique"];

  // Filter products
  const filteredProducts = silverCollections.filter(product => {
    // Category filter
    if (activeTab !== "all" && product.category !== activeTab) return false;

    // Price filter
    if (product.price < filterPrice[0] || product.price > filterPrice[1]) return false;

    // Availability filters
    if (inStockOnly && !product.inStock) return false;
    if (newArrivals && !product.isNew) return false;
    if (bestsellers && !product.isBestseller) return false;

    // Type filter
    if (selectedTypes.length > 0 && !selectedTypes.includes(product.type)) return false;

    // Finish filter
    if (selectedFinishes.length > 0 && !selectedFinishes.includes(product.finish)) return false;

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "discount":
        return b.discount - a.discount;
      default:
        return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0) || b.rating - a.rating;
    }
  });

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      discount: product.discount,
      image: product.image,
      quantity: 1,
      description: product.description,
      inStock: product.inStock,
      category: 'silver'
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

  const handlePriceFilter = (min, max) => {
    setFilterPrice([min, max]);
  };

  const handleTypeToggle = (type) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleFinishToggle = (finish) => {
    setSelectedFinishes(prev =>
      prev.includes(finish)
        ? prev.filter(f => f !== finish)
        : [...prev, finish]
    );
  };

  const handleApplyFilters = () => {
    setShowFilter(false);
  };

  const handleClearFilters = () => {
    setFilterPrice([0, 50000]);
    setInStockOnly(true);
    setNewArrivals(false);
    setBestsellers(false);
    setSelectedTypes([]);
    setSelectedFinishes([]);
    setActiveTab("all");
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <>
        {"★".repeat(fullStars)}
        {hasHalfStar && "⭐"}
        {"☆".repeat(emptyStars)}
      </>
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };

  const getCategoryName = (category) => {
    const categoryMap = {
      necklaces: "Necklace",
      earrings: "Earrings",
      bracelets: "Bracelet",
      rings: "Ring",
      mangalsutra: "Mangalsutra",
      anklets: "Anklet",
      "nose-pins": "Nose Pin",
      pendants: "Pendant",
      bangles: "Bangles",
      "toe-rings": "Toe Rings"
    };
    return categoryMap[category] || category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="silver-page">
      {/* Notification Toast */}
      {notification.show && (
        <div className={`cart-notification ${notification.type}`}>
          {notification.message}
          <button
            className="notification-close"
            onClick={() => setNotification(prev => ({ ...prev, show: false }))}
          >
            ✕
          </button>
        </div>
      )}

      {/* ===== HERO SECTION ===== */}
      <div className="silver-hero">
        <div className="hero-overlay">
          <div className="silver-hero-content">
            <div className="silver-hero-tag">Exclusively at RIKA JEWELLS</div>
            <h1 className="silver-hero-title">Sterling Silver <br />Masterpieces</h1>
            <p className="silver-hero-subtitle">925 Certified | Handcrafted | Timeless Elegance</p>

            <div className="silver-rate-banner">
              <div className="rate-card">
                <span className="rate-label">Silver Rate (925)</span>
                <span className="rate-value">₹98</span>
                <span className="rate-update">Live • per gram</span>
              </div>
              <div className="rate-card">
                <span className="rate-label">Daily Trend</span>
                <span className="rate-trend positive">
                  ↑ +₹2 (+1.1%)
                </span>
                <span className="rate-update">Purity Guaranteed</span>
              </div>
              <div className="rate-card">
                <span className="rate-label">Purity Grade</span>
                <span className="rate-value">92.5%</span>
                <span className="rate-update">International Standard</span>
              </div>
            </div>

            {/* <div className="silver-hero-btns">
              <button className="silver-btn-primary" onClick={() => document.querySelector('.silver-main').scrollIntoView({ behavior: 'smooth' })}>
                Explore Collection
              </button>
              <button className="silver-btn-outline" onClick={() => navigate("/contact")}>
                Book Consultation
              </button>
            </div> */}
          </div>
        </div>
        <div className="silver-hero-scroll">
          <span>Scroll to Explore</span>
          <div className="scroll-line"></div>
        </div>
      </div>

      {/* ===== TRUST BAR ===== */}
      <section className="silver-trust-bar">
        <div className="container">
          <div className="trust-items">
            <div className="trust-item">
              <span className="trust-icon">🛡️</span>
              <div className="trust-text">
                <strong>925 Hallmarked</strong>
                <p>Ensured Silver Purity</p>
              </div>
            </div>
            <div className="trust-item">
              <span className="trust-icon">🔄</span>
              <div className="trust-text">
                <strong>Easy Returns</strong>
                <p>30-day return policy</p>
              </div>
            </div>
            <div className="trust-item">
              <span className="trust-icon">📦</span>
              <div className="trust-text">
                <strong>Secure Shipping</strong>
                <p>Fully insured delivery</p>
              </div>
            </div>
            <div className="trust-item">
              <span className="trust-icon">💎</span>
              <div className="trust-text">
                <strong>Expert Polish</strong>
                <p>Free lifetime cleaning</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Tabs */}
      <section className="silver-categories">
        <div className="container">
          <h2 className="silver-section-title">Shop by Category</h2>
          <div className="silver-category-tabs">
            {categories.map(category => (
              <button
                key={category.id}
                className={`silver-category-tab ${activeTab === category.id ? 'active' : ''}`}
                onClick={() => setActiveTab(category.id)}
              >
                <span className="silver-tab-name">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="silver-main">
        <div className="container">
          <div className="silver-content">
            {/* Filters Sidebar */}
            <aside className={`silver-filters-sidebar ${showFilter ? 'show' : ''}`}>
              <div className="silver-filter-header">
                <h3>Filters</h3>
                <button className="silver-close-filter" onClick={() => setShowFilter(false)}>✕</button>
              </div>

              <div className="silver-filter-section">
                <h4>Price Range</h4>
                <div className="silver-price-filter">
                  <div className="silver-price-inputs">
                    <div className="silver-price-input">
                      <label>Min (₹)</label>
                      <input
                        type="number"
                        value={filterPrice[0]}
                        onChange={(e) => setFilterPrice([parseInt(e.target.value) || 0, filterPrice[1]])}
                        min="0"
                      />
                    </div>
                    <div className="silver-price-input">
                      <label>Max (₹)</label>
                      <input
                        type="number"
                        value={filterPrice[1]}
                        onChange={(e) => setFilterPrice([filterPrice[0], parseInt(e.target.value) || 50000])}
                        min={filterPrice[0]}
                      />
                    </div>
                  </div>
                  <div className="silver-price-quick-filters">
                    {priceRanges.map((range, index) => (
                      <button
                        key={index}
                        className={`silver-price-quick-btn ${filterPrice[0] === range.min && filterPrice[1] === range.max ? 'active' : ''
                          }`}
                        onClick={() => handlePriceFilter(range.min, range.max)}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="silver-filter-section">
                <h4>Availability</h4>
                <div className="silver-availability-filter">
                  <label className="silver-checkbox-label">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                    />
                    <span>In Stock Only</span>
                  </label>
                  <label className="silver-checkbox-label">
                    <input
                      type="checkbox"
                      checked={newArrivals}
                      onChange={(e) => setNewArrivals(e.target.checked)}
                    />
                    <span>New Arrivals</span>
                  </label>
                  <label className="silver-checkbox-label">
                    <input
                      type="checkbox"
                      checked={bestsellers}
                      onChange={(e) => setBestsellers(e.target.checked)}
                    />
                    <span>Bestsellers</span>
                  </label>
                </div>
              </div>

              <div className="silver-filter-section">
                <h4>Jewellery Type</h4>
                <div className="silver-type-filter">
                  {jewelleryTypes.map(type => (
                    <label key={type} className="silver-checkbox-label">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
                        onChange={() => handleTypeToggle(type)}
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="silver-filter-section">
                <h4>Finish</h4>
                <div className="silver-finish-filter">
                  {finishes.map(finish => (
                    <label key={finish} className="silver-checkbox-label">
                      <input
                        type="checkbox"
                        checked={selectedFinishes.includes(finish)}
                        onChange={() => handleFinishToggle(finish)}
                      />
                      <span>{finish}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button className="silver-apply-filters-btn" onClick={handleApplyFilters}>
                Apply Filters
              </button>
              <button className="silver-clear-filters-btn" onClick={handleClearFilters}>
                Clear All
              </button>
            </aside>

            {/* Products Grid */}
            <div className="silver-products-section">
              <div className="silver-products-header">
                <div className="silver-products-info">
                  <h3>Silver Collection</h3>
                  <p className="silver-products-count">
                    {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'} found
                  </p>
                </div>
                <div className="silver-products-controls">
                  <button className="silver-filter-toggle" onClick={() => setShowFilter(!showFilter)}>
                    <span>☰</span> Filters
                  </button>
                  <div className="silver-sort-dropdown">
                    <label htmlFor="sort-select">Sort by: </label>
                    <select
                      id="sort-select"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      {sortOptions.map(option => (
                        <option key={option.id} value={option.id}>{option.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {loading ? (
                <div className="loading">Loading products...</div>
              ) : (
                <div className="silver-products-grid">
                  {sortedProducts.map(product => (
                    <div
                      key={product.id}
                      className="silver-product-card"
                      onClick={(e) => handleQuickView(e, product)}
                    >
                      <div className="silver-product-badges">
                        {product.isNew && <span className="silver-badge new">NEW</span>}
                        {product.discount > 0 && (
                          <span className="silver-badge discount">{product.discount}% OFF</span>
                        )}
                        {product.isBestseller && <span className="silver-badge bestseller">BESTSELLER</span>}
                        {product.isHandmade && <span className="silver-badge handmade">HANDMADE</span>}
                        {!product.inStock && <span className="silver-badge out-of-stock">OUT OF STOCK</span>}
                      </div>

                      <div className="silver-product-image">
                        <img src={product.image} alt={product.name} />
                        <div className="silver-product-actions">
                          <button
                            className="silver-action-btn"
                            onClick={(e) => handleQuickView(e, product)}
                            title="Quick View"
                            aria-label="Quick view"
                          >
                            👁️
                          </button>
                          <button
                            className={`silver-action-btn ${isInWishlist(product.id) ? 'active' : ''}`}
                            onClick={(e) => handleAddToWishlist(e, product)}
                            title="Add to Wishlist"
                            aria-label="Add to wishlist"
                          >
                            {isInWishlist(product.id) ? '❤️' : '🤍'}
                          </button>
                        </div>
                      </div>

                      <div className="silver-product-info">
                        <h4 className="silver-product-name">{product.name}</h4>
                        <p className="silver-product-description">{product.description}</p>

                        <div className="silver-product-rating">
                          <span className="silver-stars" aria-label={`Rating: ${product.rating} out of 5`}>
                            {renderStars(product.rating)}
                          </span>
                          <span className="silver-rating-value">{product.rating}</span>
                          <span className="silver-reviews">({product.reviews} reviews)</span>
                        </div>

                        <div className="silver-product-price">
                          <span className="silver-current-price">₹{formatPrice(product.price)}</span>
                          {product.originalPrice > product.price && (
                            <span className="silver-original-price">₹{formatPrice(product.originalPrice)}</span>
                          )}
                        </div>

                        <div className="silver-product-meta">
                          <div className="silver-specs-badges">
                            {product.finish && <span className="spec-badge">{product.finish}</span>}
                            <span className="spec-badge">925 Silver</span>
                          </div>
                          <span className={`silver-stock-status ${product.inStock ? 'in-stock' : 'out-stock'}`}>
                            {product.inStock ? "● In Stock" : "○ Out of Stock"}
                          </span>
                        </div>

                        <div className="silver-button-group">
                          <button
                            className={`silver-add-to-cart-btn ${!product.inStock ? 'disabled' : ''}`}
                            onClick={(e) => handleAddToCart(e, product)}
                            disabled={!product.inStock}
                          >
                            CART
                          </button>
                          <button
                            className={`silver-buy-now-btn ${!product.inStock ? 'disabled' : ''}`}
                            onClick={(e) => { e.stopPropagation(); handleBuyNow(e, product); }}
                            disabled={!product.inStock}
                          >
                            BUY NOW
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {sortedProducts.length === 0 && !loading && (
                <div className="silver-no-products">
                  <h3>No products found</h3>
                  <p>Try adjusting your filters or browse other categories</p>
                  <button onClick={handleClearFilters}>View All Products</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SILVER CALCULATOR ===== */}
      <section className="silver-calculator-section">
        <div className="container">
          <div className="silver-calc-card">
            <div className="silver-calc-header">
              <h2>Silver Value Estimator</h2>
              <p>Check the current market value of your sterling silver</p>
            </div>
            <div className="silver-calc-grid">
              <div className="silver-calc-inputs">
                <div className="silver-calc-input-group">
                  <label>Weight (Grams)</label>
                  <input
                    type="number"
                    value={calcData.weight}
                    onChange={(e) => setCalcData({ ...calcData, weight: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div className="silver-calc-input-group">
                  <label>Purity</label>
                  <select
                    value={calcData.purity}
                    onChange={(e) => setCalcData({ ...calcData, purity: parseFloat(e.target.value) })}
                  >
                    <option value={0.925}>Sterling Silver (92.5%)</option>
                    <option value={0.999}>Fine Silver (99.9%)</option>
                    <option value={0.900}>Coin Silver (90.0%)</option>
                  </select>
                </div>
              </div>
              <div className="silver-calc-result">
                <div className="result-label">Estimated Value</div>
                <div className="result-price">₹{parseFloat(calcData.total).toLocaleString('en-IN')}</div>
                <p className="result-disclaimer">*Based on live rate of ₹{silverRate}/g</p>
              </div>
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
                <div className="silver-product-rating" style={{marginBottom: '15px'}}>
                  <span className="silver-stars">
                    {renderStars(quickViewProduct.rating)}
                  </span>
                  <span className="silver-rating-value">{quickViewProduct.rating}</span>
                  <span className="silver-reviews">({quickViewProduct.reviews} reviews)</span>
                </div>
                <p className="quickview-price">₹{formatPrice(quickViewProduct.price)}</p>
                <div className="quickview-desc">
                  {quickViewProduct.description}
                </div>
                
                <div className="quickview-specs">
                  <div className="spec-row">
                    <span className="spec-label">Material: </span>
                    <span className="spec-value">925 Sterling Silver</span>
                  </div>
                  {quickViewProduct.finish && (
                    <div className="spec-row">
                      <span className="spec-label">Finish: </span>
                      <span className="spec-value">{quickViewProduct.finish}</span>
                    </div>
                  )}
                  {quickViewProduct.type && (
                    <div className="spec-row">
                      <span className="spec-label">Style: </span>
                      <span className="spec-value">{quickViewProduct.type}</span>
                    </div>
                  )}
                </div>

                <div className="quickview-actions">
                  <button 
                    className="silver-add-to-cart-btn" 
                    onClick={(e) => { handleAddToCart(e, quickViewProduct); setQuickViewProduct(null); }}
                    disabled={!quickViewProduct.inStock}
                    style={{flex: 1}}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== FOOTER ===== */}
      <footer className="footer-professional">
        <div className="container">
          <div className="footer-top">
            <div className="footer-logo">RIKA JEWELLS</div>
            <div className="footer-links">
              <span onClick={() => navigate("/about")}>About</span>
              <span onClick={() => navigate("/contact")}>Contact</span>
              <span onClick={() => navigate("/terms")}>Terms</span>
              <span onClick={() => navigate("/privacy")}>Privacy</span>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Rika Jewells. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Silver;