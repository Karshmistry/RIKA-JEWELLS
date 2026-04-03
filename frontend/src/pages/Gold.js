import React, { useContext, useState, useEffect } from "react";
import "./Gold.css";
import { CartContext } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";

function Gold() {
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();

  // State variables
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [goldRate, setGoldRate] = useState(6500);
  const [loading, setLoading] = useState(true);
  const [goldCollections, setGoldCollections] = useState([]);
  const [notification, setNotification] = useState({ show: false, message: "", type: "success" });
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Filter states
  const [filterPrice, setFilterPrice] = useState([0, 1000000]);
  const [showFilter, setShowFilter] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(true);
  const [newArrivals, setNewArrivals] = useState(false);
  const [bestsellers, setBestsellers] = useState(false);
  const [selectedPurity, setSelectedPurity] = useState([]);

  const [calculatorData, setCalculatorData] = useState({
    weight: 10,
    purity: "24",
    calculatedValue: 65000
  });

  // Simulate live gold rate updates
  useEffect(() => {
    const interval = setInterval(() => {
      setGoldRate(prevRate => {
        const change = Math.random() > 0.5 ? 100 : -80;
        return Math.max(6200, Math.min(6800, prevRate + change));
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Update calculator when goldRate changes or inputs change
  useEffect(() => {
    const purityMultiplier = {
      "24": 1,
      "22": 0.916,
      "18": 0.75
    };
    const value = Math.round(goldRate * calculatorData.weight * purityMultiplier[calculatorData.purity]);
    setCalculatorData(prev => ({ ...prev, calculatedValue: value }));
  }, [goldRate, calculatorData.weight, calculatorData.purity]);


  // Fetch Products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/products');
        const data = await response.json();

        // Filter for Gold products
        const goldProducts = data.filter(p =>
          (p.category && p.category.toLowerCase() === 'gold') ||
          (p.material && p.material.toLowerCase() === 'gold') ||
          (p.name && p.name.toLowerCase().includes('gold'))
        );

        const formattedProducts = goldProducts.map(p => {
          // Normalize category for tabs
          let cat = p.jewelleryType ? p.jewelleryType.toLowerCase().trim() : 'jewellery';
          // Handle singular/plural
          if (cat === 'necklace') cat = 'necklaces';
          if (cat === 'ring') cat = 'rings';
          if (cat === 'earring') cat = 'earrings';
          if (cat === 'bangle') cat = 'bangles';
          if (cat === 'bracelet') cat = 'bracelets';
          if (cat === 'chain') cat = 'chains';
          if (cat === 'coin') cat = 'coins';

          return {
            id: p._id,
            name: p.name,
            category: cat,
            price: p.price,
            originalPrice: p.originalPrice || p.price,
            discount: p.discount || 0,
            image: p.image ? (p.image.startsWith('/uploads') ? `${p.image}` : p.image) : 'https://via.placeholder.com/300',
            rating: p.rating || 4.8,
            reviews: p.numReviews || 0,
            description: p.description,
            weight: p.weight || "10g",
            purity: p.purity || "22K",
            inStock: p.countInStock > 0,
            isNew: p.isNew || false,
            isBestseller: p.isBestseller || false,
            hallmark: p.isHallmark || true,
            emi: true,
            type: p.type || "Traditional"
          };
        });

        setGoldCollections(formattedProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching gold products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Helper to show notification
  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ ...notification, show: false }), 3000);
  };

  // Categories for Tabs
  const categories = [
    { id: "all", name: "All Gold", count: goldCollections.length },
    { id: "necklaces", name: "Necklaces", count: goldCollections.filter(item => item.category === "necklaces").length },
    { id: "chains", name: "Chains", count: goldCollections.filter(item => item.category === "chains").length },
    { id: "bangles", name: "Bangles", count: goldCollections.filter(item => item.category === "bangles").length },
    { id: "earrings", name: "Earrings", count: goldCollections.filter(item => item.category === "earrings").length },
    { id: "rings", name: "Rings", count: goldCollections.filter(item => item.category === "rings").length },
    { id: "coins", name: "Gold Coins", count: goldCollections.filter(item => item.category === "coins").length }
  ];

  const sortOptions = [
    { id: "default", name: "Recommended" },
    { id: "price-low", name: "Price: Low to High" },
    { id: "price-high", name: "Price: High to Low" },
    { id: "rating", name: "Highest Rated" },
    { id: "discount", name: "Best Discount" }
  ];

  const priceRanges = [
    { label: "Under ₹50k", min: 0, max: 49999 },
    { label: "₹50k-1 Lakh", min: 50000, max: 99999 },
    { label: "₹1 Lakh-3 Lakhs", min: 100000, max: 299999 },
    { label: "Above ₹3 Lakhs", min: 300000, max: 5000000 }
  ];

  const purityOptions = ["24K", "22K", "18K"];

  // Filter products
  const filteredProducts = goldCollections.filter(product => {
    // Category/Tab filter
    if (activeTab !== "all" && product.category !== activeTab) {
      return false;
    }

    // Price filter
    if (product.price < filterPrice[0] || product.price > filterPrice[1]) return false;

    // Availability
    if (inStockOnly && !product.inStock) return false;
    if (newArrivals && !product.isNew) return false;
    if (bestsellers && !product.isBestseller) return false;

    // Purity filter
    if (selectedPurity.length > 0 && !selectedPurity.includes(product.purity)) return false;

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low": return a.price - b.price;
      case "price-high": return b.price - a.price;
      case "rating": return b.rating - a.rating;
      case "discount": return b.discount - a.discount;
      default: return 0;
    }
  });

  const handleAddToCart = (e, item) => {
    e.stopPropagation();
    const cartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.image,
      quantity: 1,
      weight: item.weight,
      purity: item.purity,
      category: item.category
    };

    addToCart(cartItem);
    showNotification(`${item.name} added to cart!`);
  };

  const handleBuyNow = (e, item) => {
    e.stopPropagation();
    handleAddToCart(e, item);
    navigate("/checkout");
  };

  const handleQuickView = (e, product) => {
    e.stopPropagation();
    setQuickViewProduct(product);
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

  const handlePurityToggle = (purity) => {
    setSelectedPurity(prev =>
      prev.includes(purity)
        ? prev.filter(p => p !== purity)
        : [...prev, purity]
    );
  };

  const handleClearFilters = () => {
    setFilterPrice([0, 1000000]);
    setInStockOnly(true);
    setNewArrivals(false);
    setBestsellers(false);
    setSelectedPurity([]);
    setActiveTab("all");
  };

  const handleCalculateValue = () => {
    // Redundant call as useEffect handles it, but kept for explicit button click if needed
    const purityMultiplier = {
      "24": 1,
      "22": 0.916,
      "18": 0.75
    };
    const value = Math.round(goldRate * calculatorData.weight * purityMultiplier[calculatorData.purity]);
    setCalculatorData(prev => ({ ...prev, calculatedValue: value }));
  };


  return (
    <div className="gold-page">
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
      <div className="gold-hero">
        <div className="hero-overlay">
          <div className="gold-hero-content">
            <div className="gold-hero-tag">Exclusively at RIKA JEWELLS</div>
            <h1 className="gold-hero-title">The Aura of <br />Purest Gold</h1>
            <p className="gold-hero-subtitle">Bis Hallmarked 22K & 24K Masterpieces</p>

            <div className="gold-rate-banner">
              <div className="rate-card">
                <span className="rate-label">24K Gold Rate</span>
                <span className="rate-value">₹{goldRate.toLocaleString()}</span>
                <span className="rate-update">Live • per gram</span>
              </div>
              <div className="rate-card">
                <span className="rate-label">Daily Change</span>
                <span className="rate-trend positive">
                  ↑ +₹120 (+1.8%)
                </span>
                <span className="rate-update">Global Market Trend</span>
              </div>
              <div className="rate-card">
                <span className="rate-label">Purity Grade</span>
                <span className="rate-value">99.9%</span>
                <span className="rate-update">Investment Standard</span>
              </div>
            </div>

            {/* <div className="gold-hero-btns">
              <button className="gold-btn-primary" onClick={() => document.querySelector('.gold-main').scrollIntoView({ behavior: 'smooth' })}>
                Shop Collection
              </button>
              <button className="gold-btn-outline" onClick={() => navigate("/contact")}>
                Book Consultation
              </button>
            </div> */}
          </div>
        </div>
        <div className="gold-hero-scroll">
          {/* <span>Scroll to Explore</span> */}
          <div className="scroll-line"></div>
        </div>
      </div>

      {/* ===== TRUST BAR ===== */}
      <section className="gold-trust-bar">
        <div className="container">
          <div className="trust-items">
            <div className="trust-item">
              <span className="trust-icon">🛡️</span>
              <div className="trust-text">
                <strong>BIS Hallmarked</strong>
                <p>100% Certified Purity</p>
              </div>
            </div>
            <div className="trust-item">
              <span className="trust-icon">🔄</span>
              <div className="trust-text">
                <strong>Easy Exchange</strong>
                <p>Lifetime buyback policy</p>
              </div>
            </div>
            <div className="trust-item">
              <span className="trust-icon">🚚</span>
              <div className="trust-text">
                <strong>Insured Delivery</strong>
                <p>Secure doorstep shipping</p>
              </div>
            </div>
            <div className="trust-item">
              <span className="trust-icon">✨</span>
              <div className="trust-text">
                <strong>Free Maintenance</strong>
                <p>Yearly polishing service</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Tabs */}
      <section className="gold-categories">
        <div className="container">
          <h2 className="gold-section-title">Shop by Category</h2>
          <div className="gold-category-tabs">
            {categories.map((category, index) => (
              <button
                key={category.id}
                className={`gold-category-tab ${activeTab === category.id ? 'active' : ''}`}
                onClick={() => setActiveTab(category.id)}
                style={{ "--i": index }}
              >
                <span className="gold-tab-name">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <section className="gold-main">
        <div className="container">
          <div className="gold-content">
            {/* Filters Sidebar */}
            <aside className={`gold-filters-sidebar ${showFilter ? 'show' : ''}`}>
              <div className="gold-filter-header">
                <h3>Filters</h3>
                <button className="gold-close-filter" onClick={() => setShowFilter(false)}>✕</button>
              </div>

              <div className="gold-filter-section">
                <h4>Price Range</h4>
                <div className="gold-price-quick-filters">
                  {priceRanges.map((range, index) => (
                    <button
                      key={index}
                      className={`gold-price-quick-btn ${filterPrice[0] === range.min && filterPrice[1] === range.max ? 'active' : ''}`}
                      onClick={() => setFilterPrice([range.min, range.max])}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="gold-filter-section">
                <h4>Availability</h4>
                <div className="gold-checkbox-group">
                  <label className="gold-checkbox-label">
                    <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} />
                    <span>In Stock Only</span>
                  </label>
                  <label className="gold-checkbox-label">
                    <input type="checkbox" checked={newArrivals} onChange={(e) => setNewArrivals(e.target.checked)} />
                    <span>New Arrivals</span>
                  </label>
                </div>
              </div>

              <div className="gold-filter-section">
                <h4>Purity</h4>
                <div className="gold-checkbox-group">
                  {purityOptions.map(purity => (
                    <label key={purity} className="gold-checkbox-label">
                      <input
                        type="checkbox"
                        checked={selectedPurity.includes(purity)}
                        onChange={() => handlePurityToggle(purity)}
                      />
                      <span>{purity}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button className="gold-clear-filters-btn" onClick={handleClearFilters}>Clear All</button>
            </aside>

            {/* Products Grid */}
            <div className="gold-products-section">
              <div className="gold-products-header">
                <div className="gold-products-info">
                  <h3>Our Collection</h3>
                  <p className="gold-products-count">{sortedProducts.length} items found</p>
                </div>
                <div className="gold-products-controls">
                  <button className="gold-filter-toggle" onClick={() => setShowFilter(!showFilter)}>
                    ☰ Filters
                  </button>
                  <div className="gold-sort-dropdown">
                    <label>Sort By:</label>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                      {sortOptions.map(opt => (
                        <option key={opt.id} value={opt.id}>{opt.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {loading ? (
                <div className="loading">Loading products...</div>
              ) : (
                <div className="products-grid">
                  {sortedProducts.map((item, index) => (
                    <div
                      key={item.id}
                      className="gold-product-card"
                      onClick={(e) => handleQuickView(e, item)}
                      style={{ "--i": index % 8 }} // Reset delay every 8 items to avoid long waits
                    >
                      <div className="gold-product-image">
                        <img
                          src={item.image ? (item.image.startsWith('/uploads') ? `${item.image}` : item.image) : 'https://images.unsplash.com/photo-1629215167576-80949d034293?q=80&w=800'}
                          alt={item.name}
                        />
                        <div className="gold-product-badges">
                          {item.discount > 0 && <span className="gold-badge discount">{item.discount}% OFF</span>}
                          {item.isNew && <span className="gold-badge new">New</span>}
                          {item.isBestseller && <span className="gold-badge bestseller">Bestseller</span>}
                        </div>
                        <div className="gold-product-actions">
                          <button
                            className="gold-action-btn"
                            onClick={(e) => { e.stopPropagation(); setQuickViewProduct(item); }}
                            title="Quick View"
                          >
                            👁️
                          </button>
                          <button
                            className={`gold-action-btn ${isInWishlist(item.id) ? 'active' : ''}`}
                            onClick={(e) => handleAddToWishlist(e, item)}
                            title="Add to Wishlist"
                          >
                            {isInWishlist(item.id) ? '❤️' : '🤍'}
                          </button>
                        </div>
                      </div>

                      <div className="gold-product-info">
                        <h4 className="gold-product-name">{item.name}</h4>
                        <p className="gold-product-description">{item.description}</p>

                        <div className="gold-product-rating">
                          <span className="gold-stars">
                            {"★".repeat(Math.floor(item.rating || 4.5))}
                            {"☆".repeat(5 - Math.floor(item.rating || 4.5))}
                          </span>
                          <span className="gold-rating-value">{item.rating || "4.5"}</span>
                          <span className="gold-reviews">({item.reviews || 0} reviews)</span>
                        </div>

                        <div className="gold-product-price">
                          <span className="gold-current-price">₹{item.price.toLocaleString()}</span>
                          {item.originalPrice > item.price && (
                            <span className="gold-original-price">₹{item.originalPrice.toLocaleString()}</span>
                          )}
                        </div>

                        <div className="gold-product-meta">
                          <div className="gold-specs-badges">
                            <span className="spec-badge">{item.weight}</span>
                            <span className="spec-badge">{item.purity}</span>
                          </div>
                          <span className={`gold-stock-status ${item.inStock ? 'in-stock' : 'out-stock'}`}>
                            {item.inStock ? "● In Stock" : "○ Out of Stock"}
                          </span>
                        </div>

                        <div className="gold-product-actions-row">
                          <button
                            className={`gold-add-to-cart-btn ${!item.inStock ? 'disabled' : ''}`}
                            onClick={(e) => handleAddToCart(e, item)}
                            disabled={!item.inStock}
                          >
                            CART
                          </button>
                          <button
                            className={`gold-buy-now-btn ${!item.inStock ? 'disabled' : ''}`}
                            onClick={(e) => handleBuyNow(e, item)}
                            disabled={!item.inStock}
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
                <div className="no-products">
                  <h3>No products found</h3>
                  <p>Try clearing filters</p>
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
                <div className="gold-product-rating" style={{marginBottom: '15px'}}>
                  <span className="gold-stars">
                    {"★".repeat(Math.floor(quickViewProduct.rating || 4.5))}
                    {"☆".repeat(5 - Math.floor(quickViewProduct.rating || 4.5))}
                  </span>
                  <span className="gold-rating-value">{quickViewProduct.rating || "4.5"}</span>
                  <span className="gold-reviews">({quickViewProduct.reviews || 0} reviews)</span>
                </div>
                <p className="quickview-price">₹{quickViewProduct.price.toLocaleString()}</p>
                <div className="quickview-desc">
                  {quickViewProduct.description}
                </div>
                
                <div className="quickview-specs">
                  <div className="spec-row">
                    <span className="spec-label">Weight: </span>
                    <span className="spec-value">{quickViewProduct.weight}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Purity: </span>
                    <span className="spec-value">{quickViewProduct.purity}</span>
                  </div>
                  {quickViewProduct.type && (
                    <div className="spec-row">
                      <span className="spec-label">Style: </span>
                      <span className="spec-value">{quickViewProduct.type}</span>
                    </div>
                  )}
                </div>

                <div className="quickview-actions">
                  <button 
                    className="gold-add-to-cart-btn" 
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

      {/* ===== GOLD INFORMATION ===== */}
      <div className="info-section">
        <div className="info-container">
          <div className="info-box">
            <h3>Why Invest in Gold?</h3>
            <ul>
              <li>✅ Hedge against inflation</li>
              <li>✅ High liquidity</li>
              <li>✅ No TDS on sale</li>
              <li>✅ Portfolio diversification</li>
            </ul>
          </div>

          <div className="info-box">
            <h3>Purity Standards</h3>
            <ul>
              <li>🏆 24K (99.9% pure) - Investment</li>
              <li>🏆 22K (91.6% pure) - Jewellery</li>
              <li>🏆 18K (75% pure) - Fashion Jewellery</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ===== CALCULATOR ===== */}
      <div className="calculator-section">
        <div className="calculator-container">
          <div className="calculator-header">
            <h2>Gold Value Estimator</h2>
            <p>Calculate the market value of your gold based on live rates</p>
          </div>
          <div className="calculator-card">
            <div className="calculator-form">
              <div className="input-field">
                <label>Weight in Grams</label>
                <div className="input-with-label">
                  <input
                    type="number"
                    value={calculatorData.weight}
                    onChange={(e) => setCalculatorData({ ...calculatorData, weight: parseFloat(e.target.value) || 0 })}
                  />
                  <span className="field-unit">g</span>
                </div>
              </div>
              <div className="input-field">
                <label>Select Purity</label>
                <div className="purity-selector">
                  {["24", "22", "18"].map(p => (
                    <button
                      key={p}
                      className={calculatorData.purity === p ? 'active' : ''}
                      onClick={() => setCalculatorData({ ...calculatorData, purity: p })}
                    >
                      {p}K
                    </button>
                  ))}
                </div>
              </div>
              <div className="calculator-preview">
                <span className="preview-label">Live Rate Applied:</span>
                <span className="preview-val">₹{goldRate}/g</span>
              </div>
            </div>
            <div className="calculator-divider"></div>
            <div className="calculator-display">
              <div className="calc-main-result">
                <span className="label">Estimated Value</span>
                <h3 className="amount">₹{calculatorData.calculatedValue.toLocaleString()}</h3>
                <p className="disclaimer">*Calculated as per daily market trends. Making charges & GST extra.</p>
              </div>
              <button className="btn-invest" onClick={() => navigate("/collections/gold-coins")}>
                View Gold Coins
              </button>
            </div>
          </div>
        </div>
      </div>

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
}

export default Gold;