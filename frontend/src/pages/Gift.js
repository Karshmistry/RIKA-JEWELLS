import React, { useContext, useState, useEffect } from "react";
import "./Gift.css";
import { CartContext } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function Gift() {
  const { addToCart } = useContext(CartContext);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showGiftMessage, setShowGiftMessage] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");

  // State for fetched products
  const [giftItems, setGiftItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();

        // Map relevant products to gift items
        // We'll consider products with 'occasion' set as potential gifts
        const products = data.map(p => {
          let category = 'festival'; // Default
          if (p.occasion) {
            const occ = p.occasion.toLowerCase();
            if (occ.includes('anniversary')) category = 'anniversary';
            else if (occ.includes('birthday')) category = 'birthday';
            else if (occ.includes('wedding') || occ.includes('bridal')) category = 'wedding';
            else if (occ.includes('festival') || occ.includes('party')) category = 'festival';
          }

          return {
            id: p._id,
            name: p.name,
            price: p.price,
            img: p.image ? (p.image.startsWith('/uploads') ? `${p.image}` : p.image) : 'https://via.placeholder.com/300',
            category: category,
            rating: p.rating || 4.5,
            description: p.description,
            occasion: p.occasion,
            inStock: p.countInStock > 0
          };
        });

        // Filter to keep only those that likely match our gift categories or have an occasion set
        const giftProducts = products.filter(p => p.occasion && p.occasion !== '');

        // If no products match, we might want to show some random ones as "Gifts" or just all products?
        // For now, let's use the filtered list, or fall back to all if empty (just to show something)
        setGiftItems(giftProducts.length > 0 ? giftProducts : products.slice(0, 20));
        setLoading(false);

      } catch (error) {
        console.error("Error fetching gift products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredItems = selectedCategory === "all"
    ? giftItems
    : giftItems.filter(item => item.category === selectedCategory);

  const handleAddToCart = (item, withGiftWrap = false) => {
    const cartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.img,
      quantity: 1,
      giftWrapped: withGiftWrap,
      giftMessage: withGiftWrap ? giftMessage : ""
    };

    addToCart(cartItem);

    if (withGiftWrap) {
      alert(`🎁 ${item.name} added with beautiful gift wrapping!`);
      setShowGiftMessage(false);
      setGiftMessage("");
    } else {
      alert(`${item.name} added to cart!`);
    }
  };

  const handleAddToWishlist = (e, product) => {
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      alert(`${product.name} removed from wishlist!`);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice || product.price,
        image: product.img
      });
      alert(`${product.name} added to wishlist!`);
    }
  };

  const handleQuickView = (e, product) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleGiftWrap = (item) => {
    setShowGiftMessage(true);
    // You can store the item temporarily in state if needed
  };

  const categories = [
    { id: "all", name: "All Collections" },
    { id: "anniversary", name: "Anniversary" },
    { id: "birthday", name: "Birthday" },
    { id: "wedding", name: "Wedding" },
    { id: "festival", name: "Festival" },
  ];

  return (
    <div className="gift-page">
      {/* ===== HERO SECTION ===== */}
      <div className="gift-hero">
        <div className="hero-overlay">
          <div className="gift-hero-content">
            <h1 className="gift-hero-title">Perfect Gifts for Special Moments</h1>
            <p className="gift-hero-subtitle">Handpicked jewellery gifts that create lasting memories</p>
            <div className="gift-rate-banner">
              <div className="rate-card">
                <span className="rate-label">Gift Gold Rate</span>
                <span className="rate-value">₹5,850/g</span>
                <span className="rate-change">↑ ₹60 (1.0%)</span>
              </div>
              <div className="rate-card">
                <span className="rate-label">Purity Guaranteed</span>
                <span className="rate-value">Authentic</span>
                <span className="rate-change">Certified</span>
              </div>
            </div>
            <div className="gift-hero-buttons">
              <button className="gift-btn-primary" onClick={() => document.querySelector('.gift-categories').scrollIntoView({ behavior: 'smooth' })}>
                Explore Gifts
              </button>
              <button className="gift-btn-secondary" onClick={() => setSelectedCategory("all")}>
                Trending Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Tabs */}
      <section className="gift-categories-tabs">
        <div className="container">
          <h2 className="gift-section-title">Shop by Category</h2>
          <div className="gift-category-tabs">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`gift-category-tab ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <span className="gift-tab-name">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="gift-categories">
        <div className="gift-section-header">
          <h2 className="gift-section-title">Find the Perfect Gift</h2>
          <p className="gift-section-subtitle">Select from our curated collections for every occasion</p>
        </div>
        <div className="categories-grid">
          {categories.slice(1).map(cat => (
            <div
              key={cat.id}
              className={`category-card ${selectedCategory === cat.id ? 'active' : ''}`}
              data-occasion={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <div className="category-icon">{cat.icon}</div>
              <h3>{cat.name} Gifts</h3>
              <p>{cat.id === 'anniversary' ? 'Celebrate love with timeless pieces' :
                cat.id === 'birthday' ? 'Make their day special' :
                  cat.id === 'wedding' ? 'Bless the newlyweds' :
                    'For Diwali, Eid, Christmas & more'}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Gift Grid Section */}
      <div className="gift-main-section">
        <div className="container">
          <div className="gift-section-header">
            <h2 className="gift-section-title">Gift Collections</h2>
            <p className="gift-section-subtitle">Handpicked designs loved by our customers</p>
          </div>

          <div className="gift-products-grid">
            {filteredItems.map((item) => (
              <div className="gift-product-card" key={item.id} onClick={(e) => handleQuickView(e, item)}>
                <div className="gift-product-image">
                  <span className="gift-item-rating">⭐ {item.rating}</span>
                  
                  {/* Floating Actions */}
                  <div className="gift-product-actions">
                    <button
                      className="gift-action-btn"
                      onClick={(e) => handleQuickView(e, item)}
                      title="Quick View"
                    >
                      👁️
                    </button>
                    <button
                      className={`gift-action-btn ${isInWishlist(item.id) ? 'active' : ''}`}
                      onClick={(e) => handleAddToWishlist(e, item)}
                      title="Add to Wishlist"
                    >
                      {isInWishlist(item.id) ? '❤️' : '🤍'}
                    </button>
                  </div>
                  
                  <img src={item.img} alt={item.name} />
                </div>
                <div className="gift-product-info">
                  <h3 className="gift-product-name">{item.name}</h3>
                  <p className="gift-product-description">{item.description}</p>
                  <div className="gift-price-section">
                    <span className="gift-price">₹{item.price.toLocaleString()}</span>
                  </div>
                  <div className="gift-button-group">
                    <button
                      className="gift-add-to-cart-btn"
                      onClick={() => handleAddToCart(item)}
                    >
                      CART
                    </button>
                    <button
                      className="gift-buy-now-btn"
                      onClick={() => handleAddToCart(item, true)}
                    >
                      BUY NOW
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filteredItems.length === 0 && (
            <div className="gift-no-products">
              <p>No suitable gift items found in this category.</p>
            </div>
          )}
        </div>
      </div>

      {/* Gift Message Modal */}
      {showGiftMessage && (
        <div className="gift-message-modal">
          <div className="modal-content">
            <h3>Add Gift Wrapping</h3>
            <p>Include a personalized message with your gift:</p>
            <textarea
              className="gift-message-input"
              placeholder="Write your heartfelt message here..."
              value={giftMessage}
              onChange={(e) => setGiftMessage(e.target.value)}
              rows="4"
            />
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={() => setShowGiftMessage(false)}>
                Cancel
              </button>
              <button
                className="confirm-btn"
                onClick={() => handleAddToCart(giftItems[0], true)}
              >
                Add Gift Wrap
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QUICK VIEW MODAL */}
      {quickViewProduct && (
        <div className="quickview-overlay" onClick={() => setQuickViewProduct(null)}>
          <div className="quickview-modal" onClick={(e) => e.stopPropagation()}>
            <button className="quickview-close" onClick={() => setQuickViewProduct(null)}>✕</button>
            <div className="quickview-content">
              <div className="quickview-image">
                <img src={quickViewProduct.img} alt={quickViewProduct.name} />
              </div>
              <div className="quickview-details">
                <h2>{quickViewProduct.name}</h2>
                <div className="product-rating" style={{marginBottom: '15px'}}>
                  <span className="stars">
                    ⭐ {quickViewProduct.rating || "4.8"}
                  </span>
                </div>
                <p className="quickview-price" style={{fontSize: '1.8rem', fontWeight: 800, margin: '15px 0'}}>₹{quickViewProduct.price.toLocaleString()}</p>
                <div className="quickview-desc" style={{marginBottom: 20}}>
                  {quickViewProduct.description}
                </div>
                
                <div className="quickview-specs" style={{marginBottom: 20}}>
                  {quickViewProduct.occasion && (
                    <div className="spec-row" style={{display: 'flex', justifyContent: 'space-between', marginBottom: 10}}>
                      <span className="spec-label" style={{color: '#666'}}>Occasion: </span>
                      <span className="spec-value" style={{fontWeight: 600, textTransform: 'capitalize'}}>{quickViewProduct.occasion}</span>
                    </div>
                  )}
                  {quickViewProduct.category && (
                    <div className="spec-row" style={{display: 'flex', justifyContent: 'space-between', marginBottom: 10}}>
                      <span className="spec-label" style={{color: '#666'}}>Gift Category: </span>
                      <span className="spec-value" style={{fontWeight: 600, textTransform: 'capitalize'}}>{quickViewProduct.category}</span>
                    </div>
                  )}
                </div>

                <div className="quickview-actions">
                  <button 
                    onClick={(e) => { handleAddToCart(quickViewProduct); setQuickViewProduct(null); }}
                    disabled={!quickViewProduct.inStock}
                    style={{width: '100%', padding: "15px", borderRadius: "0", background: "var(--gift-primary)", color: "var(--gift-dark)", border: "none", cursor: "pointer", fontWeight: 700, textTransform: "uppercase"}}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Features Section */}
      <div className="gift-features">
        <div className="gift-section-header">
          <h2 className="gift-section-title">Why Choose Our Gifts?</h2>
          <p className="gift-section-subtitle">We make gifting special and effortless</p>
        </div>
        <div className="features-grid">
          <div className="feature">
            <div className="feature-icon">🎀</div>
            <h3>Free Gift Wrapping</h3>
            <p>Elegant wrapping with personalized message</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🚚</div>
            <h3>Express Delivery</h3>
            <p>Same-day delivery in metro cities</p>
          </div>
          <div className="feature">
            <div className="feature-icon">💝</div>
            <h3>Personalized Card</h3>
            <p>Add your custom message</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🔄</div>
            <h3>Easy Returns</h3>
            <p>30-day return policy on gifts</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🔒</div>
            <h3>Secure Packaging</h3>
            <p>Tamper-proof premium packaging</p>
          </div>
          <div className="feature">
            <div className="feature-icon">💰</div>
            <h3>EMI Options</h3>
            <p>No-cost EMI available</p>
          </div>
        </div>
      </div>

      {/* Gift Guide */}
      <div className="gift-guide">
        <div className="gift-section-header">
          <h2 className="gift-section-title">Gift Selection Guide</h2>
          <p className="gift-section-subtitle">Not sure what to choose? Here are some suggestions</p>
        </div>
        <div className="guide-grid">
          <div className="guide-card">
            <div className="guide-header">
              <h3>💝 For Her</h3>
              <span className="budget-range">₹25K - ₹1L</span>
            </div>
            <ul>
              <li> Necklaces & Pendants</li>
              <li> Earrings & Studs</li>
              <li> Bracelets & Bangles</li>
              <li> Rings & Cocktail Rings</li>
            </ul>
            <button className="guide-btn" onClick={() => setSelectedCategory("anniversary")}>
              View Collection
            </button>
          </div>
          <div className="guide-card">
            <div className="guide-header">
              <h3>💝 For Him</h3>
              <span className="budget-range">₹30K - ₹80K</span>
            </div>
            <ul>
              <li> Gold Chains</li>
              <li> Cufflinks</li>
              <li> Rings</li>
              <li> Gold Coins</li>
            </ul>
            <button className="guide-btn" onClick={() => setSelectedCategory("birthday")}>
              View Collection
            </button>
          </div>
          <div className="guide-card">
            <div className="guide-header">
              <h3>💰 By Budget</h3>
              <span className="budget-range">Flexible Options</span>
            </div>
            <ul>
              <li> Under ₹25,000</li>
              <li> ₹25,000 - ₹50,000</li>
              <li> ₹50,000 - ₹1,00,000</li>
              <li> Above ₹1,00,000</li>
            </ul>
            <button className="guide-btn" onClick={() => setSelectedCategory("all")}>
              Shop All
            </button>
          </div>
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <footer className="footer-professional">
        <div className="container">
          <div className="footer-top">
            <div className="footer-logo">RIKA JEWELLS</div>
            <div className="footer-links">
              <span>About</span>
              <span>Contact</span>
              <span>Terms</span>
              <span>Privacy</span>
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

export default Gift;