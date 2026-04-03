import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import "./Gemstone.css";

const Gemstone = () => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  // State for notification
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success"
  });

  // State variables
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [filterPrice, setFilterPrice] = useState([0, 500000]);
  const [showFilter, setShowFilter] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(true);
  const [newArrivals, setNewArrivals] = useState(false);
  const [bestsellers, setBestsellers] = useState(false);
  const [selectedGemstones, setSelectedGemstones] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Show notification function
  const showNotification = (message, type = "success") => {
    setNotification({
      show: true,
      message,
      type
    });

    setTimeout(() => {
      setNotification(prev => ({
        ...prev,
        show: false
      }));
    }, 3000);
  };

  // Sample gemstone jewellery data -> Replaced with API Data
  const [gemstoneCollections, setGemstoneCollections] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();

        // Filter for Gemstone products
        const gemstoneProducts = data.filter(p =>
          (p.category && p.category.toLowerCase() === 'gemstone') ||
          (p.gemstone && p.gemstone.toLowerCase() !== 'diamond') ||
          (p.name && (p.name.toLowerCase().includes('ruby') || p.name.toLowerCase().includes('emerald') || p.name.toLowerCase().includes('sapphire')))
        );

        const formattedProducts = gemstoneProducts.map(p => {
          // Normalize category
          let cat = p.jewelleryType ? p.jewelleryType.toLowerCase().replace(' ', '-') : 'rings';
          // Fix singular/plural mismatch
          if (cat === 'ring') cat = 'rings';
          if (cat === 'bracelet') cat = 'bracelets';
          if (cat === 'earring') cat = 'earrings';
          if (cat === 'necklace') cat = 'necklaces';
          if (cat === 'bangle') cat = 'bangles';
          if (cat === 'brooch') cat = 'brooches';

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
            isNatural: true, // Default
            isHandmade: p.isHandmade || false,
            gemstone: p.gemstone || "Ruby", // Default if missing
            type: p.type || "Statement",
            metal: p.material || "Gold",
            origin: "Unknown",
            birthstone: "January" // Default
          };
        });

        setGemstoneCollections(formattedProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching gemstone products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = [
    { id: "all", name: "All Collections", count: gemstoneCollections.length },
    { id: "rings", name: "Rings", count: gemstoneCollections.filter(item => item.category === "rings").length },
    { id: "necklaces", name: "Necklaces", count: gemstoneCollections.filter(item => item.category === "necklaces").length },
    { id: "bracelets", name: "Bracelets", count: gemstoneCollections.filter(item => item.category === "bracelets").length },
    { id: "earrings", name: "Earrings", count: gemstoneCollections.filter(item => item.category === "earrings").length },
    { id: "brooches", name: "Brooches", count: gemstoneCollections.filter(item => item.category === "brooches").length }
  ];

  const sortOptions = [
    { id: "featured", name: "Featured" },
    { id: "newest", name: "Newest First" },
    { id: "price-low", name: "Price: Low to High" },
    { id: "price-high", name: "Price: High to Low" },
    { id: "rating", name: "Highest Rated" },
    { id: "discount", name: "Best Discount" },
    { id: "birthstone", name: "Birthstone Order" }
  ];

  const priceRanges = [
    { label: "Under ₹50k", min: 0, max: 49999 },
    { label: "₹50k-1L", min: 50000, max: 99999 },
    { label: "₹1-2L", min: 100000, max: 199999 },
    { label: "₹2-3L", min: 200000, max: 299999 },
    { label: "Above ₹3L", min: 300000, max: 1000000 }
  ];

  const gemstoneTypes = [
    "Ruby", "Emerald", "Sapphire", "Diamond", "Pearl",
    "Opal", "Amethyst", "Aquamarine", "Topaz", "Garnet",
    "Peridot", "Citrine", "Tourmaline", "Moonstone", "Jade"
  ];

  const jewelleryTypes = ["Statement", "Pendant", "Tennis", "Stud", "Cocktail", "Strand", "Drop", "Halo", "Set", "Brooch", "Traditional"];

  // Birthstone order for sorting
  const birthstoneOrder = {
    "January": 1, "Garnet": 1,
    "February": 2, "Amethyst": 2,
    "March": 3, "Aquamarine": 3,
    "April": 4, "Diamond": 4,
    "May": 5, "Emerald": 5,
    "June": 6, "Pearl": 6,
    "July": 7, "Ruby": 7,
    "August": 8, "Peridot": 8,
    "September": 9, "Sapphire": 9,
    "October": 10, "Opal": 10,
    "November": 11, "Citrine": 11,
    "December": 12, "Topaz": 12
  };

  // Filter products
  const filteredProducts = gemstoneCollections.filter(product => {
    // Category filter
    if (activeTab !== "all" && product.category !== activeTab) return false;

    // Price filter
    if (product.price < filterPrice[0] || product.price > filterPrice[1]) return false;

    // Availability filters
    if (inStockOnly && !product.inStock) return false;
    if (newArrivals && !product.isNew) return false;
    if (bestsellers && !product.isBestseller) return false;

    // Gemstone filter
    if (selectedGemstones.length > 0 && !selectedGemstones.includes(product.gemstone)) return false;

    // Type filter
    if (selectedTypes.length > 0 && !selectedTypes.includes(product.type)) return false;

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
      case "birthstone":
        return (birthstoneOrder[a.birthstone] || 99) - (birthstoneOrder[b.birthstone] || 99);
      default:
        return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0) || b.rating - a.rating;
    }
  });

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Updated: handleAddToCart now uses CartContext
  const handleAddToCart = (e, product) => {
    e.stopPropagation();

    // Add the product to cart with default quantity of 1
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      discount: product.discount,
      image: product.image,
      quantity: 1,
      description: product.description,
      gemstone: product.gemstone,
      metal: product.metal,
      origin: product.origin,
      birthstone: product.birthstone,
      category: product.category,
      inStock: product.inStock,
      type: product.type
    });

    showNotification(`${product.name} added to cart!`, "success");
  };

  // Updated: handleBuyNow now uses CartContext
  const handleBuyNow = (e, product) => {
    e.stopPropagation();

    if (product.inStock) {
      // Add the product to cart
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        discount: product.discount,
        image: product.image,
        quantity: 1,
        description: product.description,
        gemstone: product.gemstone,
        metal: product.metal,
        origin: product.origin,
        birthstone: product.birthstone,
        category: product.category,
        inStock: product.inStock,
        type: product.type
      });

      // Navigate directly to checkout
      navigate("/checkout");
    } else {
      showNotification(`${product.name} is out of stock!`, "error");
    }
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

  const handleGemstoneToggle = (gemstone) => {
    setSelectedGemstones(prev =>
      prev.includes(gemstone)
        ? prev.filter(g => g !== gemstone)
        : [...prev, gemstone]
    );
  };

  const handleTypeToggle = (type) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
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
    setSelectedGemstones([]);
    setSelectedTypes([]);
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
      necklaces: "Necklace",
      bracelets: "Bracelet",
      earrings: "Earrings",
      brooches: "Brooch"
    };
    return categoryMap[category] || category.charAt(0).toUpperCase() + category.slice(1);
  };

  const getGemstoneDetails = (product) => {
    return `${product.gemstone} • ${product.origin} • ${product.birthstone} Birthstone`;
  };

  const getGemstoneBadgeClass = (gemstone) => {
    const gemstoneClassMap = {
      "Ruby": "ruby",
      "Emerald": "emerald",
      "Sapphire": "sapphire",
      "Diamond": "diamond",
      "Pearl": "pearl",
      "Opal": "opal",
      "Amethyst": "amethyst"
    };
    return gemstoneClassMap[gemstone] || gemstone.toLowerCase();
  };

  return (
    <div className="gemstone-page">
      {/* Internal Notification */}
      {notification.show && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: 'var(--gem-dark)',
          color: 'white',
          padding: '20px 40px',
          borderRadius: '0',
          zIndex: 99999,
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
          animation: 'gemReveal 0.5s forwards',
          borderLeft: '5px solid var(--gem-accent)'
        }}>
          {notification.message}
        </div>
      )}

      {/* ===== HERO SECTION ===== */}
      <section className="gemstone-hero">
        <div className="hero-overlay">
          <div className="gemstone-hero-content">
            <span className="gemstone-hero-tag">Exclusively at RIKA JEWELLS</span>
            <h1 className="gemstone-hero-title">The Gemstone Vault</h1>
            <p className="gemstone-hero-subtitle">Elevate your aura with nature's most vibrant treasures</p>

            <div className="gemstone-rate-banner">
              <div className="rate-card">
                <span className="rate-label">Certification Standard</span>
                <span className="rate-value">GIA / IGI</span>
                <span className="rate-change">Ethically Sourced</span>
              </div>
              <div className="rate-card">
                <span className="rate-label">Heritage Collection</span>
                <span className="rate-value">Exclusive</span>
                <span className="rate-change" style={{ color: 'var(--gem-accent)' }}>Masterpiece Series</span>
              </div>
            </div>

            {/* <div className="gemstone-hero-buttons">
              <button className="gemstone-btn-primary" onClick={() => document.getElementById('shop-section').scrollIntoView({ behavior: 'smooth' })}>
                View Collection
              </button>
              <button className="gemstone-btn-secondary" onClick={() => document.getElementById('guide-section').scrollIntoView({ behavior: 'smooth' })}>
                Gemstone Guide
              </button>
            </div> */}
          </div>
        </div>
      </section>

      {/* ===== TRUST BAR ===== */}
      <div className="gemstone-trust-bar">
        <div className="container">
          <div className="trust-items">
            <div className="trust-item">
              <span className="trust-icon">🛡️</span>
              <div className="trust-text">
                <strong>GIA Certified</strong>
                <p>Authenticity Guaranteed</p>
              </div>
            </div>
            <div className="trust-item">
              <span className="trust-icon">✨</span>
              <div className="trust-text">
                <strong>Natural Gems</strong>
                <p>100% Ethically Sourced</p>
              </div>
            </div>
            <div className="trust-item">
              <span className="trust-icon">💎</span>
              <div className="trust-text">
                <strong>Expert Cut</strong>
                <p>Maximum Brilliance</p>
              </div>
            </div>
            <div className="trust-item">
              <span className="trust-icon">🤝</span>
              <div className="trust-text">
                <strong>Lifetime Value</strong>
                <p>Buyback Commitment</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== CATEGORY SECTION ===== */}
      <section className="gemstone-categories">
        <div className="container">
          <h2 className="gemstone-section-title">Shop by Category</h2>
          <div className="gemstone-category-tabs">
            {categories.map(category => (
              <button
                key={category.id}
                className={`gemstone-category-tab ${activeTab === category.id ? 'active' : ''}`}
                onClick={() => setActiveTab(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MAIN SHOP SECTION ===== */}
      <section className="gemstone-main" id="shop-section">
        <div className="container">
          <div className="gemstone-content">
            {/* Sidebar Filters */}
            <aside className="gemstone-filters-sidebar">
              <div className="gemstone-filter-header">
                <h3>Refine Selection</h3>
              </div>

              <div className="gemstone-filter-section">
                <h4>Price Range</h4>
                <div className="gemstone-price-quick-filters" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                  {priceRanges.map((range, index) => (
                    <button
                      key={index}
                      className={`gemstone-category-tab ${filterPrice[0] === range.min && filterPrice[1] === range.max ? 'active' : ''}`}
                      style={{ padding: '10px', fontSize: '0.75rem', width: '100%' }}
                      onClick={() => handlePriceFilter(range.min, range.max)}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="gemstone-filter-section">
                <h4>Primary Stone</h4>
                {["Ruby", "Emerald", "Sapphire", "Opal", "Amethyst"].map(gem => (
                  <label key={gem} className="gemstone-checkbox-label">
                    <input
                      type="checkbox"
                      checked={selectedGemstones.includes(gem)}
                      onChange={() => handleGemstoneToggle(gem)}
                    />
                    {gem}
                  </label>
                ))}
              </div>

              <div className="gemstone-filter-section">
                <h4>Preferences</h4>
                <label className="gemstone-checkbox-label">
                  <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} />
                  Ready to Ship
                </label>
                <label className="gemstone-checkbox-label">
                  <input type="checkbox" checked={newArrivals} onChange={(e) => setNewArrivals(e.target.checked)} />
                  New Arrivals
                </label>
              </div>

              <button className="gemstone-clear-filters-btn" onClick={handleClearFilters}>
                RESET COLLECTION
              </button>
            </aside>

            {/* Products Grid */}
            <div className="gemstone-products-section">
              <div className="gemstone-products-header">
                <div className="gemstone-products-info">
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{activeTab.toUpperCase()} COLLECTION</h3>
                  <p className="gemstone-products-count">{sortedProducts.length} Authenticated Pieces</p>
                </div>
                <div className="gemstone-sort-dropdown">
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: '10px', border: '1px solid #eee', fontWeight: 700 }}>
                    <option value="featured">Most Coveted</option>
                    <option value="newest">Latest Release</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>

              {loading ? (
                <div className="loading-state">Curating nature's finest gems...</div>
              ) : (
                <div className="gemstone-products-grid">
                  {sortedProducts.map(product => (
                    <div
                      key={product.id}
                      className="gemstone-product-card"
                      onClick={(e) => handleQuickView(e, product)}
                    >
                      <div className="gemstone-product-image">
                        {product.isNew && <span className="gemstone-badge new">NEW</span>}
                        {product.discount > 0 && <span className="gemstone-badge discount">{product.discount}% OFF</span>}

                        <div className="gemstone-float-actions">
                          <button className="float-btn view" onClick={(e) => handleQuickView(e, product)}>👁️</button>
                          <button className={`float-btn wishlist ${isInWishlist(product.id) ? 'active' : ''}`} onClick={(e) => handleAddToWishlist(e, product)}>
                            {isInWishlist(product.id) ? '❤️' : '🤍'}
                          </button>
                        </div>

                        <img src={product.image} alt={product.name} />

                        <span className={`gemstone-badge ${getGemstoneBadgeClass(product.gemstone)}`}>
                          {product.gemstone}
                        </span>
                      </div>

                      <div className="gemstone-product-info">
                        <h4 className="gemstone-product-name">{product.name}</h4>
                        <p className="gemstone-product-description">{product.description}</p>

                        <div className="platinum-rating-row">
                          <div className="platinum-stars">
                            {"★".repeat(Math.floor(product.rating))}
                            {"☆".repeat(5 - Math.floor(product.rating))}
                          </div>
                          <span className="rating-score">{product.rating}</span>
                          <span className="review-count">({product.reviews} reviews)</span>
                        </div>

                        <div className="gemstone-product-price">
                          <span className="gemstone-current-price">₹{formatPrice(product.price)}</span>
                        </div>

                        <div className="gemstone-product-actions-row">
                          <button
                            className="gemstone-add-to-cart-btn"
                            onClick={(e) => handleAddToCart(e, product)}
                            disabled={!product.inStock}
                          >
                            CART
                          </button>
                          <button
                            className="gemstone-buy-now-btn"
                            onClick={(e) => handleBuyNow(e, product)}
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
                <p className="quickview-price" style={{fontSize: '1.8rem', fontWeight: 800, margin: '15px 0'}}>₹{formatPrice(quickViewProduct.price)}</p>
                <div className="quickview-desc" style={{marginBottom: 20}}>
                  {quickViewProduct.description}
                </div>
                
                <div className="quickview-specs" style={{marginBottom: 20}}>
                  <div className="spec-row" style={{display: 'flex', justifyContent: 'space-between', marginBottom: 10}}>
                    <span className="spec-label" style={{color: '#666'}}>Gemstone: </span>
                    <span className="spec-value" style={{fontWeight: 600}}>{quickViewProduct.gemstone}</span>
                  </div>
                  <div className="spec-row" style={{display: 'flex', justifyContent: 'space-between', marginBottom: 10}}>
                    <span className="spec-label" style={{color: '#666'}}>Birthstone: </span>
                    <span className="spec-value" style={{fontWeight: 600}}>{quickViewProduct.birthstone}</span>
                  </div>
                  <div className="spec-row" style={{display: 'flex', justifyContent: 'space-between', marginBottom: 10}}>
                    <span className="spec-label" style={{color: '#666'}}>Metal: </span>
                    <span className="spec-value" style={{fontWeight: 600}}>{quickViewProduct.metal}</span>
                  </div>
                </div>

                <div className="quickview-actions">
                  <button 
                    className="gemstone-add-to-cart-btn" 
                    onClick={(e) => { handleAddToCart(e, quickViewProduct); setQuickViewProduct(null); }}
                    disabled={!quickViewProduct.inStock}
                    style={{width: '100%', padding: "15px", borderRadius: "100px", background: "linear-gradient(to right, #004d40, #00796b)", color: "white", border: "none", cursor: "pointer"}}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== GEMSTONE GUIDE ===== */}
      <section className="gemstone-guide" id="guide-section">
        <div className="container">
          <h2 className="gemstone-section-title" style={{ color: 'white' }}>The Wisdom of Stones</h2>
          <div className="gemstone-guide-grid">
            <div className="gemstone-guide-card">
              <span className="gemstone-guide-icon">❤️</span>
              <h3>The Ruby Heart</h3>
              <p>Considered the 'King of Gems', Ruby represents love, courage, and unstoppable vitality through the ages.</p>
            </div>
            <div className="gemstone-guide-card">
              <span className="gemstone-guide-icon">🌿</span>
              <h3>Emerald Growth</h3>
              <p>A symbol of rebirth, Emerald is believed to grant its owner foresight, good fortune, and eternal youth.</p>
            </div>
            <div className="gemstone-guide-card">
              <span className="gemstone-guide-icon">🧠</span>
              <h3>Sapphire Truth</h3>
              <p>The gem of the heavens, Sapphire represents celestial wisdom, nobility, and divine favor.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER =====
      <footer className="footer-professional">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '8px', marginBottom: '30px' }}>RIKA JEWELLS</h2>
            <p style={{ opacity: 0.6, maxWidth: '600px', margin: '0 auto 40px' }}>
              Crafting stories through nature's most vibrant treasures. Each gemstone is a legacy waiting to be worn.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem' }}>
              <span style={{ cursor: 'pointer' }} onClick={() => navigate("/about")}>About</span>
              <span style={{ cursor: 'pointer' }} onClick={() => navigate("/contact")}>Collections</span>
              <span style={{ cursor: 'pointer' }} onClick={() => navigate("/terms")}>Sourcing</span>
              <span style={{ cursor: 'pointer' }} onClick={() => navigate("/privacy")}>Privacy</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}; */}



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


export default Gemstone;