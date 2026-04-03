import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Platinum.css";
import { CartContext } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const Platinum = () => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [filterPrice, setFilterPrice] = useState([0, 500000]);
  const [showFilter, setShowFilter] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(true);
  const [newArrivals, setNewArrivals] = useState(false);
  const [bestsellers, setBestsellers] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingItemId, setLoadingItemId] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();

  // State for notification (internal)
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success"
  });

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification(prev => ({ ...prev, show: false })), 3000);
  };

  // Sample platinum jewellery data -> Replaced with API Data
  const [platinumCollections, setPlatinumCollections] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/products');
        const data = await response.json();

        // Filter for Platinum products
        const platinumProducts = data.filter(p =>
          (p.category && p.category.toLowerCase() === 'platinum') ||
          (p.material && p.material.toLowerCase() === 'platinum') ||
          (p.name && p.name.toLowerCase().includes('platinum'))
        );

        const formattedProducts = platinumProducts.map(p => {
          // Normalize category
          let cat = p.jewelleryType ? p.jewelleryType.toLowerCase().replace(' ', '-') : 'rings';
          // Fix singular/plural mismatch
          if (cat === 'ring') cat = 'rings';
          if (cat === 'wedding-band') cat = 'wedding-bands';
          if (cat === 'bracelet') cat = 'bracelets';
          if (cat === 'earring') cat = 'earrings';
          if (cat === 'necklace') cat = 'necklaces';
          if (cat === 'bangle') cat = 'bangles';
          if (cat === 'man') cat = 'men'; // Assuming 'men' is the category key for Men's Collection

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
            isLuxury: p.price > 100000,
            isCertified: p.isHallmark || true,
            type: p.type || "Diamond",
            style: p.style || "Classic",
            purity: p.purity || "950"
          };
        });

        setPlatinumCollections(formattedProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching platinum products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = [
    { id: "all", name: "All Collections", count: platinumCollections.length },
    { id: "rings", name: "Rings", count: platinumCollections.filter(item => item.category === "rings").length },
    { id: "wedding-bands", name: "Wedding Bands", count: platinumCollections.filter(item => item.category === "wedding-bands").length },
    { id: "bracelets", name: "Bracelets", count: platinumCollections.filter(item => item.category === "bracelets").length },
    { id: "earrings", name: "Earrings", count: platinumCollections.filter(item => item.category === "earrings").length },
    { id: "necklaces", name: "Necklaces", count: platinumCollections.filter(item => item.category === "necklaces").length },
    { id: "men", name: "Men's Collection", count: platinumCollections.filter(item => item.category === "men").length },
    { id: "bangles", name: "Bangles", count: platinumCollections.filter(item => item.category === "bangles").length }
  ];

  const sortOptions = [
    { id: "featured", name: "Featured" },
    { id: "newest", name: "Newest First" },
    { id: "price-low", name: "Price: Low to High" },
    { id: "price-high", name: "Price: High to Low" },
    { id: "rating", name: "Highest Rated" },
    { id: "discount", name: "Best Discount" },
    { id: "purity", name: "Highest Purity" }
  ];

  const priceRanges = [
    { label: "Under ₹1 Lakh", min: 0, max: 99999 },
    { label: "₹1-2 Lakhs", min: 100000, max: 199999 },
    { label: "₹2-3 Lakhs", min: 200000, max: 299999 },
    { label: "₹3-5 Lakhs", min: 300000, max: 499999 },
    { label: "Above ₹5 Lakhs", min: 500000, max: 1000000 }
  ];

  const jewelleryTypes = ["Diamond", "Gemstone", "Plain", "Chain", "Engraved", "Minimalist"];
  const styles = ["Classic", "Contemporary", "Modern", "Traditional", "Luxury", "Minimalist"];

  // Filter products
  const filteredProducts = platinumCollections.filter(product => {
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

    // Style filter
    if (selectedStyles.length > 0 && !selectedStyles.includes(product.style)) return false;

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
      case "purity":
        return parseInt(b.purity) - parseInt(a.purity);
      default:
        return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0) || b.rating - a.rating;
    }
  });

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // UPDATED: handleAddToCart function with cart logic
  const handleAddToCart = (e, product) => {
    e.stopPropagation();

    if (!product.inStock) {
      alert(`${product.name} is currently out of stock. Please try again later.`);
      return;
    }

    setLoading(true);
    setLoadingItemId(product.id);

    // Calculate discount price if applicable
    const calculateDiscountPrice = (price, discount) => {
      return Math.round(price - (price * discount / 100));
    };

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.discount > 0 ? calculateDiscountPrice(product.price, product.discount) : product.price,
      image: product.image,
      quantity: 1,
      weight: "N/A",
      purity: `${product.purity} Platinum`,
      category: product.category,
      description: product.description
    };

    setTimeout(() => {
      addToCart(cartItem);
      setLoading(false);
      setLoadingItemId(null);

      // Show success notification (like Gold.js)
      const notification = document.createElement('div');
      notification.className = 'cart-notification';
      notification.innerHTML = `
        <div style="
          position: fixed;
          top: 20px;
          right: 20px;
          background: linear-gradient(135deg, #4CAF50, #2E7D32);
          color: white;
          padding: 20px 30px;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          z-index: 10000;
          animation: slideIn 0.3s ease-out;
        ">
          <strong>✓ Added to Cart!</strong><br>
          ${product.name}
        </div>
      `;
      document.body.appendChild(notification);

      setTimeout(() => {
        document.body.removeChild(notification);
      }, 3000);
    }, 500);
  };

  // UPDATED: handleAddToWishlist function with notification
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

  // UPDATED: handleQuickView
  const handleQuickView = (e, product) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  // UPDATED: handleBuyNow function with cart logic
  const handleBuyNow = (e, product) => {
    e.stopPropagation();

    if (!product.inStock) {
      // If out of stock, navigate to notify page
      navigate("/notify", {
        state: {
          productId: product.id,
          productName: product.name
        }
      });
      return;
    }

    setLoading(true);
    setLoadingItemId(product.id);

    // Calculate discount price if applicable
    const calculateDiscountPrice = (price, discount) => {
      return Math.round(price - (price * discount / 100));
    };

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.discount > 0 ? calculateDiscountPrice(product.price, product.discount) : product.price,
      image: product.image,
      quantity: 1,
      weight: "N/A",
      purity: `${product.purity} Platinum`,
      category: product.category,
      description: product.description
    };

    setTimeout(() => {
      addToCart(cartItem);
      setLoading(false);
      setLoadingItemId(null);
      navigate("/checkout");
    }, 500);
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

  const handleStyleToggle = (style) => {
    setSelectedStyles(prev =>
      prev.includes(style)
        ? prev.filter(s => s !== style)
        : [...prev, style]
    );
  };

  const handleApplyFilters = () => {
    setShowFilter(false);
  };

  const handleClearFilters = () => {
    setFilterPrice([0, 500000]);
    setInStockOnly(true);
    setNewArrivals(false);
    setBestsellers(false);
    setSelectedTypes([]);
    setSelectedStyles([]);
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
      rings: "Ring",
      "wedding-bands": "Wedding Band",
      bracelets: "Bracelet",
      earrings: "Earrings",
      necklaces: "Necklace",
      men: "Men's",
      bangles: "Bangle"
    };
    return categoryMap[category] || category.charAt(0).toUpperCase() + category.slice(1);
  };


  // Platinum Rate State
  const [platinumRate, setPlatinumRate] = useState(3450);
  const [calcData, setCalcData] = useState({
    weight: 10,
    purity: 950,
    making: 500
  });

  // Effect to update platinum rate
  useEffect(() => {
    const interval = setInterval(() => {
      setPlatinumRate(prev => {
        const change = Math.random() > 0.5 ? 5 : -3;
        return Math.max(3400, Math.min(3600, prev + change));
      });
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  const getCategoryTitle = () => {
    if (activeTab === "all") return "Platinum Collection";
    const cat = categories.find(c => c.id === activeTab);
    return cat ? cat.name : "Platinum Pieces";
  };

  const calculateEstimate = () => {
    const goldValue = (platinumRate * calcData.weight * calcData.purity) / 1000;
    const makingCharges = calcData.making * calcData.weight;
    return Math.round(goldValue + makingCharges);
  };

  return (
    <div className="platinum-page">
      {/* Internal Notification */}
      {notification.show && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: 'var(--plat-dark)',
          color: 'white',
          padding: '20px 40px',
          borderRadius: '15px',
          zIndex: 99999,
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
          animation: 'platReveal 0.5s forwards'
        }}>
          {notification.message}
        </div>
      )}

      {/* ===== HERO SECTION ===== */}
      <section className="platinum-hero">
        <div className="hero-overlay">
          <div className="platinum-hero-content">
            <span className="platinum-hero-tag">Exclusively at RIKA JEWELLS</span>
            <h1 className="platinum-hero-title">Platinum Excellence</h1>
            <p className="platinum-hero-subtitle">Symbolizing a love that lasts forever with 95% pure platinum</p>

            <div className="platinum-rate-banner">
              <div className="rate-card">
                <span className="rate-label">Live Market Rate (950)</span>
                <span className="rate-value">₹{formatPrice(platinumRate)}<span style={{ fontSize: '1rem', opacity: 0.7 }}>/g</span></span>
                <span className="rate-change">+1.4% ↑</span>
              </div>
              <div className="rate-card">
                <span className="rate-label">Purity Index</span>
                <span className="rate-value">95.0%</span>
                <span className="rate-change" style={{ color: '#94a3b8' }}>Certified Authentic</span>
              </div>
            </div>

            <div className="platinum-hero-buttons">
              {/* <button className="platinum-btn-primary" onClick={() => document.getElementById('shop-section').scrollIntoView({ behavior: 'smooth' })}>
                Shop Collection
              </button> */}
              {/* <button className="platinum-btn-secondary" onClick={() => document.getElementById('guide-section').scrollIntoView({ behavior: 'smooth' })}>
                Why Platinum?
              </button> */}
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST BAR ===== */}
      <div className="platinum-trust-bar">
        <div className="container">
          <div className="trust-items">
            <div className="trust-item">
              <span className="trust-icon">🛡️</span>
              <div className="trust-text">
                <strong>PGI Certified</strong>
                <p>Authenticity Guaranteed</p>
              </div>
            </div>
            <div className="trust-item">
              <span className="trust-icon">✨</span>
              <div className="trust-text">
                <strong>Eternal Luster</strong>
                <p>Never Fades or Tarnishes</p>
              </div>
            </div>
            <div className="trust-item">
              <span className="trust-icon">💎</span>
              <div className="trust-text">
                <strong>Rare Metal</strong>
                <p>30x Rarer than Gold</p>
              </div>
            </div>
            <div className="trust-item">
              <span className="trust-icon">🤝</span>
              <div className="trust-text">
                <strong>Buyback Policy</strong>
                <p>Guaranteed Resale Value</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== CATEGORY SECTION ===== */}
      <section className="platinum-categories">
        <div className="container">
          <h2 className="platinum-section-title">Shop by Category</h2>
          <div className="platinum-category-tabs">
            {categories.map(category => (
              <button
                key={category.id}
                className={`platinum-category-tab ${activeTab === category.id ? 'active' : ''}`}
                onClick={() => setActiveTab(category.id)}
              >
                {category.id === "all" ? "All Collections" : category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MAIN SHOP SECTION ===== */}
      <section className="platinum-main" id="shop-section">
        <div className="container">
          <div className="platinum-content">
            {/* Sidebar Filters */}
            <aside className="platinum-filters-sidebar">
              <div className="platinum-filter-header">
                <h3>Refine Selection</h3>
              </div>

              <div className="platinum-filter-section">
                <h4>Price Range</h4>
                <div className="platinum-price-inputs">
                  <div className="platinum-price-input">
                    <label>Min (₹)</label>
                    <input
                      type="number"
                      value={filterPrice[0]}
                      onChange={(e) => setFilterPrice([parseInt(e.target.value) || 0, filterPrice[1]])}
                    />
                  </div>
                  <div className="platinum-price-input">
                    <label>Max (₹)</label>
                    <input
                      type="number"
                      value={filterPrice[1]}
                      onChange={(e) => setFilterPrice([filterPrice[0], parseInt(e.target.value) || 1000000])}
                    />
                  </div>
                </div>
                <div className="platinum-price-quick-filters">
                  {priceRanges.map((range, index) => (
                    <button
                      key={index}
                      className={`platinum-price-quick-btn ${filterPrice[0] === range.min && filterPrice[1] === range.max ? 'active' : ''}`}
                      onClick={() => handlePriceFilter(range.min, range.max)}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="platinum-filter-section">
                <h4>Preferences</h4>
                <label className="platinum-checkbox-label">
                  <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} />
                  Ready to Ship
                </label>
                <label className="platinum-checkbox-label">
                  <input type="checkbox" checked={newArrivals} onChange={(e) => setNewArrivals(e.target.checked)} />
                  Season's New
                </label>
              </div>

              <div className="platinum-filter-section">
                <h4>Metal Style</h4>
                {jewelleryTypes.map(type => (
                  <label key={type} className="platinum-checkbox-label">
                    <input type="checkbox" checked={selectedTypes.includes(type)} onChange={() => handleTypeToggle(type)} />
                    {type}
                  </label>
                ))}
              </div>

              <button className="platinum-clear-filters-btn" onClick={handleClearFilters}>
                RESET ALL
              </button>
            </aside>

            {/* Products Grid */}
            <div className="platinum-products-section">
              <div className="platinum-products-header">
                <div className="platinum-products-info">
                  <h3>{getCategoryTitle()}</h3>
                  <p className="platinum-products-count">{sortedProducts.length} Exclusive Pieces Available</p>
                </div>
                <div className="platinum-sort-dropdown">
                  <label>Sort By:</label>
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="featured">Most Coveted</option>
                    <option value="newest">Latest Release</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>

              {loading ? (
                <div className="loading-state">Evaluating the finest platinum...</div>
              ) : (
                <div className="platinum-products-grid">
                  {sortedProducts.map(product => (
                    <div
                      key={product.id}
                      className="platinum-product-card"
                      onClick={(e) => handleQuickView(e, product)}
                    >
                      <div className="platinum-product-image">
                        {/* Match image badges */}
                        {product.isNew && <span className="platinum-badge new">NEW</span>}
                        {product.isLuxury && <span className="platinum-badge luxury">{product.style}</span>}

                        {/* Floating quick actions from image */}
                        <div className="platinum-float-actions">
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

                      <div className="platinum-product-info">
                        <h4 className="platinum-product-name">{product.name}</h4>
                        <p className="platinum-product-description">
                          {product.description}. Type: {product.category}
                        </p>

                        {/* Rating row like the image */}
                        <div className="platinum-rating-row">
                          <div className="platinum-stars">
                            {"★".repeat(Math.floor(product.rating || 4))}
                            {"☆".repeat(5 - Math.floor(product.rating || 4))}
                          </div>
                          <span className="rating-score">{product.rating || "4.8"}</span>
                          <span className="review-count">({product.reviews || "150"} reviews)</span>
                        </div>

                        <div className="platinum-product-price">
                          <span className="platinum-current-price">₹{formatPrice(product.price)}</span>
                        </div>

                        <div className="platinum-product-actions-row">
                          <button
                            className="platinum-add-to-cart-btn"
                            onClick={(e) => handleAddToCart(e, product)}
                            disabled={!product.inStock}
                          >
                            CART
                          </button>
                          <button
                            className="platinum-buy-now-btn"
                            onClick={(e) => handleBuyNow(e, product)}
                            disabled={!product.inStock}
                          >
                            Buy Now
                          </button>
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
                <div className="platinum-rating-row" style={{marginBottom: '15px'}}>
                  <div className="platinum-stars">
                    {"★".repeat(Math.floor(quickViewProduct.rating || 4))}
                    {"☆".repeat(5 - Math.floor(quickViewProduct.rating || 4))}
                  </div>
                  <span className="rating-score">{quickViewProduct.rating || "4.8"}</span>
                  <span className="review-count">({quickViewProduct.reviews || "150"} reviews)</span>
                </div>
                <p className="quickview-price">₹{formatPrice(quickViewProduct.price)}</p>
                <div className="quickview-desc">
                  {quickViewProduct.description}
                </div>
                
                <div className="quickview-specs">
                  <div className="spec-row">
                    <span className="spec-label">Purity: </span>
                    <span className="spec-value">{quickViewProduct.purity}</span>
                  </div>
                  {quickViewProduct.style && (
                    <div className="spec-row">
                      <span className="spec-label">Style: </span>
                      <span className="spec-value">{quickViewProduct.style}</span>
                    </div>
                  )}
                </div>

                <div className="quickview-actions">
                  <button 
                    className="platinum-add-to-cart-btn" 
                    onClick={(e) => { handleAddToCart(e, quickViewProduct); setQuickViewProduct(null); }}
                    disabled={!quickViewProduct.inStock}
                    style={{flex: 1, padding: "15px", borderRadius: "100px", background: "linear-gradient(to right, #475569, #1e293b)", color: "white", border: "none", cursor: "pointer"}}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== PLATINUM GUIDE ===== */}
      <section className="platinum-guide" id="guide-section">
        <div className="container">
          <h2 className="platinum-section-title" style={{ color: 'white' }}>The Platinum Standard</h2>
          <div className="platinum-guide-grid">
            <div className="platinum-guide-card">
              <span className="platinum-guide-icon">🛡️</span>
              <h3>Enduring Strength</h3>
              <p>Naturally white and exceptionally durable, platinum's density ensures it holds diamonds most securely.</p>
            </div>
            <div className="platinum-guide-card">
              <span className="platinum-guide-icon">⚡</span>
              <h3>95% Purity</h3>
              <p>Naturally hypoallergenic, platinum is perfect for sensitive skin as it contains no nickel or base metals.</p>
            </div>
            <div className="platinum-guide-card">
              <span className="platinum-guide-icon">✨</span>
              <h3>Rare & Eternal</h3>
              <p>Platinum does not wear away; instead, it develops a unique 'patina' that symbolizes a lifetime of use.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CALCULATOR SECTION ===== */}
      <section className="platinum-calculator-section">
        <div className="container">
          <div className="platinum-calc-card">
            <div className="platinum-calc-grid">
              <div className="platinum-calc-inputs">
                <div style={{ gridColumn: '1 / -1', marginBottom: '20px' }}>
                  <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Value Estimator</h2>
                  <p style={{ color: '#666' }}>Assess the market value of your platinum selection</p>
                </div>
                <div className="diamond-calc-input-group">
                  <label>Weight (Grams)</label>
                  <input
                    type="number"
                    value={calcData.weight}
                    onChange={(e) => setCalcData({ ...calcData, weight: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div className="diamond-calc-input-group">
                  <label>Purity Grade</label>
                  <select
                    value={calcData.purity}
                    onChange={(e) => setCalcData({ ...calcData, purity: parseInt(e.target.value) })}
                  >
                    <option value={950}>950 (High Purity)</option>
                    <option value={900}>900 (Standard)</option>
                  </select>
                </div>
                <div className="diamond-calc-input-group">
                  <label>Making Charges (/g)</label>
                  <input
                    type="number"
                    value={calcData.making}
                    onChange={(e) => setCalcData({ ...calcData, making: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>
              <div className="platinum-calc-result">
                <span className="result-label">Estimated Market Value</span>
                <span className="result-price">₹{formatPrice(calculateEstimate())}*</span>
                <p className="result-disclaimer" style={{ opacity: 0.6 }}>*Exclusive of GST and Hallmark charges. Rates updated live.</p>
                <button className="platinum-btn-primary" style={{ marginTop: '30px' }} onClick={() => navigate('/contact')}>
                  Expert Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer-professional">
        <div className="container">
          <div className="footer-top">
            <div className="footer-logo">RIKA JEWELLS</div>
            <div className="footer-links">
              <span onClick={() => navigate("/about")}>The Maison</span>
              <span onClick={() => navigate("/contact")}>Concierge</span>
              <span onClick={() => navigate("/terms")}>Terms</span>
              <span onClick={() => navigate("/privacy")}>Privacy</span>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Rika Jewells. Crafted in Platinum. Eternally Yours.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Platinum;
