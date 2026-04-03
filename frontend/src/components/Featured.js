// import React from "react";
// import "./Featured.css";

// const products = [
//   {
//     id: 1,
//     name: "Diamond Ring",
//     price: "₹45,000",
//     img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e",
//   },
//   {
//     id: 2,
//     name: "Gold Necklace",
//     price: "₹92,000",
//     img: "https://images.unsplash.com/photo-1617038220319-276d3cfab638",
//   },
//   {
//     id: 3,
//     name: "Bridal Bangles",
//     price: "₹38,500",
//     img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f",
//   },
// ];

// function Featured() {
//   return (
//     <div className="featured-section">
//       <h2>Featured Collection</h2>
//       <p>Handpicked designs crafted for elegance</p>

//       <div className="product-grid">
//         {products.map((item) => (
//           <div className="product-card" key={item.id}>
//             <img src={item.img} alt={item.name} />
//             <h3>{item.name}</h3>
//             <span>{item.price}</span>
//             <button>View Details</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Featured;


import React, { useState, useContext } from "react";
import "./Featured.css";
import { CartContext } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Featured() {
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState("all");
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const featuredProducts = [
    {
      id: 1,
      name: "Diamond Solitaire Ring",
      price: 45000,
      originalPrice: 55000,
      discount: 18,
      category: "rings",
      material: "Platinum",
      weight: "2.5g",
      rating: 4.8,
      reviews: 124,
      img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e",
      images: [
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e",
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908",
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f"
      ],
      description: "Elegant solitaire diamond ring with platinum setting. Certified GIA diamond.",
      features: ["GIA Certified", "VS1 Clarity", "18K Gold Prongs", "Lifetime Warranty"],
      delivery: "Free delivery in 5-7 days",
      stock: 12,
      isNew: true,
      bestseller: true
    },
    {
      id: 2,
      name: "Gold Temple Necklace",
      price: 92000,
      originalPrice: 110000,
      discount: 16,
      category: "necklaces",
      material: "22K Gold",
      weight: "18g",
      rating: 4.9,
      reviews: 89,
      img: "https://images.unsplash.com/photo-1617038220319-276d3cfab638",
      images: [
        "https://images.unsplash.com/photo-1617038220319-276d3cfab638",
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f"
      ],
      description: "Traditional temple necklace with intricate handcrafted design. Pure 22K gold.",
      features: ["Pure 22K Gold", "Handcrafted", "Antique Finish", "Hallmarked"],
      delivery: "Express delivery in 3-5 days",
      stock: 8,
      isNew: false,
      bestseller: true
    },
    {
      id: 3,
      name: "Bridal Chooda Set",
      price: 38500,
      originalPrice: 45000,
      discount: 14,
      category: "bangles",
      material: "Gold & Lacquer",
      weight: "45g",
      rating: 4.7,
      reviews: 156,
      img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f",
      images: [
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f",
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e"
      ],
      description: "Traditional Punjabi bridal chooda set with gold plating and intricate designs.",
      features: ["Red & White", "Adjustable", "Gold Plated", "Wedding Essential"],
      delivery: "Free delivery in 4-6 days",
      stock: 25,
      isNew: true,
      bestseller: true
    },
    {
      id: 4,
      name: "Pearl & Diamond Earrings",
      price: 28500,
      originalPrice: 35000,
      discount: 19,
      category: "earrings",
      material: "Gold & Pearl",
      weight: "8g",
      rating: 4.6,
      reviews: 203,
      img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908",
      images: [
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908",
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e"
      ],
      description: "Elegant pearl and diamond stud earrings with gold setting.",
      features: ["Freshwater Pearls", "Diamond Accents", "Hypoallergenic", "Gift Box"],
      delivery: "Standard delivery in 5-7 days",
      stock: 18,
      isNew: false,
      bestseller: true
    },
    {
      id: 5,
      name: "Platinum Chain for Men",
      price: 67500,
      originalPrice: 75000,
      discount: 10,
      category: "chains",
      material: "Platinum",
      weight: "15g",
      rating: 4.9,
      reviews: 72,
      img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f",
      images: [
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f",
        "https://images.unsplash.com/photo-1617038220319-276d3cfab638"
      ],
      description: "Minimalist platinum chain with secure lock. Perfect for everyday wear.",
      features: ["Pure Platinum", "Italian Crafted", "Secure Lock", "Waterproof"],
      delivery: "Express delivery in 2-4 days",
      stock: 6,
      isNew: true,
      bestseller: false
    },
    {
      id: 6,
      name: "Ruby & Diamond Bracelet",
      price: 52000,
      originalPrice: 65000,
      discount: 20,
      category: "bracelets",
      material: "Gold & Ruby",
      weight: "12g",
      rating: 4.5,
      reviews: 118,
      img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908",
      images: [
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908",
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f"
      ],
      description: "Luxury ruby and diamond tennis bracelet with gold links.",
      features: ["Natural Rubies", "Diamond Accents", "Adjustable", "Velvet Box"],
      delivery: "Free delivery in 5-7 days",
      stock: 10,
      isNew: false,
      bestseller: false
    },
    {
      id: 7,
      name: "Emerald Pendant Set",
      price: 78500,
      originalPrice: 95000,
      discount: 17,
      category: "pendants",
      material: "Gold & Emerald",
      weight: "22g",
      rating: 4.8,
      reviews: 67,
      img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908",
      images: [
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908",
        "https://images.unsplash.com/photo-1617038220319-276d3cfab638"
      ],
      description: "Statement emerald pendant with matching earrings. Colombian emeralds.",
      features: ["Colombian Emeralds", "Matching Set", "22K Gold", "Certified"],
      delivery: "Express delivery in 3-5 days",
      stock: 5,
      isNew: true,
      bestseller: true
    },
    {
      id: 8,
      name: "Sapphire Cocktail Ring",
      price: 62500,
      originalPrice: 78000,
      discount: 20,
      category: "rings",
      material: "Silver & Sapphire",
      weight: "14g",
      rating: 4.9,
      reviews: 94,
      img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e",
      images: [
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e",
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908"
      ],
      description: "Vintage-inspired cocktail ring with sapphire center stone.",
      features: ["Blue Sapphire", "925 Sterling Silver", "Vintage Design", "Gift Ready"],
      delivery: "Standard delivery in 5-7 days",
      stock: 9,
      isNew: true,
      bestseller: false
    }
  ];

  const filters = [
    { id: "all", label: "All Products" },
    { id: "new", label: "New Arrivals" },
    { id: "bestseller", label: "Best Sellers" },
    { id: "discount", label: "On Sale" },
    { id: "rings", label: "Rings" },
    { id: "necklaces", label: "Necklaces" },
    { id: "earrings", label: "Earrings" }
  ];

  const filteredProducts = featuredProducts.filter(product => {
    if (activeFilter === "all") return true;
    if (activeFilter === "new") return product.isNew;
    if (activeFilter === "bestseller") return product.bestseller;
    if (activeFilter === "discount") return product.discount > 10;
    return product.category === activeFilter;
  });

  const handleWishlistToggle = (product, e) => {
    e.stopPropagation();
    if (!user) {
      navigate("/login");
      return;
    }

    if (wishlist?.some(item => item.id === product.id)) {
      removeFromWishlist?.(product.id);
    } else {
      addToWishlist?.({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.img,
        originalPrice: product.originalPrice
      });
    }
  };

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.img,
      quantity: 1
    });

    // Show success toast
    showToast(`${product.name} added to cart!`);
  };

  const showToast = (message) => {
    const toast = document.createElement('div');
    toast.className = 'featured-toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('show');
    }, 10);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3000);
  };

  const ProductCard = ({ product }) => {
    const isInWishlist = wishlist?.some(item => item.id === product.id);

    return (
      <div
        className={`product-card ${hoveredProduct === product.id ? 'hovered' : ''}`}
        onMouseEnter={() => setHoveredProduct(product.id)}
        onMouseLeave={() => setHoveredProduct(null)}
        onClick={() => navigate(`/product/${product.id}`)}
      >
        {/* Badges */}
        <div className="product-badges">
          {product.discount > 10 && (
            <span className="badge discount">-{product.discount}%</span>
          )}
          {product.isNew && (
            <span className="badge new">NEW</span>
          )}
          {product.bestseller && (
            <span className="badge bestseller">🔥 HOT</span>
          )}
          {product.stock < 10 && (
            <span className="badge low-stock">Only {product.stock} left</span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          className={`wishlist-btn ${isInWishlist ? 'active' : ''}`}
          onClick={(e) => handleWishlistToggle(product, e)}
          title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isInWishlist ? "❤️" : "🤍"}
        </button>

        {/* Quick View Button */}
        <button
          className="quick-view-btn"
          onClick={(e) => {
            e.stopPropagation();
            setQuickViewProduct(product);
          }}
          title="Quick View"
        >
          👁️
        </button>

        {/* Product Image */}
        <div className="product-image-container">
          <img
            src={product.img}
            alt={product.name}
            className="product-image"
          />
          <div className="product-overlay">
            <button
              className="quick-add-btn"
              onClick={(e) => handleAddToCart(product, e)}
            >
              CART
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info">
          <div className="product-category">{product.category.toUpperCase()}</div>
          <h3 className="product-name">{product.name}</h3>

          <div className="product-rating">
            <div className="stars">
              {"★".repeat(Math.floor(product.rating))}
              {"☆".repeat(5 - Math.floor(product.rating))}
            </div>
            <span className="rating-value">{product.rating}</span>
            <span className="review-count">({product.reviews})</span>
          </div>

          <div className="product-specs">
            <span className="spec">
              <span className="spec-icon">💎</span>
              {product.material}
            </span>
            <span className="spec">
              <span className="spec-icon">⚖️</span>
              {product.weight}
            </span>
          </div>

          <div className="product-price">
            {product.discount > 0 ? (
              <>
                <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
                <span className="current-price">₹{product.price.toLocaleString()}</span>
                <span className="save-amount">
                  Save ₹{(product.originalPrice - product.price).toLocaleString()}
                </span>
              </>
            ) : (
              <span className="current-price">₹{product.price.toLocaleString()}</span>
            )}
          </div>

          <div className="product-delivery">
            <span className="delivery-icon">🚚</span>
            {product.delivery}
          </div>

          <div className="product-actions">
            <button
              className="view-details-btn"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/product/${product.id}`);
              }}
            >
              BUY NOW
            </button>
            <button
              className="add-to-cart-btn"
              onClick={(e) => handleAddToCart(product, e)}
            >
              CART
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="featured-section">
      {/* Header with Background Pattern */}
      <div className="section-header">
        <div className="header-content">
          <span className="section-subtitle">✨ Premium Collection</span>
          <h2 className="section-title">Featured Masterpieces</h2>
          <p className="section-description">
            Handcrafted elegance meets timeless design. Each piece tells a story of passion and precision.
          </p>
        </div>

        <div className="header-stats">
          <div className="stat-item">
            <span className="stat-number">500+</span>
            <span className="stat-label">Happy Customers</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">4.9</span>
            <span className="stat-label">Average Rating</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">Certified</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="featured-filters">
        <div className="filter-scroll">
          {filters.map(filter => (
            <button
              key={filter.id}
              className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
              {filter.id === "discount" && <span className="filter-badge">🔥</span>}
              {filter.id === "new" && <span className="filter-badge">✨</span>}
            </button>
          ))}
        </div>

        <button
          className="view-all-btn"
          onClick={() => navigate("/shop")}
        >
          View All Products →
        </button>
      </div>

      {/* Products Grid */}
      <div className="product-grid">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Call to Action */}
      <div className="featured-cta">
        <div className="cta-content">
          <h3>Can't Find What You're Looking For?</h3>
          <p>Book a personal consultation with our jewellery experts</p>
          <div className="cta-buttons">
            <button
              className="cta-btn primary"
              onClick={() => navigate("/consultation")}
            >
              📞 Book Consultation
            </button>
            <button
              className="cta-btn secondary"
              onClick={() => navigate("/custom-design")}
            >
              ✏️ Custom Design
            </button>
          </div>
        </div>
        <div className="cta-features">
          <div className="feature">
            <span className="feature-icon">🔒</span>
            <span>Lifetime Warranty</span>
          </div>
          <div className="feature">
            <span className="feature-icon">💎</span>
            <span>Certified Stones</span>
          </div>
          <div className="feature">
            <span className="feature-icon">🎁</span>
            <span>Free Gift Packaging</span>
          </div>
          <div className="feature">
            <span className="feature-icon">🔄</span>
            <span>30-Day Return</span>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="quick-view-modal">
          <div className="modal-overlay" onClick={() => setQuickViewProduct(null)}></div>
          <div className="modal-content">
            <button
              className="modal-close"
              onClick={() => setQuickViewProduct(null)}
            >
              ✕
            </button>

            <div className="modal-product">
              <div className="modal-images">
                <img src={quickViewProduct.img} alt={quickViewProduct.name} />
                <div className="image-thumbnails">
                  {quickViewProduct.images.map((img, index) => (
                    <img key={index} src={img} alt={`View ${index + 1}`} />
                  ))}
                </div>
              </div>

              <div className="modal-details">
                <h2>{quickViewProduct.name}</h2>

                <div className="modal-rating">
                  <div className="stars">
                    {"★".repeat(Math.floor(quickViewProduct.rating))}
                    {"☆".repeat(5 - Math.floor(quickViewProduct.rating))}
                  </div>
                  <span>{quickViewProduct.rating} ({quickViewProduct.reviews} reviews)</span>
                </div>

                <p className="modal-description">{quickViewProduct.description}</p>

                <div className="modal-features">
                  <h4>Features:</h4>
                  <ul>
                    {quickViewProduct.features.map((feature, index) => (
                      <li key={index}>✓ {feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="modal-specs">
                  <div className="spec">
                    <span className="spec-label">Material:</span>
                    <span className="spec-value">{quickViewProduct.material}</span>
                  </div>
                  <div className="spec">
                    <span className="spec-label">Weight:</span>
                    <span className="spec-value">{quickViewProduct.weight}</span>
                  </div>
                  <div className="spec">
                    <span className="spec-label">Delivery:</span>
                    <span className="spec-value">{quickViewProduct.delivery}</span>
                  </div>
                  <div className="spec">
                    <span className="spec-label">Stock:</span>
                    <span className="spec-value">{quickViewProduct.stock} units left</span>
                  </div>
                </div>

                <div className="modal-price">
                  {quickViewProduct.discount > 0 ? (
                    <>
                      <div className="price-original">₹{quickViewProduct.originalPrice.toLocaleString()}</div>
                      <div className="price-current">₹{quickViewProduct.price.toLocaleString()}</div>
                      <div className="price-save">
                        Save ₹{(quickViewProduct.originalPrice - quickViewProduct.price).toLocaleString()} ({quickViewProduct.discount}% off)
                      </div>
                    </>
                  ) : (
                    <div className="price-current">₹{quickViewProduct.price.toLocaleString()}</div>
                  )}
                </div>

                <div className="modal-actions">
                  <button
                    className="modal-wishlist"
                    onClick={() => handleWishlistToggle(quickViewProduct, { stopPropagation: () => { } })}
                  >
                    {wishlist?.some(item => item.id === quickViewProduct.id) ? "❤️ Remove from Wishlist" : "🤍 Add to Wishlist"}
                  </button>
                  <button
                    className="modal-add-to-cart"
                    onClick={() => {
                      handleAddToCart(quickViewProduct, { stopPropagation: () => { } });
                      setQuickViewProduct(null);
                    }}
                  >
                    CART
                  </button>
                  <button
                    className="modal-buy-now"
                    onClick={() => {
                      handleAddToCart(quickViewProduct, { stopPropagation: () => { } });
                      navigate("/checkout");
                      setQuickViewProduct(null);
                    }}
                  >
                    BUY NOW
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

export default Featured;