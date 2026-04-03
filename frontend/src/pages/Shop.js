import React, { useState, useEffect, useRef } from 'react';
import { useWishlist } from '../context/WishlistContext';
import './Shop.css';

const useScrollAnimation = () => {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);
  return ref;
};

const Shop = () => {
  useScrollAnimation();
  const [activeFilter, setActiveFilter] = useState('all');
  const [cartItems, setCartItems] = useState([]);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleToggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
      alert(`Luxurious ${product.name} added to your wishlist!`);
    }
  };

  const collections = [
    {
      id: 1, name: "Silver Elegance", description: "Timeless Beauty in 925 Sterling Silver", count: 150,
      image: require("../assets/Silvershop.jpg")
    },
    {
      id: 2, name: "Pure Gold", description: "22K & 24K Traditional Excellence", count: 150,
      image: require("../assets/Goldshop.jpg")
    },
    {
      id: 3, name: "Diamond Heritage", description: "GIA Certified Exquisite Diamonds", count: 95,
      image: require("../assets/Diamondshop.jpg")
    },
    {
      id: 4, name: "Platinum Luxury", description: "Rare & Pure Platinum Statements", count: 85,
      image: require("../assets/Platinumshop.jpg")
    },
    {
      id: 5, name: "Gemstone Aura", description: "Nature's Vibrant Palette", count: 85,
      image: require("../assets/Gemstoneshop.jpg")
    },
    {
      id: 6, name: "Bridal Trousseau", description: "Unforgettable Wedding Masterpieces", count: 120,
      image: require("../assets/Weddingshop.jpg")
    },
    {
      id: 7, name: "The Gift Collection", description: "Perfect Tokens for Special Moments", count: 120,
      image: require("../assets/Giftshop.jpg")
    }
  ];

  const products = [
    {
      id: 1, name: "Royal Gold Choker Set", category: "necklace", price: 125000, originalPrice: 149999,
      rating: 4.9, weight: "45g", purity: "22K Gold",
      description: "An intricate traditional gold choker necklace with matching heavy detailed earrings.",
      image: require("../assets/G1.jpg"), tags: ["Bestseller", "Bridal"]
    },
    {
      id: 2, name: "Luminous Solitaire Ring", category: "rings", price: 85000, originalPrice: 99999,
      rating: 4.8, weight: "1.2ct", purity: "VVS Diamond",
      description: "A flawless GIA certified perfect cut solitaire diamond resting on a platinum band.",
      image: require("../assets/D1.jpg"), tags: ["Diamond", "Certified"]
    },
    {
      id: 3, name: "Heritage Gold Bangles", category: "bangles", price: 65000, originalPrice: 79999,
      rating: 4.7, weight: "30g", purity: "22K Gold",
      description: "Set of 4 meticulously handcrafted traditional gold bangles for the grand occasions.",
      image: require("../assets/G2.jpg"), tags: ["Traditional", "Set"]
    },
    {
      id: 4, name: "South Sea Pearl Drops", category: "earrings", price: 45000, originalPrice: 55000,
      rating: 4.6, weight: "8g", purity: "18K Gold",
      description: "Lustrous south sea pearls suspended from sparkling diamond-studded gold accents.",
      image: require("../assets/D2.jpg"), tags: ["Pearl", "Diamond"]
    },
    {
      id: 5, name: "Eternity Platinum Band", category: "rings", price: 75000, originalPrice: 89999,
      rating: 4.9, weight: "12g", purity: "950 Platinum",
      description: "Sleek, minimalist, and eternal platinum wedding band for the modern couple.",
      image: require("../assets/P1.jpg"), tags: ["Wedding", "Premium"]
    },
    {
      id: 6, name: "Celestial Diamond Pendant", category: "pendant", price: 95000, originalPrice: 115000,
      rating: 4.9, weight: "25g", purity: "18K White Gold",
      description: "A cascade of brilliant-cut diamonds forming a celestial constellation pattern.",
      image: require("../assets/PD1.jpg"), tags: ["Diamond", "Pendant"]
    },
    {
      id: 7, name: "Antique Silver Hasli", category: "silver", price: 35000, originalPrice: 45000,
      rating: 4.5, weight: "150g", purity: "925 Sterling",
      description: "Oxidized antique silver hasli necklace bringing out the rustic royal charm.",
      image: require("../assets/Silver1.jpg"), tags: ["Antique", "Tribal"]
    },
    {
      id: 8, name: "Rika Imperial Gold Coin", category: "coins", price: 65000, originalPrice: 75000,
      rating: 5.0, weight: "10g", purity: "24K Gold",
      description: "Investment grade 99.99% pure gold coin with hallmark certification.",
      image: require("../assets/G3.jpg"), tags: ["Investment", "Pure"]
    }
  ];

  const filters = [
    { id: 'all', name: 'All Masterpieces', count: products.length },
    { id: 'necklace', name: 'Necklaces', count: products.filter(p => p.category === 'necklace').length },
    { id: 'rings', name: 'Rings', count: products.filter(p => p.category === 'rings').length },
    { id: 'earrings', name: 'Earrings', count: products.filter(p => p.category === 'earrings').length },
    { id: 'bangles', name: 'Bangles', count: products.filter(p => p.category === 'bangles').length },
    { id: 'pendant', name: 'Pendants', count: products.filter(p => p.category === 'pendant').length },
    { id: 'silver', name: 'Silver Art', count: products.filter(p => p.category === 'silver').length },
    { id: 'coins', name: 'Pure Coins', count: products.filter(p => p.category === 'coins').length }
  ];

  const stores = [
    {
      id: 1, name: "Bharuch Flagship Store", address: "Harihar, Near Inox Bholav, Bharuch 392012",
      timings: "10 AM - 8 PM", phone: "+91 81601 36653",
      features: ["Gold Hallmarking", "Custom Design Studio", "Valuation Services"],
      manager: "Mr. Rajesh Mistry", image: require("../assets/Bharuchshop.jpg")
    },
    {
      id: 2, name: "Vadodara Luxury Boutique", address: "Alkapuri, Near Sursagar Lake, Vadodara 390007",
      timings: "10 AM - 8 PM", phone: "+91 265 3456789",
      features: ["Private Viewing", "Personal Stylist", "Premium Collections"],
      manager: "Ms. Riddhi Patel", image: require("../assets/VadodaraShop.jpg")
    },
    {
      id: 3, name: "Surat Diamond Lounge", address: "Adajan Patia, Near VR Mall, Surat 395009",
      timings: "10 AM - 9 PM", phone: "+91 261 2345678",
      features: ["Diamond Certification", "Export Quality", "VIP Lounge"],
      manager: "Ms. Hema Mistry", image: require("../assets/Suratshop.jpg")
    },

    {
      id: 4, name: "Ahmedabad Heritage", address: "SG Highway, Ahmedabad, Gujarat 380054",
      timings: "10 AM - 9 PM", phone: "+91 79 4567890",
      features: ["Bridal Consultation", "Jewellery Restoration", "Exchange Vault"],
      manager: "Mr.Karsh Mistry", image: require("../assets/Ahmedabadshop.jpg")
    }
  ];

  const filteredProducts = activeFilter === 'all'
    ? products
    : products.filter(product => product.category === activeFilter);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
    alert(`Luxurious ${product.name} added to your collection cart.`);
  };

  const handleWhatsApp = (phone) => {
    const message = `Hello, I'm captivated by your collection. Could you assist me with some exclusive pieces?`;
    window.open(`https://wa.me/${phone.replace(/\s/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const getDirections = (address) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank');
  };

  const handleBookAppointment = () => {
    alert('Your private viewing appointment request has been received. Our concierge will contact you shortly.');
  };

  return (
    <div className="shop-container">
      {/* Dynamic Hero Video Background Section */}
      <section className="shop-hero">
        <video autoPlay loop muted playsInline className="hero-bg-video">
          <source src="https://player.vimeo.com/external/498218158.sd.mp4?s=d00ca4164b077a2845c48b2ebda4bbda51b5c21f&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
        </video>
        <div className="hero-overlay">
          <span className="hero-badge">Since 2026</span>
          <h1 className="hero-title">Rika Jewells</h1>
          <p className="hero-subtitle">
            Embrace the allure of true craftsmanship. Discover masterpieces forged with passion, purity, and an eternal promise of magnificence.
          </p>
          <div className="hero-cta-wrap">
            <button className="hero-cta" onClick={() => document.getElementById('collections').scrollIntoView({ behavior: 'smooth' })}>
              Unveil The Collection
            </button>
          </div>
        </div>
      </section>

      {/* Stats with Glassmorphism */}
      <section className="stats-section scroll-animate">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">28+</div>
            <div className="stat-label">Years Legacy</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">50K+</div>
            <div className="stat-label">Connoisseurs</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">4</div>
            <div className="stat-label">Boutiques</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">100%</div>
            <div className="stat-label">Certified Purity</div>
          </div>
        </div>
      </section>

      {/* Collections Masonry Grid */}
      <section id="collections" className="collections-section scroll-animate">
        <div className="section-header">
          <h2>Curated Boutiques</h2>
          <p>Explore exclusive ranges tailored for connoisseurs of beauty</p>
        </div>
        <div className="collections-grid">
          {collections.map(collection => (
            <div className="collection-card" key={collection.id}>
              <div className="collection-image" style={{ backgroundImage: `url(${collection.image})` }} />
              <div className="collection-overlay">
                <div className="collection-content">
                  <h3>{collection.name}</h3>
                  <p>{collection.description}</p>
                  <span className="collection-count">{collection.count} Exquisite Items</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Product Filter & Grid */}
      <section className="products-section scroll-animate">
        <div className="section-header">
          <h2>The Grand Exhibition</h2>
          <p>Handpicked selections radiating brilliance</p>
        </div>

        <div className="filters-container">
          {filters.map(filter => (
            <button
              key={filter.id}
              className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.name}
              <span className="filter-count">{filter.count}</span>
            </button>
          ))}
        </div>

        <div className="products-grid">
          {filteredProducts.map(product => (
            <div className="product-card scroll-animate" key={product.id}>
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <div className="product-badges">
                  {product.tags.map((tag, index) => (
                    <span key={index} className="product-badge">{tag}</span>
                  ))}
                </div>
                <div className="product-actions">
                  <button 
                    className="wishlist-btn" 
                    title={isInWishlist(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                    onClick={() => handleToggleWishlist(product)}
                    style={{ color: isInWishlist(product.id) ? '#c5a044' : 'var(--text-main)' }}
                  >
                    {isInWishlist(product.id) ? '♥' : '♡'}
                  </button>
                  <button className="quick-view-btn" title="Quick View">⚲</button>
                </div>
              </div>

              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-description">{product.description}</p>

                <div className="product-specs">
                  <div className="spec">
                    <span className="spec-label">Weight</span>
                    <span className="spec-value">{product.weight}</span>
                  </div>
                  <div className="spec">
                    <span className="spec-label">Purity</span>
                    <span className="spec-value">{product.purity}</span>
                  </div>
                  <div className="spec">
                    <span className="spec-label">Grade</span>
                    <span className="spec-value rating-value">★ {product.rating}</span>
                  </div>
                </div>

                <div className="price-section">
                  <div className="current-price">₹{product.price.toLocaleString()}</div>
                  {product.originalPrice && (
                    <div className="original-price">₹{product.originalPrice.toLocaleString()}</div>
                  )}
                </div>

                <div className="product-buttons">
                  <button className="add-to-cart-btn" onClick={() => addToCart(product)}>Acquire</button>
                  <button className="view-details-btn">Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Store Locations */}
      <section id="boutiques" className="store-locations-section scroll-animate">
        <div className="section-header">
          <h2>Our Sanctuaries</h2>
          <p>Step into a world of ultimate luxury and personalized styling</p>
        </div>

        <div className="stores-grid">
          {stores.map(store => (
            <div className="store-card scroll-animate" key={store.id}>
              <div className="store-header">
                <span className="store-icon">✧</span>
                <h3>{store.name}</h3>
              </div>
              <div className="store-image" style={{ backgroundImage: `url(${store.image})` }} />
              <div className="store-details">
                <div className="detail-item">
                  <span className="detail-icon">✦</span>
                  <span className="detail-text">{store.address}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">◷</span>
                  <span className="detail-text">{store.timings}</span>
                </div>
              </div>
              <div className="store-features">
                <h4>Signature Services:</h4>
                <div className="features-list">
                  {store.features.map((feature, idx) => (
                    <span key={idx} className="feature-tag">{feature}</span>
                  ))}
                </div>
              </div>
              <div className="store-actions">
                <button className="directions-btn" onClick={() => getDirections(store.address)}>Get Maps</button>
                <button className="whatsapp-btn" onClick={() => handleWhatsApp(store.phone)}>WhatsApp</button>
                <button className="appointment-btn" onClick={handleBookAppointment}>Reserve Viewing</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-section scroll-animate">
        <div className="section-header">
          <h2>At Your Service</h2>
          <p>Exclusivity matched only by our dedication to perfection</p>
        </div>
        <div className="services-grid">
          <div className="service-card scroll-animate">
            <span className="service-icon">♕</span>
            <h3>Bespoke Design</h3>
            <p>From imagination to reality, our artisans craft pieces solely for your soul.</p>
          </div>
          <div className="service-card scroll-animate">
            <span className="service-icon">⟡</span>
            <h3>Diamond Lab</h3>
            <p>Uncompromising GIA grading ensuring absolute perfection in every facet.</p>
          </div>
          <div className="service-card scroll-animate">
            <span className="service-icon">♺</span>
            <h3>Heritage Renewal</h3>
            <p>Restore and polish your heirloom pieces back to their original magnificent glory.</p>
          </div>
          <div className="service-card scroll-animate">
            <span className="service-icon">⛊</span>
            <h3>Secure Transit</h3>
            <p>Completely insured, armored delivery of your masterpieces right to your estate.</p>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="cta-section scroll-animate">
        <div className="cta-content">
          <h2>Define Your Legacy</h2>
          <p>Join an elite circle of connoisseurs who accept nothing less than absolute perfection.</p>
          <div className="cta-buttons">
            <button className="cta-primary" onClick={handleBookAppointment}>Book Consultation</button>
            <button className="cta-secondary" onClick={() => document.getElementById('boutiques').scrollIntoView({ behavior: 'smooth' })}>Visit A Boutique</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;