import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import "./Wedding.css";

const Wedding = () => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  // State for notification
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success"
  });

  // State variables
  const { category } = useParams();
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    if (category) {
      setActiveTab(category);
    }
  }, [category]);
  const [sortBy, setSortBy] = useState("featured");
  const [filterPrice, setFilterPrice] = useState([0, 1000000]);
  const [showFilter, setShowFilter] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(true);
  const [newArrivals, setNewArrivals] = useState(false);
  const [bestsellers, setBestsellers] = useState(false);
  const [selectedMetals, setSelectedMetals] = useState([]);
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

  // Sample wedding jewellery data -> Replaced with API Data
  const [weddingCollections, setWeddingCollections] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();

        // Filter for Wedding products
        // We look for 'Wedding' in occasion or category, or specific keywords in name/type
        const weddingProducts = data.filter(p =>
          (p.category && p.category.toLowerCase() === 'wedding') ||
          (p.occasion && p.occasion.toLowerCase() === 'wedding') ||
          (p.jewelleryType && (p.jewelleryType.toLowerCase() === 'mangalsutra' || p.jewelleryType.toLowerCase() === 'bridal set')) ||
          (p.name && (p.name.toLowerCase().includes('bridal') || p.name.toLowerCase().includes('wedding') || p.name.toLowerCase().includes('mangalsutra') || p.name.toLowerCase().includes('groom')))
        );

        const formattedProducts = weddingProducts.map(p => {
          // Normalize category for tabs
          let cat = 'bridal'; // Default to bridal
          const lowerName = p.name ? p.name.toLowerCase() : '';
          const lowerType = p.jewelleryType ? p.jewelleryType.toLowerCase() : '';

          if (lowerType.includes('mangalsutra') || lowerName.includes('mangalsutra')) {
            cat = 'mangalsutra';
          } else if (lowerType.includes('groom') || lowerName.includes('groom') || p.category === 'Men') {
            cat = 'groom';
          }

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
            metal: p.material || "Gold" // Default to Gold
          };
        });

        setWeddingCollections(formattedProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching wedding products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = [
    { id: "all", name: "All Collections", count: weddingCollections.length },
    { id: "bridal", name: "Bridal Sets", count: weddingCollections.filter(item => item.category === "bridal").length },
    { id: "mangalsutra", name: "Mangalsutra", count: weddingCollections.filter(item => item.category === "mangalsutra").length },
    { id: "groom", name: "Groom Collection", count: weddingCollections.filter(item => item.category === "groom").length }
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
    { label: "Under ₹1 Lakh", min: 0, max: 99999 },
    { label: "₹1-3 Lakhs", min: 100000, max: 299999 },
    { label: "₹3-5 Lakhs", min: 300000, max: 499999 },
    { label: "Above ₹5 Lakhs", min: 500000, max: 2000000 }
  ];

  const metals = ["Gold", "Platinum", "Rose Gold", "Silver"];

  // Filter products
  const filteredProducts = weddingCollections.filter(product => {
    // Category filter
    if (activeTab !== "all" && product.category !== activeTab) return false;

    // Price filter
    if (product.price < filterPrice[0] || product.price > filterPrice[1]) return false;

    // Availability filters
    if (inStockOnly && !product.inStock) return false;
    if (newArrivals && !product.isNew) return false;
    if (bestsellers && !product.isBestseller) return false;

    // Metal filter
    if (selectedMetals.length > 0 && !selectedMetals.includes(product.metal)) return false;

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
      metal: product.metal,
      category: product.category,
      inStock: product.inStock
    });

    showNotification(`${product.name} added to cart!`, "success");
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

  const handleBuyNow = (e, product) => {
    e.stopPropagation();
    handleAddToCart(e, product);
    navigate("/checkout");
  };


  const handlePriceFilter = (min, max) => {
    setFilterPrice([min, max]);
  };

  const handleMetalToggle = (metal) => {
    setSelectedMetals(prev =>
      prev.includes(metal)
        ? prev.filter(m => m !== metal)
        : [...prev, metal]
    );
  };

  const handleApplyFilters = () => {
    setShowFilter(false);
  };

  const handleClearFilters = () => {
    setFilterPrice([0, 1000000]);
    setInStockOnly(true);
    setNewArrivals(false);
    setBestsellers(false);
    setSelectedMetals([]);
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
      bridal: "Bridal Set",
      mangalsutra: "Mangalsutra",
      groom: "Groom Collection"
    };
    return categoryMap[category] || category.toUpperCase();
  };

  return (
    <div className="wedding-page">
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
      <div className="wedding-hero">
        <div className="hero-overlay">
          <div className="wedding-hero-content">
            <h1 className="wedding-hero-title">Eternal Love, Timeless Jewellery</h1>
            <p className="wedding-hero-subtitle">Celebrate your special day with our exquisite wedding collection</p>
            <div className="wedding-rate-banner">
              <div className="rate-card">
                <span className="rate-label">Bridal Gold Rate</span>
                <span className="rate-value">₹5,850/g</span>
                <span className="rate-change">↑ ₹60 (1.0%)</span>
              </div>
              <div className="rate-card">
                <span className="rate-label">Engagement Rate</span>
                <span className="rate-value">Premium</span>
                <span className="rate-change">Expert Crafted</span>
              </div>
            </div>
            <div className="wedding-hero-buttons">
              <button className="wedding-btn-primary" onClick={() => navigate("/wedding/bridal")}>
                Bridal Collection
              </button>
              <button className="wedding-btn-secondary" onClick={() => navigate("/wedding/all")}>
                Explore All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Tabs */}
      <section className="wedding-categories">
        <div className="container">
          <h2 className="wedding-section-title">Shop by Category</h2>
          <div className="wedding-category-tabs">
            {categories.map(category => (
              <button
                key={category.id}
                className={`wedding-category-tab ${activeTab === category.id ? 'active' : ''}`}
                onClick={() => setActiveTab(category.id)}
              >
                <span className="wedding-tab-name">
                  {category.id === "all" ? "All Collections" : category.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="wedding-main">
        <div className="container">
          <div className="wedding-content">
            {/* Filters Sidebar */}
            <aside className={`wedding-filters-sidebar ${showFilter ? 'show' : ''}`}>
              <div className="wedding-filter-header">
                <h3>Filters</h3>
                <button className="wedding-close-filter" onClick={() => setShowFilter(false)}>✕</button>
              </div>

              <div className="wedding-filter-section">
                <h4>Price Range</h4>
                <div className="wedding-price-filter">
                  <div className="wedding-price-inputs">
                    <div className="wedding-price-input">
                      <label>Min (₹)</label>
                      <input
                        type="number"
                        value={filterPrice[0]}
                        onChange={(e) => setFilterPrice([parseInt(e.target.value) || 0, filterPrice[1]])}
                        min="0"
                      />
                    </div>
                    <div className="wedding-price-input">
                      <label>Max (₹)</label>
                      <input
                        type="number"
                        value={filterPrice[1]}
                        onChange={(e) => setFilterPrice([filterPrice[0], parseInt(e.target.value) || 1000000])}
                        min={filterPrice[0]}
                      />
                    </div>
                  </div>
                  <div className="wedding-price-quick-filters">
                    {priceRanges.map((range, index) => (
                      <button
                        key={index}
                        className={`wedding-price-quick-btn ${filterPrice[0] === range.min && filterPrice[1] === range.max ? 'active' : ''
                          }`}
                        onClick={() => handlePriceFilter(range.min, range.max)}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="wedding-filter-section">
                <h4>Availability</h4>
                <div className="wedding-availability-filter">
                  <label className="wedding-checkbox-label">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                    />
                    <span>In Stock Only</span>
                  </label>
                  <label className="wedding-checkbox-label">
                    <input
                      type="checkbox"
                      checked={newArrivals}
                      onChange={(e) => setNewArrivals(e.target.checked)}
                    />
                    <span>New Arrivals</span>
                  </label>
                  <label className="wedding-checkbox-label">
                    <input
                      type="checkbox"
                      checked={bestsellers}
                      onChange={(e) => setBestsellers(e.target.checked)}
                    />
                    <span>Bestsellers</span>
                  </label>
                </div>
              </div>

              <div className="wedding-filter-section">
                <h4>Metal Type</h4>
                <div className="wedding-metal-filter">
                  {metals.map(metal => (
                    <label key={metal} className="wedding-checkbox-label">
                      <input
                        type="checkbox"
                        checked={selectedMetals.includes(metal)}
                        onChange={() => handleMetalToggle(metal)}
                      />
                      <span>{metal}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button className="wedding-apply-filters-btn" onClick={handleApplyFilters}>
                Apply Filters
              </button>
              <button className="wedding-clear-filters-btn" onClick={handleClearFilters}>
                Clear All
              </button>
            </aside>

            <div className="wedding-products-section">
              <div className="wedding-products-header">
                <div className="wedding-products-info">
                  <h3>Wedding Collection</h3>
                  <p className="wedding-products-count">
                    {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'} found
                  </p>
                </div>
                <div className="wedding-products-controls">
                  <button className="wedding-filter-toggle" onClick={() => setShowFilter(!showFilter)}>
                    <span>☰</span> Filters
                  </button>
                  <div className="wedding-sort-dropdown">
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

              <div className="wedding-products-grid">
                {sortedProducts.map(product => (
                  <div
                    key={product.id}
                    className="wedding-product-card"
                    onClick={(e) => handleQuickView(e, product)}
                  >
                    <div className="wedding-product-badges">
                      {product.isNew && <span className="badge new">NEW</span>}
                      {product.discount > 0 && (
                        <span className="badge discount">{product.discount}% OFF</span>
                      )}
                      {product.isBestseller && <span className="badge bestseller">BESTSELLER</span>}
                      {!product.inStock && <span className="badge out-of-stock">OUT OF STOCK</span>}
                    </div>

                    <div className="wedding-product-image">
                      <img src={product.image} alt={product.name} />
                      <div className="wedding-product-actions">
                        <button
                          className="wedding-action-btn"
                          onClick={(e) => handleQuickView(e, product)}
                          title="Quick View"
                          aria-label="Quick view"
                        >
                          👁️
                        </button>
                        <button
                          className={`wedding-action-btn ${isInWishlist(product.id) ? 'active' : ''}`}
                          onClick={(e) => handleAddToWishlist(e, product)}
                          title="Add to Wishlist"
                          aria-label="Add to wishlist"
                        >
                          {isInWishlist(product.id) ? '❤️' : '🤍'}
                        </button>
                      </div>
                    </div>

                    <div className="wedding-product-info">
                      <h4 className="wedding-product-name">{product.name}</h4>
                      <p className="wedding-product-description">{product.description}</p>

                      <div className="wedding-product-rating">
                        <span className="stars" aria-label={`Rating: ${product.rating} out of 5`}>
                          {renderStars(product.rating)}
                        </span>
                        <span className="rating-value">{product.rating}</span>
                        <span className="reviews">({product.reviews} reviews)</span>
                      </div>

                      <div className="wedding-product-price">
                        <span className="wedding-current-price">₹{formatPrice(product.price)}</span>
                        {product.originalPrice > product.price && (
                          <span className="wedding-original-price">₹{formatPrice(product.originalPrice)}</span>
                        )}
                      </div>

                      <div className="wedding-product-meta">
                        <span className="wedding-product-category">{getCategoryName(product.category)}</span>
                        <span className={`stock-status ${product.inStock ? 'in-stock' : 'out-stock'}`}>
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </div>

                      <div className="wedding-product-button-group">
                        <button
                          className={`wedding-add-to-cart-btn ${!product.inStock ? 'disabled' : ''}`}
                          onClick={(e) => handleAddToCart(e, product)}
                          disabled={!product.inStock}
                        >
                          CART
                        </button>
                        <button
                          className={`wedding-buy-now-btn ${!product.inStock ? 'disabled' : ''}`}
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

              {sortedProducts.length === 0 && (
                <div className="no-products">
                  <h3>No products found</h3>
                  <p>Try adjusting your filters or browse other categories</p>
                  <button onClick={handleClearFilters}>View All Products</button>
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
                <div className="product-rating" style={{marginBottom: '15px'}}>
                  <span className="stars">
                    {renderStars(quickViewProduct.rating || 4.5)}
                  </span>
                  <span className="rating-value" style={{fontWeight: 700, marginLeft: 5}}>{quickViewProduct.rating || "4.8"}</span>
                  <span className="reviews" style={{color: '#999', marginLeft: 5}}>({quickViewProduct.reviews || "150"} reviews)</span>
                </div>
                <p className="quickview-price" style={{fontSize: '1.8rem', fontWeight: 800, margin: '15px 0'}}>₹{formatPrice(quickViewProduct.price)}</p>
                <div className="quickview-desc" style={{marginBottom: 20}}>
                  {quickViewProduct.description}
                </div>
                
                <div className="quickview-specs" style={{marginBottom: 20}}>
                  <div className="spec-row" style={{display: 'flex', justifyContent: 'space-between', marginBottom: 10}}>
                    <span className="spec-label" style={{color: '#666'}}>Category: </span>
                    <span className="spec-value" style={{fontWeight: 600}}>{getCategoryName(quickViewProduct.category)}</span>
                  </div>
                  {quickViewProduct.metal && (
                    <div className="spec-row" style={{display: 'flex', justifyContent: 'space-between', marginBottom: 10}}>
                      <span className="spec-label" style={{color: '#666'}}>Metal: </span>
                      <span className="spec-value" style={{fontWeight: 600}}>{quickViewProduct.metal}</span>
                    </div>
                  )}
                </div>

                <div className="quickview-actions">
                  <button 
                    className="wedding-add-to-cart-btn" 
                    onClick={(e) => { handleAddToCart(e, quickViewProduct); setQuickViewProduct(null); }}
                    disabled={!quickViewProduct.inStock}
                    style={{width: '100%', padding: "15px", borderRadius: "0", background: "var(--wedding-primary)", color: "var(--wedding-dark)", border: "none", cursor: "pointer", fontWeight: 700, textTransform: "uppercase"}}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Wedding Planning Guide */}
      <section className="wedding-guide">
        <div className="container">
          <h2 className="section-title">Wedding Jewellery Buying Guide</h2>
          <div className="guide-grid">
            <div className="guide-card">
              <div className="guide-icon">💍</div>
              <h3>Choose Your Style</h3>
              <p>Traditional, contemporary, or fusion - find what matches your wedding theme</p>
            </div>
            <div className="guide-card">
              <div className="guide-icon">💰</div>
              <h3>Budget Planning</h3>
              <p>Allocate 10-15% of your wedding budget for jewellery</p>
            </div>
            <div className="guide-card">
              <div className="guide-icon">⚖️</div>
              <h3>Gold Purity</h3>
              <p>22K for traditional look, 18K for durability, or platinum for modern appeal</p>
            </div>
            <div className="guide-card">
              <div className="guide-icon">📅</div>
              <h3>Timing Matters</h3>
              <p>Order at least 2-3 months before the wedding for customization</p>
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

export default Wedding;