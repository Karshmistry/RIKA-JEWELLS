// // // // import React, { useContext, useState, useEffect, useRef } from "react";
// // // // import "./Navbar.css";
// // // // import logo from "../assets/logoo.jpg";
// // // // import { CartContext } from "../context/CartContext";
// // // // import { AuthContext } from "../context/AuthContext";
// // // // import { useNavigate, useLocation } from "react-router-dom";

// // // // function Navbar() {
// // // //   const { cart, getCartTotal, clearCart } = useContext(CartContext);
// // // //   const { user, logout } = useContext(AuthContext);
// // // //   const navigate = useNavigate();
// // // //   const location = useLocation();

// // // //   const [scrolled, setScrolled] = useState(false);
// // // //   const [mobileMenu, setMobileMenu] = useState(false);
// // // //   const [profileDropdown, setProfileDropdown] = useState(false);
// // // //   const [cartDropdown, setCartDropdown] = useState(false);
// // // //   const [searchQuery, setSearchQuery] = useState("");
// // // //   const [activeCategory, setActiveCategory] = useState("home");
// // // //   const [showSearch, setShowSearch] = useState(false);
// // // //   const [notificationCount, setNotificationCount] = useState(3);

// // // //   const searchRef = useRef(null);
// // // //   const profileRef = useRef(null);
// // // //   const cartRef = useRef(null);

// // // //   const cartTotal = getCartTotal ? getCartTotal() : 
// // // //     cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);

// // // //   // Close dropdowns when clicking outside
// // // //   useEffect(() => {
// // // //     const handleClickOutside = (event) => {
// // // //       if (profileRef.current && !profileRef.current.contains(event.target)) {
// // // //         setProfileDropdown(false);
// // // //       }
// // // //       if (cartRef.current && !cartRef.current.contains(event.target)) {
// // // //         setCartDropdown(false);
// // // //       }
// // // //       if (searchRef.current && !searchRef.current.contains(event.target)) {
// // // //         setShowSearch(false);
// // // //       }
// // // //     };

// // // //     document.addEventListener('mousedown', handleClickOutside);
// // // //     return () => document.removeEventListener('mousedown', handleClickOutside);
// // // //   }, []);

// // // //   useEffect(() => {
// // // //     const handleScroll = () => {
// // // //       setScrolled(window.scrollY > 30);
// // // //     };
// // // //     window.addEventListener("scroll", handleScroll);
// // // //     return () => window.removeEventListener("scroll", handleScroll);
// // // //   }, []);

// // // //   // Update active category based on route
// // // //   useEffect(() => {
// // // //     const path = location.pathname;
// // // //     if (path === "/") setActiveCategory("home");
// // // //     else if (path.includes("/shop") || path.includes("/jewellery")) setActiveCategory("shop");
// // // //     else if (path.includes("/collection")) setActiveCategory("collection");
// // // //     else if (path.includes("/gold")) setActiveCategory("gold");
// // // //     else if (path.includes("/diamond")) setActiveCategory("diamond");
// // // //     else if (path.includes("/wedding")) setActiveCategory("wedding");
// // // //     else if (path.includes("/gift")) setActiveCategory("gift");
// // // //     else if (path.includes("/contact")) setActiveCategory("contact");
// // // //   }, [location]);

// // // //   const scrollToSection = (id) => {
// // // //     if (location.pathname !== "/") {
// // // //       navigate("/");
// // // //       setTimeout(() => {
// // // //         const section = document.getElementById(id);
// // // //         if (section) {
// // // //           section.scrollIntoView({ behavior: "smooth" });
// // // //           setActiveCategory(id);
// // // //         }
// // // //       }, 500);
// // // //     } else {
// // // //       const section = document.getElementById(id);
// // // //       if (section) {
// // // //         section.scrollIntoView({ behavior: "smooth" });
// // // //         setActiveCategory(id);
// // // //       }
// // // //     }
// // // //   };

// // // //   const handleSearch = (e) => {
// // // //     e.preventDefault();
// // // //     if (searchQuery.trim()) {
// // // //       navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
// // // //       setSearchQuery("");
// // // //       setShowSearch(false);
// // // //     }
// // // //   };

// // // //   const quickCategories = [
// // // //     "Diamond Rings", "Gold Necklaces", "Wedding Sets", "Earrings", "Bracelets", "Men's Jewellery"
// // // //   ];

// // // //   const navCategories = [
// // // //     { 
// // // //       id: "home", 
// // // //       label: "Home", 
// // // //       icon: "🏠", 
// // // //       onClick: () => scrollToSection("hero"),
// // // //       submenu: []
// // // //     },
// // // //     { 
// // // //       id: "shop", 
// // // //       label: "Shop", 
// // // //       icon: "💎", 
// // // //       onClick: () => scrollToSection("shop"),
// // // //       submenu: [
// // // //         { label: "All Products", path: "/shop" },
// // // //         { label: "New Arrivals", path: "/shop/new" },
// // // //         { label: "Best Sellers", path: "/shop/bestsellers" },
// // // //         { label: "Sale", path: "/shop/sale" }
// // // //       ]
// // // //     },
// // // //     { 
// // // //       id: "collections", 
// // // //       label: "Collections", 
// // // //       icon: "📚", 
// // // //       onClick: () => scrollToSection("collection"),
// // // //       submenu: [
// // // //         { label: "Bridal Collection", path: "/collections/bridal" },
// // // //         { label: "Luxury Diamonds", path: "/collections/diamonds" },
// // // //         { label: "Everyday Wear", path: "/collections/everyday" },
// // // //         { label: "Festive Special", path: "/collections/festive" }
// // // //       ]
// // // //     },
// // // //     { 
// // // //       id: "gold", 
// // // //       label: "Gold", 
// // // //       icon: "💰", 
// // // //       onClick: () => navigate("/gold"),
// // // //       submenu: [
// // // //         { label: "22K Gold", path: "/gold/22k" },
// // // //         { label: "18K Gold", path: "/gold/18k" },
// // // //         { label: "Gold Coins", path: "/gold/coins" },
// // // //         { label: "Gold Bars", path: "/gold/bars" }
// // // //       ]
// // // //     },
// // // //     { 
// // // //       id: "diamond", 
// // // //       label: "Diamonds", 
// // // //       icon: "💎", 
// // // //       onClick: () => navigate("/diamonds"),
// // // //       submenu: [
// // // //         { label: "Solitaire", path: "/diamonds/solitaire" },
// // // //         { label: "Certified Diamonds", path: "/diamonds/certified" },
// // // //         { label: "Diamond Sets", path: "/diamonds/sets" }
// // // //       ]
// // // //     },
// // // //     { 
// // // //       id: "wedding", 
// // // //       label: "Wedding", 
// // // //       icon: "💍", 
// // // //       onClick: () => navigate("/wedding"),
// // // //       submenu: [
// // // //         { label: "Bridal Sets", path: "/wedding/bridal" },
// // // //         { label: "Mangalsutra", path: "/wedding/mangalsutra" },
// // // //         { label: "Groom Collection", path: "/wedding/groom" }
// // // //       ]
// // // //     },
// // // //     { 
// // // //       id: "gift", 
// // // //       label: "Gifts", 
// // // //       icon: "🎁", 
// // // //       onClick: () => navigate("/gifts"),
// // // //       submenu: [
// // // //         { label: "Anniversary", path: "/gifts/anniversary" },
// // // //         { label: "Birthday", path: "/gifts/birthday" },
// // // //         { label: "Corporate", path: "/gifts/corporate" }
// // // //       ]
// // // //     }
// // // //   ];

// // // //   const userMenuItems = user ? [
// // // //     { label: "My Profile", icon: "👤", onClick: () => navigate("/profile") },
// // // //     { label: "My Orders", icon: "📦", onClick: () => navigate("/orders") },
// // // //     { label: "Wishlist", icon: "❤️", onClick: () => navigate("/wishlist") },
// // // //     { label: "Saved Cards", icon: "💳", onClick: () => navigate("/profile/payments") },
// // // //     { label: "Address Book", icon: "🏠", onClick: () => navigate("/profile/addresses") },
// // // //     { label: "Notifications", icon: "🔔", badge: notificationCount, onClick: () => navigate("/notifications") },
// // // //     { label: "Logout", icon: "🚪", onClick: logout },
// // // //   ] : [
// // // //     { label: "Login / Sign Up", icon: "🔐", onClick: () => navigate("/login") },
// // // //     { label: "Track Order", icon: "📍", onClick: () => navigate("/track-order") },
// // // //     { label: "Guest Checkout", icon: "🛒", onClick: () => navigate("/guest-checkout") },
// // // //   ];

// // // //   const handleCartAction = (action, itemId = null) => {
// // // //     switch(action) {
// // // //       case 'checkout':
// // // //         navigate("/checkout");
// // // //         setCartDropdown(false);
// // // //         break;
// // // //       case 'clear':
// // // //         if (window.confirm("Are you sure you want to clear your cart?")) {
// // // //           clearCart();
// // // //         }
// // // //         break;
// // // //       case 'remove':
// // // //         // Remove item logic here
// // // //         break;
// // // //       default:
// // // //         navigate("/cart");
// // // //         setCartDropdown(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <>
// // // //       {/* ===== TOP PROMO BAR ===== */}
// // // //       <div className="promo-bar">
// // // //         <div className="promo-slider">
// // // //           <div className="promo-slide">
// // // //             🚚 <strong>FREE SHIPPING</strong> on orders above ₹10,000
// // // //           </div>
// // // //           <div className="promo-slide">
// // // //             💎 <strong>BIS HALLMARKED</strong> | 100% Certified Jewellery
// // // //           </div>
// // // //           <div className="promo-slide">
// // // //             🔒 <strong>SECURE PAYMENT</strong> | Easy EMI Options Available
// // // //           </div>
// // // //           <div className="promo-slide">
// // // //             🎁 <strong>DIWALI SALE</strong> | Up to 50% OFF + Extra 10%
// // // //           </div>
// // // //         </div>
// // // //         <div className="promo-close">✕</div>
// // // //       </div>

// // // //       {/* ===== MAIN NAVBAR ===== */}
// // // //       <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
// // // //         <div className="nav-container">

// // // //           {/* LOGO SECTION */}
// // // //           <div className="nav-logo" onClick={() => navigate("/")}>
// // // //             <div className="logo-wrapper">
// // // //               <img src={logo} alt="Rika Jewels" className="logo-image" />
// // // //               <div className="logo-text">
// // // //                 <h1 className="logo-name">RIKA JEWELS</h1>
// // // //                 <p className="logo-tagline">Since 2026 • Pure & Precious</p>
// // // //               </div>
// // // //             </div>
// // // //           </div>

// // // //           {/* SEARCH BAR */}
// // // //           <div className="nav-search" ref={searchRef}>
// // // //             <div className={`search-wrapper ${showSearch ? 'expanded' : ''}`}>
// // // //               <form onSubmit={handleSearch} className="search-form">
// // // //                 <input
// // // //                   type="text"
// // // //                   placeholder="Search diamonds, gold, rings, necklaces..."
// // // //                   value={searchQuery}
// // // //                   onChange={(e) => setSearchQuery(e.target.value)}
// // // //                   className="search-input"
// // // //                   onFocus={() => setShowSearch(true)}
// // // //                 />
// // // //                 <button type="submit" className="search-button">
// // // //                   <span className="search-icon">🔍</span>
// // // //                   <span className="search-text">Search</span>
// // // //                 </button>
// // // //               </form>

// // // //               {showSearch && (
// // // //                 <div className="search-dropdown">
// // // //                   <div className="search-quick-categories">
// // // //                     <h4>Quick Categories:</h4>
// // // //                     <div className="quick-tags">
// // // //                       {quickCategories.map((category, index) => (
// // // //                         <span 
// // // //                           key={index} 
// // // //                           className="quick-tag"
// // // //                           onClick={() => {
// // // //                             navigate(`/search?q=${encodeURIComponent(category)}`);
// // // //                             setShowSearch(false);
// // // //                           }}
// // // //                         >
// // // //                           {category}
// // // //                         </span>
// // // //                       ))}
// // // //                     </div>
// // // //                   </div>
// // // //                   <div className="search-recent">
// // // //                     <h4>Recent Searches:</h4>
// // // //                     <div className="recent-list">
// // // //                       <span className="recent-item">💍 Diamond Rings</span>
// // // //                       <span className="recent-item">💰 Gold Coins</span>
// // // //                       <span className="recent-item">📿 Mangalsutra</span>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>
// // // //               )}
// // // //             </div>
// // // //           </div>

// // // //           {/* ACTION BUTTONS */}
// // // //           <div className="nav-actions">
// // // //             {/* STORE LOCATOR */}
// // // //             <button className="action-btn store-btn" onClick={() => navigate("/stores")}>
// // // //               <span className="btn-icon">📍</span>
// // // //               <span className="btn-text">Stores</span>
// // // //             </button>

// // // //             {/* WISHLIST */}
// // // //             <button className="action-btn wishlist-btn" onClick={() => navigate("/wishlist")}>
// // // //               <span className="btn-icon">❤️</span>
// // // //               <span className="btn-text">Wishlist</span>
// // // //               <span className="btn-badge">5</span>
// // // //             </button>

// // // //             {/* CART */}
// // // //             <div className="cart-container" ref={cartRef}>
// // // //               <button 
// // // //                 className="action-btn cart-btn"
// // // //                 onClick={() => setCartDropdown(!cartDropdown)}
// // // //               >
// // // //                 <span className="btn-icon">🛒</span>
// // // //                 <span className="btn-text">Cart</span>
// // // //                 {cart.length > 0 && (
// // // //                   <span className="btn-badge cart-badge">{cart.length}</span>
// // // //                 )}
// // // //               </button>

// // // //               {cartDropdown && (
// // // //                 <div className="cart-dropdown">
// // // //                   <div className="cart-dropdown-header">
// // // //                     <h3>Your Shopping Cart</h3>
// // // //                     <span className="cart-total">Total: ₹{cartTotal.toLocaleString()}</span>
// // // //                   </div>

// // // //                   {cart.length > 0 ? (
// // // //                     <>
// // // //                       <div className="cart-items-list">
// // // //                         {cart.slice(0, 3).map((item, index) => (
// // // //                           <div key={index} className="cart-dropdown-item">
// // // //                             <img src={item.image} alt={item.name} className="item-image" />
// // // //                             <div className="item-details">
// // // //                               <h4 className="item-name">{item.name}</h4>
// // // //                               <p className="item-price">₹{item.price.toLocaleString()} × {item.quantity || 1}</p>
// // // //                               <div className="item-actions">
// // // //                                 <button className="item-action-btn" title="Remove">🗑️</button>
// // // //                                 <button className="item-action-btn" title="Save for later">❤️</button>
// // // //                               </div>
// // // //                             </div>
// // // //                           </div>
// // // //                         ))}
// // // //                       </div>

// // // //                       {cart.length > 3 && (
// // // //                         <div className="cart-more-items">
// // // //                           +{cart.length - 3} more items
// // // //                         </div>
// // // //                       )}

// // // //                       <div className="cart-dropdown-actions">
// // // //                         <button 
// // // //                           className="cart-action-btn view-cart"
// // // //                           onClick={() => handleCartAction('view')}
// // // //                         >
// // // //                           View Full Cart
// // // //                         </button>
// // // //                         <button 
// // // //                           className="cart-action-btn checkout"
// // // //                           onClick={() => handleCartAction('checkout')}
// // // //                         >
// // // //                           Proceed to Checkout
// // // //                         </button>
// // // //                         <button 
// // // //                           className="cart-action-btn clear"
// // // //                           onClick={() => handleCartAction('clear')}
// // // //                         >
// // // //                           Clear Cart
// // // //                         </button>
// // // //                       </div>
// // // //                     </>
// // // //                   ) : (
// // // //                     <div className="cart-empty">
// // // //                       <div className="empty-icon">🛒</div>
// // // //                       <p>Your cart is empty</p>
// // // //                       <button 
// // // //                         className="shop-now-btn"
// // // //                         onClick={() => {
// // // //                           navigate("/shop");
// // // //                           setCartDropdown(false);
// // // //                         }}
// // // //                       >
// // // //                         Start Shopping
// // // //                       </button>
// // // //                     </div>
// // // //                   )}
// // // //                 </div>
// // // //               )}
// // // //             </div>

// // // //             {/* PROFILE */}
// // // //             <div className="profile-container" ref={profileRef}>
// // // //               <button 
// // // //                 className="action-btn profile-btn"
// // // //                 onClick={() => setProfileDropdown(!profileDropdown)}
// // // //               >
// // // //                 <span className="btn-icon">
// // // //                   {user ? "👑" : "👤"}
// // // //                 </span>
// // // //                 <span className="btn-text">
// // // //                   {user ? (user.name?.split(' ')[0] || "Account") : "Account"}
// // // //                 </span>
// // // //               </button>

// // // //               {profileDropdown && (
// // // //                 <div className="profile-dropdown">
// // // //                   {user ? (
// // // //                     <>
// // // //                       <div className="profile-header">
// // // //                         <div className="user-avatar">
// // // //                           {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
// // // //                         </div>
// // // //                         <div className="user-info">
// // // //                           <h4 className="user-name">{user.name || "Welcome Back!"}</h4>
// // // //                           <p className="user-email">{user.email}</p>
// // // //                           <div className="user-tier">
// // // //                             <span className="tier-badge">💎 DIAMOND MEMBER</span>
// // // //                             <span className="tier-points">2,500 Points</span>
// // // //                           </div>
// // // //                         </div>
// // // //                       </div>
// // // //                       <div className="profile-stats">
// // // //                         <div className="stat-item">
// // // //                           <span className="stat-value">12</span>
// // // //                           <span className="stat-label">Orders</span>
// // // //                         </div>
// // // //                         <div className="stat-item">
// // // //                           <span className="stat-value">₹1.2L</span>
// // // //                           <span className="stat-label">Spent</span>
// // // //                         </div>
// // // //                         <div className="stat-item">
// // // //                           <span className="stat-value">5</span>
// // // //                           <span className="stat-label">Wishlist</span>
// // // //                         </div>
// // // //                       </div>
// // // //                     </>
// // // //                   ) : (
// // // //                     <div className="profile-header guest">
// // // //                       <h4>Welcome to Rika Jewels</h4>
// // // //                       <p>Sign in for better experience</p>
// // // //                       <button 
// // // //                         className="signin-btn"
// // // //                         onClick={() => {
// // // //                           navigate("/login");
// // // //                           setProfileDropdown(false);
// // // //                         }}
// // // //                       >
// // // //                         Sign In / Register
// // // //                       </button>
// // // //                     </div>
// // // //                   )}

// // // //                   <div className="dropdown-menu">
// // // //                     {userMenuItems.map((item, index) => (
// // // //                       <button
// // // //                         key={index}
// // // //                         className="dropdown-item"
// // // //                         onClick={() => {
// // // //                           item.onClick();
// // // //                           setProfileDropdown(false);
// // // //                         }}
// // // //                       >
// // // //                         <span className="item-icon">{item.icon}</span>
// // // //                         <span className="item-label">{item.label}</span>
// // // //                         {item.badge && <span className="item-badge">{item.badge}</span>}
// // // //                       </button>
// // // //                     ))}
// // // //                   </div>

// // // //                   <div className="dropdown-footer">
// // // //                     <div className="support-section">
// // // //                       <div className="support-item">
// // // //                         <span className="support-icon">📞</span>
// // // //                         <div>
// // // //                           <p className="support-title">24/7 Support</p>
// // // //                           <p className="support-number">1800-123-4567</p>
// // // //                         </div>
// // // //                       </div>
// // // //                       <button className="help-btn">Need Help?</button>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>
// // // //               )}
// // // //             </div>

// // // //             {/* MOBILE MENU TOGGLE */}
// // // //             <button 
// // // //               className="mobile-toggle"
// // // //               onClick={() => setMobileMenu(!mobileMenu)}
// // // //             >
// // // //               {mobileMenu ? "✕" : "☰"}
// // // //             </button>
// // // //           </div>
// // // //         </div>

// // // //         {/* CATEGORY NAVBAR */}
// // // //         <div className="category-nav">
// // // //           <div className="category-container">
// // // //             {navCategories.map((category) => (
// // // //               <div 
// // // //                 key={category.id}
// // // //                 className={`category-item ${activeCategory === category.id ? 'active' : ''}`}
// // // //                 onMouseEnter={(e) => {
// // // //                   if (category.submenu.length > 0) {
// // // //                     e.currentTarget.classList.add('hover');
// // // //                   }
// // // //                 }}
// // // //                 onMouseLeave={(e) => {
// // // //                   e.currentTarget.classList.remove('hover');
// // // //                 }}
// // // //               >
// // // //                 <button 
// // // //                   className="category-btn"
// // // //                   onClick={category.onClick}
// // // //                 >
// // // //                   <span className="category-icon">{category.icon}</span>
// // // //                   <span className="category-label">{category.label}</span>
// // // //                   {category.submenu.length > 0 && (
// // // //                     <span className="category-arrow">▼</span>
// // // //                   )}
// // // //                 </button>

// // // //                 {category.submenu.length > 0 && (
// // // //                   <div className="category-submenu">
// // // //                     <div className="submenu-container">
// // // //                       {category.submenu.map((subItem, index) => (
// // // //                         <button
// // // //                           key={index}
// // // //                           className="submenu-item"
// // // //                           onClick={() => navigate(subItem.path)}
// // // //                         >
// // // //                           {subItem.label}
// // // //                         </button>
// // // //                       ))}
// // // //                     </div>
// // // //                   </div>
// // // //                 )}
// // // //               </div>
// // // //             ))}
// // // //           </div>

// // // //           {/* SPECIAL OFFER BADGE */}
// // // //           <div className="special-offer">
// // // //             <span className="offer-badge"></span>
// // // //           </div>
// // // //         </div>
// // // //       </nav>

// // // //       {/* MOBILE MENU OVERLAY */}
// // // //       {mobileMenu && (
// // // //         <div className="mobile-menu-overlay">
// // // //           <div className="mobile-menu-container">
// // // //             <div className="mobile-menu-header">
// // // //               <div className="mobile-user-info">
// // // //                 {user ? (
// // // //                   <>
// // // //                     <div className="mobile-user-avatar">
// // // //                       {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
// // // //                     </div>
// // // //                     <div>
// // // //                       <h4>{user.name || "User"}</h4>
// // // //                       <p>{user.email}</p>
// // // //                     </div>
// // // //                   </>
// // // //                 ) : (
// // // //                   <>
// // // //                     <div className="mobile-user-avatar">👤</div>
// // // //                     <div>
// // // //                       <h4>Welcome Guest</h4>
// // // //                       <p>Sign in for better experience</p>
// // // //                     </div>
// // // //                   </>
// // // //                 )}
// // // //               </div>
// // // //               <button 
// // // //                 className="mobile-close"
// // // //                 onClick={() => setMobileMenu(false)}
// // // //               >
// // // //                 ✕
// // // //               </button>
// // // //             </div>

// // // //             <div className="mobile-search-box">
// // // //               <form onSubmit={handleSearch}>
// // // //                 <input
// // // //                   type="text"
// // // //                   placeholder="Search jewellery..."
// // // //                   value={searchQuery}
// // // //                   onChange={(e) => setSearchQuery(e.target.value)}
// // // //                 />
// // // //                 <button type="submit">🔍</button>
// // // //               </form>
// // // //             </div>

// // // //             <div className="mobile-nav">
// // // //               {navCategories.map((category) => (
// // // //                 <div key={category.id} className="mobile-nav-category">
// // // //                   <button 
// // // //                     className="mobile-nav-btn"
// // // //                     onClick={() => {
// // // //                       category.onClick();
// // // //                       setMobileMenu(false);
// // // //                     }}
// // // //                   >
// // // //                     <span className="mobile-nav-icon">{category.icon}</span>
// // // //                     {category.label}
// // // //                     {category.submenu.length > 0 && <span className="mobile-arrow">›</span>}
// // // //                   </button>

// // // //                   {category.submenu.length > 0 && (
// // // //                     <div className="mobile-submenu">
// // // //                       {category.submenu.map((subItem, index) => (
// // // //                         <button
// // // //                           key={index}
// // // //                           className="mobile-submenu-item"
// // // //                           onClick={() => {
// // // //                             navigate(subItem.path);
// // // //                             setMobileMenu(false);
// // // //                           }}
// // // //                         >
// // // //                           {subItem.label}
// // // //                         </button>
// // // //                       ))}
// // // //                     </div>
// // // //                   )}
// // // //                 </div>
// // // //               ))}
// // // //             </div>

// // // //             <div className="mobile-actions">
// // // //               <button className="mobile-action-btn" onClick={() => navigate("/stores")}>
// // // //                 <span>📍</span> Store Locator
// // // //               </button>
// // // //               <button className="mobile-action-btn" onClick={() => navigate("/track-order")}>
// // // //                 <span>📦</span> Track Order
// // // //               </button>
// // // //               <button className="mobile-action-btn" onClick={() => navigate("/contact")}>
// // // //                 <span>📞</span> Contact Us
// // // //               </button>
// // // //             </div>

// // // //             <div className="mobile-footer">
// // // //               {user ? (
// // // //                 <button className="mobile-logout" onClick={logout}>
// // // //                   🚪 Logout
// // // //                 </button>
// // // //               ) : (
// // // //                 <button 
// // // //                   className="mobile-signin"
// // // //                   onClick={() => {
// // // //                     navigate("/login");
// // // //                     setMobileMenu(false);
// // // //                   }}
// // // //                 >
// // // //                   🔐 Sign In / Register
// // // //                 </button>
// // // //               )}
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}
// // // //     </>
// // // //   );
// // // // }

// // // // export default Navbar;




// // // import React, { useContext, useState, useEffect, useRef } from "react";
// // // import "./Navbar.css";
// // // import logo from "../assets/logoo.jpg";
// // // import { CartContext } from "../context/CartContext";
// // // import { AuthContext } from "../context/AuthContext";
// // // import { useNavigate, useLocation } from "react-router-dom";

// // // function Navbar() {
// // //   const { cart, getCartTotal, clearCart } = useContext(CartContext);
// // //   const { user, logout } = useContext(AuthContext);
// // //   const navigate = useNavigate();
// // //   const location = useLocation();

// // //   const [scrolled, setScrolled] = useState(false);
// // //   const [mobileMenu, setMobileMenu] = useState(false);
// // //   const [profileDropdown, setProfileDropdown] = useState(false);
// // //   const [cartDropdown, setCartDropdown] = useState(false);
// // //   const [searchQuery, setSearchQuery] = useState("");
// // //   const [activeCategory, setActiveCategory] = useState("home");
// // //   const [showSearch, setShowSearch] = useState(false);
// // //   const [notificationCount, setNotificationCount] = useState(3);
// // //   const [wishlistCount, setWishlistCount] = useState(5); // Dynamic wishlist count

// // //   const searchRef = useRef(null);
// // //   const profileRef = useRef(null);
// // //   const cartRef = useRef(null);

// // //   const cartTotal = getCartTotal ? getCartTotal() : 
// // //     cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);

// // //   // Close dropdowns when clicking outside
// // //   useEffect(() => {
// // //     const handleClickOutside = (event) => {
// // //       if (profileRef.current && !profileRef.current.contains(event.target)) {
// // //         setProfileDropdown(false);
// // //       }
// // //       if (cartRef.current && !cartRef.current.contains(event.target)) {
// // //         setCartDropdown(false);
// // //       }
// // //       if (searchRef.current && !searchRef.current.contains(event.target)) {
// // //         setShowSearch(false);
// // //       }
// // //     };

// // //     document.addEventListener('mousedown', handleClickOutside);
// // //     return () => document.removeEventListener('mousedown', handleClickOutside);
// // //   }, []);

// // //   useEffect(() => {
// // //     const handleScroll = () => {
// // //       setScrolled(window.scrollY > 30);
// // //     };
// // //     window.addEventListener("scroll", handleScroll);
// // //     return () => window.removeEventListener("scroll", handleScroll);
// // //   }, []);

// // //   // Update active category based on route
// // //   useEffect(() => {
// // //     const path = location.pathname;
// // //     if (path === "/") setActiveCategory("home");
// // //     else if (path.includes("/shop") || path.includes("/jewellery")) setActiveCategory("shop");
// // //     else if (path.includes("/collection")) setActiveCategory("collection");
// // //     else if (path.includes("/gold")) setActiveCategory("gold");
// // //     else if (path.includes("/diamond")) setActiveCategory("diamond");
// // //     else if (path.includes("/wedding")) setActiveCategory("wedding");
// // //     else if (path.includes("/gift")) setActiveCategory("gift");
// // //     else if (path.includes("/contact")) setActiveCategory("contact");
// // //   }, [location]);

// // //   const scrollToSection = (id) => {
// // //     if (location.pathname !== "/") {
// // //       navigate("/");
// // //       setTimeout(() => {
// // //         const section = document.getElementById(id);
// // //         if (section) {
// // //           section.scrollIntoView({ behavior: "smooth" });
// // //           setActiveCategory(id);
// // //         }
// // //       }, 500);
// // //     } else {
// // //       const section = document.getElementById(id);
// // //       if (section) {
// // //         section.scrollIntoView({ behavior: "smooth" });
// // //         setActiveCategory(id);
// // //       }
// // //     }
// // //   };

// // //   const handleSearch = (e) => {
// // //     e.preventDefault();
// // //     if (searchQuery.trim()) {
// // //       navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
// // //       setSearchQuery("");
// // //       setShowSearch(false);
// // //     }
// // //   };

// // //   const quickCategories = [
// // //     "Diamond Rings", "Gold Necklaces", "Wedding Sets", "Earrings", "Bracelets", "Men's Jewellery"
// // //   ];

// // //   const navCategories = [
// // //     { 
// // //       id: "home", 
// // //       label: "Home", 
// // //       icon: "🏠", 
// // //       onClick: () => scrollToSection("hero"),
// // //       submenu: []
// // //     },
// // //     { 
// // //       id: "shop", 
// // //       label: "Shop", 
// // //       icon: "💎", 
// // //       onClick: () => scrollToSection("shop"),
// // //       submenu: [
// // //         { label: "All Products", path: "/shop" },
// // //         { label: "New Arrivals", path: "/shop/new" },
// // //         { label: "Best Sellers", path: "/shop/bestsellers" },
// // //         { label: "Sale", path: "/shop/sale" }
// // //       ]
// // //     },
// // //     { 
// // //       id: "collections", 
// // //       label: "Collections", 
// // //       icon: "📚", 
// // //       onClick: () => scrollToSection("collection"),
// // //       submenu: [
// // //         { label: "Bridal Collection", path: "/collections/bridal" },
// // //         { label: "Luxury Diamonds", path: "/collections/diamonds" },
// // //         { label: "Everyday Wear", path: "/collections/everyday" },
// // //         { label: "Festive Special", path: "/collections/festive" }
// // //       ]
// // //     },
// // //     { 
// // //       id: "gold", 
// // //       label: "Gold", 
// // //       icon: "💰", 
// // //       onClick: () => navigate("/gold"),
// // //       submenu: [
// // //         { label: "22K Gold", path: "/gold/22k" },
// // //         { label: "18K Gold", path: "/gold/18k" },
// // //         { label: "Gold Coins", path: "/gold/coins" },
// // //         { label: "Gold Bars", path: "/gold/bars" }
// // //       ]
// // //     },
// // //     { 
// // //       id: "diamond", 
// // //       label: "Diamonds", 
// // //       icon: "💎", 
// // //       onClick: () => navigate("/diamonds"),
// // //       submenu: [
// // //         { label: "Solitaire", path: "/diamonds/solitaire" },
// // //         { label: "Certified Diamonds", path: "/diamonds/certified" },
// // //         { label: "Diamond Sets", path: "/diamonds/sets" }
// // //       ]
// // //     },
// // //     { 
// // //       id: "wedding", 
// // //       label: "Wedding", 
// // //       icon: "💍", 
// // //       onClick: () => navigate("/wedding"),
// // //       submenu: [
// // //         { label: "Bridal Sets", path: "/wedding/bridal" },
// // //         { label: "Mangalsutra", path: "/wedding/mangalsutra" },
// // //         { label: "Groom Collection", path: "/wedding/groom" }
// // //       ]
// // //     },
// // //     { 
// // //       id: "gift", 
// // //       label: "Gifts", 
// // //       icon: "🎁", 
// // //       onClick: () => navigate("/gifts"),
// // //       submenu: [
// // //         { label: "Anniversary", path: "/gifts/anniversary" },
// // //         { label: "Birthday", path: "/gifts/birthday" },
// // //         { label: "Corporate", path: "/gifts/corporate" }
// // //       ]
// // //     }
// // //   ];

// // //   const userMenuItems = user ? [
// // //     { label: "My Profile", icon: "👤", onClick: () => navigate("/profile") },
// // //     { label: "My Orders", icon: "📦", onClick: () => navigate("/orders") },
// // //     { label: "Wishlist", icon: "❤️", badge: wishlistCount, onClick: () => navigate("/wishlist") },
// // //     { label: "Saved Cards", icon: "💳", onClick: () => navigate("/profile/payments") },
// // //     { label: "Address Book", icon: "🏠", onClick: () => navigate("/profile/addresses") },
// // //     { label: "Notifications", icon: "🔔", badge: notificationCount, onClick: () => navigate("/notifications") },
// // //     { label: "Stores", icon: "📍", onClick: () => navigate("/stores") },
// // //     { label: "Logout", icon: "🚪", onClick: logout },
// // //   ] : [
// // //     { label: "Login / Sign Up", icon: "🔐", onClick: () => navigate("/login") },
// // //     { label: "Track Order", icon: "📍", onClick: () => navigate("/track-order") },
// // //     { label: "Guest Checkout", icon: "🛒", onClick: () => navigate("/guest-checkout") },
// // //     { label: "Store Locator", icon: "📍", onClick: () => navigate("/stores") },
// // //   ];

// // //   const handleCartAction = (action, itemId = null) => {
// // //     switch(action) {
// // //       case 'checkout':
// // //         navigate("/checkout");
// // //         setCartDropdown(false);
// // //         break;
// // //       case 'clear':
// // //         if (window.confirm("Are you sure you want to clear your cart?")) {
// // //           clearCart();
// // //         }
// // //         break;
// // //       case 'remove':
// // //         // Remove item logic here
// // //         break;
// // //       default:
// // //         navigate("/cart");
// // //         setCartDropdown(false);
// // //     }
// // //   };

// // //   return (
// // //     <>
// // //       {/* ===== TOP PROMO BAR ===== */}
// // //       <div className="promo-bar">
// // //         <div className="promo-slider">
// // //           <div className="promo-slide">
// // //             🚚 <strong>FREE SHIPPING</strong> on orders above ₹10,000
// // //           </div>
// // //           <div className="promo-slide">
// // //             💎 <strong>BIS HALLMARKED</strong> | 100% Certified Jewellery
// // //           </div>
// // //           <div className="promo-slide">
// // //             🔒 <strong>SECURE PAYMENT</strong> | Easy EMI Options Available
// // //           </div>
// // //           <div className="promo-slide">
// // //             🎁 <strong>DIWALI SALE</strong> | Up to 50% OFF + Extra 10%
// // //           </div>
// // //         </div>
// // //         <div className="promo-close">✕</div>
// // //       </div>

// // //       {/* ===== MAIN NAVBAR ===== */}
// // //       <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
// // //         <div className="nav-container">

// // //           {/* LOGO SECTION */}
// // //           <div className="nav-logo" onClick={() => navigate("/")}>
// // //             <div className="logo-wrapper">
// // //               <img src={logo} alt="Rika Jewels" className="logo-image" />
// // //               <div className="logo-text">
// // //                 <h1 className="logo-name">RIKA JEWELS</h1>
// // //                 <p className="logo-tagline">Since 2026 • Pure & Precious</p>
// // //               </div>
// // //             </div>
// // //           </div>

// // //           {/* SEARCH BAR */}
// // //           <div className="nav-search" ref={searchRef}>
// // //             <div className={`search-wrapper ${showSearch ? 'expanded' : ''}`}>
// // //               <form onSubmit={handleSearch} className="search-form">
// // //                 <input
// // //                   type="text"
// // //                   placeholder="Search diamonds, gold, rings, necklaces..."
// // //                   value={searchQuery}
// // //                   onChange={(e) => setSearchQuery(e.target.value)}
// // //                   className="search-input"
// // //                   onFocus={() => setShowSearch(true)}
// // //                 />
// // //                 <button type="submit" className="search-button">
// // //                   <span className="search-icon">🔍</span>
// // //                   <span className="search-text">Search</span>
// // //                 </button>
// // //               </form>

// // //               {showSearch && (
// // //                 <div className="search-dropdown">
// // //                   <div className="search-quick-categories">
// // //                     <h4>Quick Categories:</h4>
// // //                     <div className="quick-tags">
// // //                       {quickCategories.map((category, index) => (
// // //                         <span 
// // //                           key={index} 
// // //                           className="quick-tag"
// // //                           onClick={() => {
// // //                             navigate(`/search?q=${encodeURIComponent(category)}`);
// // //                             setShowSearch(false);
// // //                           }}
// // //                         >
// // //                           {category}
// // //                         </span>
// // //                       ))}
// // //                     </div>
// // //                   </div>
// // //                   <div className="search-recent">
// // //                     <h4>Recent Searches:</h4>
// // //                     <div className="recent-list">
// // //                       <span className="recent-item">💍 Diamond Rings</span>
// // //                       <span className="recent-item">💰 Gold Coins</span>
// // //                       <span className="recent-item">📿 Mangalsutra</span>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </div>

// // //           {/* ACTION BUTTONS - Updated layout */}
// // //           <div className="nav-actions">
// // //             {/* Store, Cart, Account, Wishlist in horizontal layout */}
// // //             <div className="nav-actions-row">
// // //               {/* STORE */}
// // //               <button 
// // //                 className="nav-action-btn store-btn"
// // //                 onClick={() => navigate("/stores")}
// // //                 title="Store Locator"
// // //               >
// // //                 <span className="nav-action-icon">📍</span>
// // //                 <span className="nav-action-label">Store</span>
// // //               </button>

// // //               {/* CART */}
// // //               <div className="nav-action-btn-container cart-container" ref={cartRef}>
// // //                 <button 
// // //                   className="nav-action-btn cart-btn"
// // //                   onClick={() => setCartDropdown(!cartDropdown)}
// // //                   title="Shopping Cart"
// // //                 >
// // //                   <span className="nav-action-icon">🛒</span>
// // //                   <span className="nav-action-label">Cart</span>
// // //                   {cart.length > 0 && (
// // //                     <span className="nav-action-badge cart-badge">{cart.length}</span>
// // //                   )}
// // //                 </button>

// // //                 {cartDropdown && (
// // //                   <div className="cart-dropdown">
// // //                     <div className="cart-dropdown-header">
// // //                       <h3>Your Shopping Cart</h3>
// // //                       <span className="cart-total">Total: ₹{cartTotal.toLocaleString()}</span>
// // //                     </div>

// // //                     {cart.length > 0 ? (
// // //                       <>
// // //                         <div className="cart-items-list">
// // //                           {cart.slice(0, 3).map((item, index) => (
// // //                             <div key={index} className="cart-dropdown-item">
// // //                               <img src={item.image} alt={item.name} className="item-image" />
// // //                               <div className="item-details">
// // //                                 <h4 className="item-name">{item.name}</h4>
// // //                                 <p className="item-price">₹{item.price.toLocaleString()} × {item.quantity || 1}</p>
// // //                                 <div className="item-actions">
// // //                                   <button className="item-action-btn" title="Remove">🗑️</button>
// // //                                   <button className="item-action-btn" title="Save for later">❤️</button>
// // //                                 </div>
// // //                               </div>
// // //                             </div>
// // //                           ))}
// // //                         </div>

// // //                         {cart.length > 3 && (
// // //                           <div className="cart-more-items">
// // //                             +{cart.length - 3} more items
// // //                           </div>
// // //                         )}

// // //                         <div className="cart-dropdown-actions">
// // //                           <button 
// // //                             className="cart-action-btn view-cart"
// // //                             onClick={() => handleCartAction('view')}
// // //                           >
// // //                             View Full Cart
// // //                           </button>
// // //                           <button 
// // //                             className="cart-action-btn checkout"
// // //                             onClick={() => handleCartAction('checkout')}
// // //                           >
// // //                             Proceed to Checkout
// // //                           </button>
// // //                           <button 
// // //                             className="cart-action-btn clear"
// // //                             onClick={() => handleCartAction('clear')}
// // //                           >
// // //                             Clear Cart
// // //                           </button>
// // //                         </div>
// // //                       </>
// // //                     ) : (
// // //                       <div className="cart-empty">
// // //                         <div className="empty-icon">🛒</div>
// // //                         <p>Your cart is empty</p>
// // //                         <button 
// // //                           className="shop-now-btn"
// // //                           onClick={() => {
// // //                             navigate("/shop");
// // //                             setCartDropdown(false);
// // //                           }}
// // //                         >
// // //                           Start Shopping
// // //                         </button>
// // //                       </div>
// // //                     )}
// // //                   </div>
// // //                 )}
// // //               </div>

// // //               {/* PROFILE/ACCOUNT */}
// // //               <div className="nav-action-btn-container profile-container" ref={profileRef}>
// // //                 <button 
// // //                   className="nav-action-btn profile-btn"
// // //                   onClick={() => setProfileDropdown(!profileDropdown)}
// // //                   title={user ? "My Account" : "Account"}
// // //                 >
// // //                   <span className="nav-action-icon">
// // //                     {user ? "👤" : "👤"}
// // //                   </span>
// // //                   <span className="nav-action-label">
// // //                     {user ? "Account" : "Account"}
// // //                   </span>
// // //                 </button>

// // //                 {profileDropdown && (
// // //                   <div className="profile-dropdown">
// // //                     {user ? (
// // //                       <>
// // //                         <div className="profile-header">
// // //                           <div className="user-avatar">
// // //                             {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
// // //                           </div>
// // //                           <div className="user-info">
// // //                             <h4 className="user-name">{user.name || "Welcome Back!"}</h4>
// // //                             <p className="user-email">{user.email}</p>
// // //                             <div className="user-tier">
// // //                               <span className="tier-badge">💎 DIAMOND MEMBER</span>
// // //                               <span className="tier-points">2,500 Points</span>
// // //                             </div>
// // //                           </div>
// // //                         </div>
// // //                         <div className="profile-stats">
// // //                           <div className="stat-item">
// // //                             <span className="stat-value">12</span>
// // //                             <span className="stat-label">Orders</span>
// // //                           </div>
// // //                           <div className="stat-item">
// // //                             <span className="stat-value">₹1.2L</span>
// // //                             <span className="stat-label">Spent</span>
// // //                           </div>
// // //                           <div className="stat-item">
// // //                             <span className="stat-value">{wishlistCount}</span>
// // //                             <span className="stat-label">Wishlist</span>
// // //                           </div>
// // //                         </div>
// // //                       </>
// // //                     ) : (
// // //                       <div className="profile-header guest">
// // //                         <h4>Welcome to Rika Jewels</h4>
// // //                         <p>Sign in for better experience</p>
// // //                         <button 
// // //                           className="signin-btn"
// // //                           onClick={() => {
// // //                             navigate("/login");
// // //                             setProfileDropdown(false);
// // //                           }}
// // //                         >
// // //                           Sign In / Register
// // //                         </button>
// // //                       </div>
// // //                     )}

// // //                     <div className="dropdown-menu">
// // //                       {userMenuItems.map((item, index) => (
// // //                         <button
// // //                           key={index}
// // //                           className="dropdown-item"
// // //                           onClick={() => {
// // //                             item.onClick();
// // //                             setProfileDropdown(false);
// // //                           }}
// // //                         >
// // //                           <span className="item-icon">{item.icon}</span>
// // //                           <span className="item-label">{item.label}</span>
// // //                           {item.badge && <span className="item-badge">{item.badge}</span>}
// // //                         </button>
// // //                       ))}
// // //                     </div>

// // //                     <div className="dropdown-footer">
// // //                       <div className="support-section">
// // //                         <div className="support-item">
// // //                           <span className="support-icon">📞</span>
// // //                           <div>
// // //                             <p className="support-title">24/7 Support</p>
// // //                             <p className="support-number">1800-123-4567</p>
// // //                           </div>
// // //                         </div>
// // //                         <button className="help-btn">Need Help?</button>
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 )}
// // //               </div>

// // //               {/* WISHLIST */}
// // //               <button 
// // //                 className="nav-action-btn wishlist-btn"
// // //                 onClick={() => navigate("/wishlist")}
// // //                 title="My Wishlist"
// // //               >
// // //                 <span className="nav-action-icon">❤️</span>
// // //                 <span className="nav-action-label">Wishlist</span>
// // //                 {wishlistCount > 0 && (
// // //                   <span className="nav-action-badge wishlist-badge">{wishlistCount}</span>
// // //                 )}
// // //               </button>
// // //             </div>

// // //             {/* MOBILE MENU TOGGLE */}
// // //             <button 
// // //               className="mobile-toggle"
// // //               onClick={() => setMobileMenu(!mobileMenu)}
// // //             >
// // //               {mobileMenu ? "✕" : "☰"}
// // //             </button>
// // //           </div>
// // //         </div>

// // //         {/* CATEGORY NAVBAR */}
// // //         <div className="category-nav">
// // //           <div className="category-container">
// // //             {navCategories.map((category) => (
// // //               <div 
// // //                 key={category.id}
// // //                 className={`category-item ${activeCategory === category.id ? 'active' : ''}`}
// // //                 onMouseEnter={(e) => {
// // //                   if (category.submenu.length > 0) {
// // //                     e.currentTarget.classList.add('hover');
// // //                   }
// // //                 }}
// // //                 onMouseLeave={(e) => {
// // //                   e.currentTarget.classList.remove('hover');
// // //                 }}
// // //               >
// // //                 <button 
// // //                   className="category-btn"
// // //                   onClick={category.onClick}
// // //                 >
// // //                   <span className="category-icon">{category.icon}</span>
// // //                   <span className="category-label">{category.label}</span>
// // //                   {category.submenu.length > 0 && (
// // //                     <span className="category-arrow">▼</span>
// // //                   )}
// // //                 </button>

// // //                 {category.submenu.length > 0 && (
// // //                   <div className="category-submenu">
// // //                     <div className="submenu-container">
// // //                       {category.submenu.map((subItem, index) => (
// // //                         <button
// // //                           key={index}
// // //                           className="submenu-item"
// // //                           onClick={() => navigate(subItem.path)}
// // //                         >
// // //                           {subItem.label}
// // //                         </button>
// // //                       ))}
// // //                     </div>
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             ))}
// // //           </div>

// // //           {/* SPECIAL OFFER BADGE */}
// // //           <div className="special-offer">
// // //             <span className="offer-badge"></span>
// // //           </div>
// // //         </div>
// // //       </nav>

// // //       {/* MOBILE MENU OVERLAY */}
// // //       {mobileMenu && (
// // //         <div className="mobile-menu-overlay">
// // //           <div className="mobile-menu-container">
// // //             <div className="mobile-menu-header">
// // //               <div className="mobile-user-info">
// // //                 {user ? (
// // //                   <>
// // //                     <div className="mobile-user-avatar">
// // //                       {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
// // //                     </div>
// // //                     <div>
// // //                       <h4>{user.name || "User"}</h4>
// // //                       <p>{user.email}</p>
// // //                     </div>
// // //                   </>
// // //                 ) : (
// // //                   <>
// // //                     <div className="mobile-user-avatar">👤</div>
// // //                     <div>
// // //                       <h4>Welcome Guest</h4>
// // //                       <p>Sign in for better experience</p>
// // //                     </div>
// // //                   </>
// // //                 )}
// // //               </div>
// // //               <button 
// // //                 className="mobile-close"
// // //                 onClick={() => setMobileMenu(false)}
// // //               >
// // //                 ✕
// // //               </button>
// // //             </div>

// // //             <div className="mobile-search-box">
// // //               <form onSubmit={handleSearch}>
// // //                 <input
// // //                   type="text"
// // //                   placeholder="Search jewellery..."
// // //                   value={searchQuery}
// // //                   onChange={(e) => setSearchQuery(e.target.value)}
// // //                 />
// // //                 <button type="submit">🔍</button>
// // //               </form>
// // //             </div>

// // //             <div className="mobile-nav">
// // //               {navCategories.map((category) => (
// // //                 <div key={category.id} className="mobile-nav-category">
// // //                   <button 
// // //                     className="mobile-nav-btn"
// // //                     onClick={() => {
// // //                       category.onClick();
// // //                       setMobileMenu(false);
// // //                     }}
// // //                   >
// // //                     <span className="mobile-nav-icon">{category.icon}</span>
// // //                     {category.label}
// // //                     {category.submenu.length > 0 && <span className="mobile-arrow">›</span>}
// // //                   </button>

// // //                   {category.submenu.length > 0 && (
// // //                     <div className="mobile-submenu">
// // //                       {category.submenu.map((subItem, index) => (
// // //                         <button
// // //                           key={index}
// // //                           className="mobile-submenu-item"
// // //                           onClick={() => {
// // //                             navigate(subItem.path);
// // //                             setMobileMenu(false);
// // //                           }}
// // //                         >
// // //                           {subItem.label}
// // //                         </button>
// // //                       ))}
// // //                     </div>
// // //                   )}
// // //                 </div>
// // //               ))}
// // //             </div>

// // //             {/* Mobile Action Buttons */}
// // //             <div className="mobile-actions-grid">
// // //               <button className="mobile-action-item" onClick={() => navigate("/stores")}>
// // //                 <span className="mobile-action-icon">📍</span>
// // //                 <span className="mobile-action-text">Store</span>
// // //               </button>
// // //               <button 
// // //                 className="mobile-action-item" 
// // //                 onClick={() => {
// // //                   navigate("/cart");
// // //                   setMobileMenu(false);
// // //                 }}
// // //               >
// // //                 <span className="mobile-action-icon">🛒</span>
// // //                 <span className="mobile-action-text">Cart</span>
// // //                 {cart.length > 0 && <span className="mobile-action-badge">{cart.length}</span>}
// // //               </button>
// // //               <button 
// // //                 className="mobile-action-item"
// // //                 onClick={() => {
// // //                   if (user) {
// // //                     navigate("/profile");
// // //                   } else {
// // //                     navigate("/login");
// // //                   }
// // //                   setMobileMenu(false);
// // //                 }}
// // //               >
// // //                 <span className="mobile-action-icon">👤</span>
// // //                 <span className="mobile-action-text">Account</span>
// // //               </button>
// // //               <button 
// // //                 className="mobile-action-item" 
// // //                 onClick={() => {
// // //                   navigate("/wishlist");
// // //                   setMobileMenu(false);
// // //                 }}
// // //               >
// // //                 <span className="mobile-action-icon">❤️</span>
// // //                 <span className="mobile-action-text">Wishlist</span>
// // //                 {wishlistCount > 0 && <span className="mobile-action-badge">{wishlistCount}</span>}
// // //               </button>
// // //             </div>

// // //             <div className="mobile-footer">
// // //               {user ? (
// // //                 <button className="mobile-logout" onClick={logout}>
// // //                   🚪 Logout
// // //                 </button>
// // //               ) : (
// // //                 <button 
// // //                   className="mobile-signin"
// // //                   onClick={() => {
// // //                     navigate("/login");
// // //                     setMobileMenu(false);
// // //                   }}
// // //                 >
// // //                   🔐 Sign In / Register
// // //                 </button>
// // //               )}
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </>
// // //   );
// // // }

// // // export default Navbar;

// // import React, { useContext, useState, useEffect, useRef } from "react";
// // import "./Navbar.css";
// // import logo from "../assets/logoo.jpg";
// // import { CartContext } from "../context/CartContext";
// // import { AuthContext } from "../context/AuthContext";
// // import { useNavigate, useLocation } from "react-router-dom";

// // function Navbar() {
// //   const { cart, getCartTotal, clearCart } = useContext(CartContext);
// //   const { user, logout } = useContext(AuthContext);
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   const [scrolled, setScrolled] = useState(false);
// //   const [mobileMenu, setMobileMenu] = useState(false);
// //   const [profileDropdown, setProfileDropdown] = useState(false);
// //   const [cartDropdown, setCartDropdown] = useState(false);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [activeCategory, setActiveCategory] = useState("home");
// //   const [showSearch, setShowSearch] = useState(false);

// //   const searchRef = useRef(null);
// //   const profileRef = useRef(null);
// //   const cartRef = useRef(null);

// //   const cartTotal = getCartTotal ? getCartTotal() : 
// //     cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);

// //   // Static values for notification and wishlist counts
// //   const notificationCount = 3;
// //   const wishlistCount = 5;

// //   // Close dropdowns when clicking outside
// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (profileRef.current && !profileRef.current.contains(event.target)) {
// //         setProfileDropdown(false);
// //       }
// //       if (cartRef.current && !cartRef.current.contains(event.target)) {
// //         setCartDropdown(false);
// //       }
// //       if (searchRef.current && !searchRef.current.contains(event.target)) {
// //         setShowSearch(false);
// //       }
// //     };

// //     document.addEventListener('mousedown', handleClickOutside);
// //     return () => document.removeEventListener('mousedown', handleClickOutside);
// //   }, []);

// //   useEffect(() => {
// //     const handleScroll = () => {
// //       setScrolled(window.scrollY > 30);
// //     };
// //     window.addEventListener("scroll", handleScroll);
// //     return () => window.removeEventListener("scroll", handleScroll);
// //   }, []);

// //   // Update active category based on route
// //   useEffect(() => {
// //     const path = location.pathname;
// //     if (path === "/") setActiveCategory("home");
// //     else if (path.includes("/shop") || path.includes("/jewellery")) setActiveCategory("shop");
// //     else if (path.includes("/collection")) setActiveCategory("collection");
// //     else if (path.includes("/gold")) setActiveCategory("gold");
// //     else if (path.includes("/diamond")) setActiveCategory("diamond");
// //     else if (path.includes("/wedding")) setActiveCategory("wedding");
// //     else if (path.includes("/gift")) setActiveCategory("gift");
// //     else if (path.includes("/contact")) setActiveCategory("contact");
// //   }, [location]);

// //   const scrollToSection = (id) => {
// //     if (location.pathname !== "/") {
// //       navigate("/");
// //       setTimeout(() => {
// //         const section = document.getElementById(id);
// //         if (section) {
// //           section.scrollIntoView({ behavior: "smooth" });
// //           setActiveCategory(id);
// //         }
// //       }, 500);
// //     } else {
// //       const section = document.getElementById(id);
// //       if (section) {
// //         section.scrollIntoView({ behavior: "smooth" });
// //         setActiveCategory(id);
// //       }
// //     }
// //   };

// //   const handleSearch = (e) => {
// //     e.preventDefault();
// //     if (searchQuery.trim()) {
// //       navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
// //       setSearchQuery("");
// //       setShowSearch(false);
// //     }
// //   };

// //   const quickCategories = [
// //     "Diamond Rings", "Gold Necklaces", "Wedding Sets", "Earrings", "Bracelets", "Men's Jewellery"
// //   ];

// //   const navCategories = [
// //     { 
// //       id: "home", 
// //       label: "Home", 
// //       icon: "🏠", 
// //       onClick: () => scrollToSection("hero"),
// //       submenu: []
// //     },
// //     { 
// //       id: "shop", 
// //       label: "Shop", 
// //       icon: "💎", 
// //       onClick: () => scrollToSection("shop"),
// //       submenu: [
// //         { label: "All Products", path: "/shop" },
// //         { label: "New Arrivals", path: "/shop/new" },
// //         { label: "Best Sellers", path: "/shop/bestsellers" },
// //         { label: "Sale", path: "/shop/sale" }
// //       ]
// //     },
// //     { 
// //       id: "collections", 
// //       label: "Collections", 
// //       icon: "📚", 
// //       onClick: () => scrollToSection("collection"),
// //       submenu: [
// //         { label: "Bridal Collection", path: "/collections/bridal" },
// //         { label: "Luxury Diamonds", path: "/collections/diamonds" },
// //         { label: "Everyday Wear", path: "/collections/everyday" },
// //         { label: "Festive Special", path: "/collections/festive" }
// //       ]
// //     },
// //     { 
// //       id: "gold", 
// //       label: "Gold", 
// //       icon: "💰", 
// //       onClick: () => navigate("/gold"),
// //       submenu: [
// //         { label: "22K Gold", path: "/gold/22k" },
// //         { label: "18K Gold", path: "/gold/18k" },
// //         { label: "Gold Coins", path: "/gold/coins" },
// //         { label: "Gold Bars", path: "/gold/bars" }
// //       ]
// //     },
// //     { 
// //       id: "diamond", 
// //       label: "Diamonds", 
// //       icon: "💎", 
// //       onClick: () => navigate("/diamonds"),
// //       submenu: [
// //         { label: "Solitaire", path: "/diamonds/solitaire" },
// //         { label: "Certified Diamonds", path: "/diamonds/certified" },
// //         { label: "Diamond Sets", path: "/diamonds/sets" }
// //       ]
// //     },
// //     { 
// //       id: "wedding", 
// //       label: "Wedding", 
// //       icon: "💍", 
// //       onClick: () => navigate("/wedding"),
// //       submenu: [
// //         { label: "Bridal Sets", path: "/wedding/bridal" },
// //         { label: "Mangalsutra", path: "/wedding/mangalsutra" },
// //         { label: "Groom Collection", path: "/wedding/groom" }
// //       ]
// //     },
// //     { 
// //       id: "gift", 
// //       label: "Gifts", 
// //       icon: "🎁", 
// //       onClick: () => navigate("/gifts"),
// //       submenu: [
// //         { label: "Anniversary", path: "/gifts/anniversary" },
// //         { label: "Birthday", path: "/gifts/birthday" },
// //         { label: "Corporate", path: "/gifts/corporate" }
// //       ]
// //     }
// //   ];

// //   const userMenuItems = user ? [
// //     { label: "My Profile", icon: "👤", onClick: () => navigate("/profile") },
// //     { label: "My Orders", icon: "📦", onClick: () => navigate("/orders") },
// //     { label: "Wishlist", icon: "❤️", badge: wishlistCount, onClick: () => navigate("/wishlist") },
// //     { label: "Saved Cards", icon: "💳", onClick: () => navigate("/profile/payments") },
// //     { label: "Address Book", icon: "🏠", onClick: () => navigate("/profile/addresses") },
// //     { label: "Notifications", icon: "🔔", badge: notificationCount, onClick: () => navigate("/notifications") },
// //     { label: "Stores", icon: "📍", onClick: () => navigate("/stores") },
// //     { label: "Logout", icon: "🚪", onClick: logout },
// //   ] : [
// //     { label: "Login / Sign Up", icon: "🔐", onClick: () => navigate("/login") },
// //     { label: "Track Order", icon: "📍", onClick: () => navigate("/track-order") },
// //     { label: "Guest Checkout", icon: "🛒", onClick: () => navigate("/guest-checkout") },
// //     { label: "Store Locator", icon: "📍", onClick: () => navigate("/stores") },
// //   ];

// //   const handleCartAction = (action, itemId = null) => {
// //     switch(action) {
// //       case 'checkout':
// //         navigate("/checkout");
// //         setCartDropdown(false);
// //         break;
// //       case 'clear':
// //         if (window.confirm("Are you sure you want to clear your cart?")) {
// //           clearCart();
// //         }
// //         break;
// //       case 'remove':
// //         // Remove item logic here
// //         break;
// //       default:
// //         navigate("/cart");
// //         setCartDropdown(false);
// //     }
// //   };

// //   return (
// //     <>
// //       {/* ===== TOP PROMO BAR ===== */}
// //       <div className="promo-bar">
// //         <div className="promo-slider">
// //           <div className="promo-slide">
// //             🚚 <strong>FREE SHIPPING</strong> on orders above ₹10,000
// //           </div>
// //           <div className="promo-slide">
// //             💎 <strong>BIS HALLMARKED</strong> | 100% Certified Jewellery
// //           </div>
// //           <div className="promo-slide">
// //             🔒 <strong>SECURE PAYMENT</strong> | Easy EMI Options Available
// //           </div>
// //           <div className="promo-slide">
// //             🎁 <strong>DIWALI SALE</strong> | Up to 50% OFF + Extra 10%
// //           </div>
// //         </div>
// //         <div className="promo-close">✕</div>
// //       </div>

// //       {/* ===== MAIN NAVBAR ===== */}
// //       <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
// //         <div className="nav-container">

// //           {/* LOGO SECTION */}
// //           <div className="nav-logo" onClick={() => navigate("/")}>
// //             <div className="logo-wrapper">
// //               <img src={logo} alt="Rika Jewels" className="logo-image" />
// //               <div className="logo-text">
// //                 <h1 className="logo-name">RIKA JEWELS</h1>
// //                 <p className="logo-tagline">Since 2026 • Pure & Precious</p>
// //               </div>
// //             </div>
// //           </div>

// //           {/* SEARCH BAR */}
// //           <div className="nav-search" ref={searchRef}>
// //             <div className={`search-wrapper ${showSearch ? 'expanded' : ''}`}>
// //               <form onSubmit={handleSearch} className="search-form">
// //                 <input
// //                   type="text"
// //                   placeholder="Search diamonds, gold, rings, necklaces..."
// //                   value={searchQuery}
// //                   onChange={(e) => setSearchQuery(e.target.value)}
// //                   className="search-input"
// //                   onFocus={() => setShowSearch(true)}
// //                 />
// //                 <button type="submit" className="search-button">
// //                   <span className="search-icon">🔍</span>
// //                   <span className="search-text">Search</span>
// //                 </button>
// //               </form>

// //               {showSearch && (
// //                 <div className="search-dropdown">
// //                   <div className="search-quick-categories">
// //                     <h4>Quick Categories:</h4>
// //                     <div className="quick-tags">
// //                       {quickCategories.map((category, index) => (
// //                         <span 
// //                           key={index} 
// //                           className="quick-tag"
// //                           onClick={() => {
// //                             navigate(`/search?q=${encodeURIComponent(category)}`);
// //                             setShowSearch(false);
// //                           }}
// //                         >
// //                           {category}
// //                         </span>
// //                       ))}
// //                     </div>
// //                   </div>
// //                   <div className="search-recent">
// //                     <h4>Recent Searches:</h4>
// //                     <div className="recent-list">
// //                       <span className="recent-item">💍 Diamond Rings</span>
// //                       <span className="recent-item">💰 Gold Coins</span>
// //                       <span className="recent-item">📿 Mangalsutra</span>
// //                     </div>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           {/* ACTION BUTTONS - Updated layout */}
// //           <div className="nav-actions">
// //             {/* Store, Cart, Account, Wishlist in horizontal layout */}
// //             <div className="nav-actions-row">
// //               {/* STORE */}
// //               <button 
// //                 className="nav-action-btn store-btn"
// //                 onClick={() => navigate("/stores")}
// //                 title="Store Locator"
// //               >
// //                 <span className="nav-action-icon">📍</span>
// //                 <span className="nav-action-label">Store</span>
// //               </button>

// //               {/* CART */}
// //               <div className="nav-action-btn-container cart-container" ref={cartRef}>
// //                 <button 
// //                   className="nav-action-btn cart-btn"
// //                   onClick={() => setCartDropdown(!cartDropdown)}
// //                   title="Shopping Cart"
// //                 >
// //                   <span className="nav-action-icon">🛒</span>
// //                   <span className="nav-action-label">Cart</span>
// //                   {cart.length > 0 && (
// //                     <span className="nav-action-badge cart-badge">{cart.length}</span>
// //                   )}
// //                 </button>

// //                 {cartDropdown && (
// //                   <div className="cart-dropdown">
// //                     <div className="cart-dropdown-header">
// //                       <h3>Your Shopping Cart</h3>
// //                       <span className="cart-total">Total: ₹{cartTotal.toLocaleString()}</span>
// //                     </div>

// //                     {cart.length > 0 ? (
// //                       <>
// //                         <div className="cart-items-list">
// //                           {cart.slice(0, 3).map((item, index) => (
// //                             <div key={index} className="cart-dropdown-item">
// //                               <img src={item.image} alt={item.name} className="item-image" />
// //                               <div className="item-details">
// //                                 <h4 className="item-name">{item.name}</h4>
// //                                 <p className="item-price">₹{item.price.toLocaleString()} × {item.quantity || 1}</p>
// //                                 <div className="item-actions">
// //                                   <button className="item-action-btn" title="Remove">🗑️</button>
// //                                   <button className="item-action-btn" title="Save for later">❤️</button>
// //                                 </div>
// //                               </div>
// //                             </div>
// //                           ))}
// //                         </div>

// //                         {cart.length > 3 && (
// //                           <div className="cart-more-items">
// //                             +{cart.length - 3} more items
// //                           </div>
// //                         )}

// //                         <div className="cart-dropdown-actions">
// //                           <button 
// //                             className="cart-action-btn view-cart"
// //                             onClick={() => handleCartAction('view')}
// //                           >
// //                             View Full Cart
// //                           </button>
// //                           <button 
// //                             className="cart-action-btn checkout"
// //                             onClick={() => handleCartAction('checkout')}
// //                           >
// //                             Proceed to Checkout
// //                           </button>
// //                           <button 
// //                             className="cart-action-btn clear"
// //                             onClick={() => handleCartAction('clear')}
// //                           >
// //                             Clear Cart
// //                           </button>
// //                         </div>
// //                       </>
// //                     ) : (
// //                       <div className="cart-empty">
// //                         <div className="empty-icon">🛒</div>
// //                         <p>Your cart is empty</p>
// //                         <button 
// //                           className="shop-now-btn"
// //                           onClick={() => {
// //                             navigate("/shop");
// //                             setCartDropdown(false);
// //                           }}
// //                         >
// //                           Start Shopping
// //                         </button>
// //                       </div>
// //                     )}
// //                   </div>
// //                 )}
// //               </div>

// //               {/* PROFILE/ACCOUNT */}
// //               <div className="nav-action-btn-container profile-container" ref={profileRef}>
// //                 <button 
// //                   className="nav-action-btn profile-btn"
// //                   onClick={() => setProfileDropdown(!profileDropdown)}
// //                   title={user ? "My Account" : "Account"}
// //                 >
// //                   <span className="nav-action-icon">
// //                     {user ? "👤" : "👤"}
// //                   </span>
// //                   <span className="nav-action-label">
// //                     {user ? "Account" : "Account"}
// //                   </span>
// //                 </button>

// //                 {profileDropdown && (
// //                   <div className="profile-dropdown">
// //                     {user ? (
// //                       <>
// //                         <div className="profile-header">
// //                           <div className="user-avatar">
// //                             {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
// //                           </div>
// //                           <div className="user-info">
// //                             <h4 className="user-name">{user.name || "Welcome Back!"}</h4>
// //                             <p className="user-email">{user.email}</p>
// //                             <div className="user-tier">
// //                               <span className="tier-badge">💎 DIAMOND MEMBER</span>
// //                               <span className="tier-points">2,500 Points</span>
// //                             </div>
// //                           </div>
// //                         </div>
// //                         <div className="profile-stats">
// //                           <div className="stat-item">
// //                             <span className="stat-value">12</span>
// //                             <span className="stat-label">Orders</span>
// //                           </div>
// //                           <div className="stat-item">
// //                             <span className="stat-value">₹1.2L</span>
// //                             <span className="stat-label">Spent</span>
// //                           </div>
// //                           <div className="stat-item">
// //                             <span className="stat-value">{wishlistCount}</span>
// //                             <span className="stat-label">Wishlist</span>
// //                           </div>
// //                         </div>
// //                       </>
// //                     ) : (
// //                       <div className="profile-header guest">
// //                         <h4>Welcome to Rika Jewels</h4>
// //                         <p>Sign in for better experience</p>
// //                         <button 
// //                           className="signin-btn"
// //                           onClick={() => {
// //                             navigate("/login");
// //                             setProfileDropdown(false);
// //                           }}
// //                         >
// //                           Sign In / Register
// //                         </button>
// //                       </div>
// //                     )}

// //                     <div className="dropdown-menu">
// //                       {userMenuItems.map((item, index) => (
// //                         <button
// //                           key={index}
// //                           className="dropdown-item"
// //                           onClick={() => {
// //                             item.onClick();
// //                             setProfileDropdown(false);
// //                           }}
// //                         >
// //                           <span className="item-icon">{item.icon}</span>
// //                           <span className="item-label">{item.label}</span>
// //                           {item.badge && <span className="item-badge">{item.badge}</span>}
// //                         </button>
// //                       ))}
// //                     </div>

// //                     <div className="dropdown-footer">
// //                       <div className="support-section">
// //                         <div className="support-item">
// //                           <span className="support-icon">📞</span>
// //                           <div>
// //                             <p className="support-title">24/7 Support</p>
// //                             <p className="support-number">1800-123-4567</p>
// //                           </div>
// //                         </div>
// //                         <button className="help-btn">Need Help?</button>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>

// //               {/* WISHLIST */}
// //               <button 
// //                 className="nav-action-btn wishlist-btn"
// //                 onClick={() => navigate("/wishlist")}
// //                 title="My Wishlist"
// //               >
// //                 <span className="nav-action-icon">❤️</span>
// //                 <span className="nav-action-label">Wishlist</span>
// //                 {wishlistCount > 0 && (
// //                   <span className="nav-action-badge wishlist-badge">{wishlistCount}</span>
// //                 )}
// //               </button>
// //             </div>

// //             {/* MOBILE MENU TOGGLE */}
// //             <button 
// //               className="mobile-toggle"
// //               onClick={() => setMobileMenu(!mobileMenu)}
// //             >
// //               {mobileMenu ? "✕" : "☰"}
// //             </button>
// //           </div>
// //         </div>

// //         {/* CATEGORY NAVBAR */}
// //         <div className="category-nav">
// //           <div className="category-container">
// //             {navCategories.map((category) => (
// //               <div 
// //                 key={category.id}
// //                 className={`category-item ${activeCategory === category.id ? 'active' : ''}`}
// //                 onMouseEnter={(e) => {
// //                   if (category.submenu.length > 0) {
// //                     e.currentTarget.classList.add('hover');
// //                   }
// //                 }}
// //                 onMouseLeave={(e) => {
// //                   e.currentTarget.classList.remove('hover');
// //                 }}
// //               >
// //                 <button 
// //                   className="category-btn"
// //                   onClick={category.onClick}
// //                 >
// //                   <span className="category-icon">{category.icon}</span>
// //                   <span className="category-label">{category.label}</span>
// //                   {category.submenu.length > 0 && (
// //                     <span className="category-arrow">▼</span>
// //                   )}
// //                 </button>

// //                 {category.submenu.length > 0 && (
// //                   <div className="category-submenu">
// //                     <div className="submenu-container">
// //                       {category.submenu.map((subItem, index) => (
// //                         <button
// //                           key={index}
// //                           className="submenu-item"
// //                           onClick={() => navigate(subItem.path)}
// //                         >
// //                           {subItem.label}
// //                         </button>
// //                       ))}
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>
// //             ))}
// //           </div>

// //           {/* SPECIAL OFFER BADGE */}
// //           <div className="special-offer">
// //             <span className="offer-badge"></span>
// //           </div>
// //         </div>
// //       </nav>

// //       {/* MOBILE MENU OVERLAY */}
// //       {mobileMenu && (
// //         <div className="mobile-menu-overlay">
// //           <div className="mobile-menu-container">
// //             <div className="mobile-menu-header">
// //               <div className="mobile-user-info">
// //                 {user ? (
// //                   <>
// //                     <div className="mobile-user-avatar">
// //                       {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
// //                     </div>
// //                     <div>
// //                       <h4>{user.name || "User"}</h4>
// //                       <p>{user.email}</p>
// //                     </div>
// //                   </>
// //                 ) : (
// //                   <>
// //                     <div className="mobile-user-avatar">👤</div>
// //                     <div>
// //                       <h4>Welcome Guest</h4>
// //                       <p>Sign in for better experience</p>
// //                     </div>
// //                   </>
// //                 )}
// //               </div>
// //               <button 
// //                 className="mobile-close"
// //                 onClick={() => setMobileMenu(false)}
// //               >
// //                 ✕
// //               </button>
// //             </div>

// //             <div className="mobile-search-box">
// //               <form onSubmit={handleSearch}>
// //                 <input
// //                   type="text"
// //                   placeholder="Search jewellery..."
// //                   value={searchQuery}
// //                   onChange={(e) => setSearchQuery(e.target.value)}
// //                 />
// //                 <button type="submit">🔍</button>
// //               </form>
// //             </div>

// //             <div className="mobile-nav">
// //               {navCategories.map((category) => (
// //                 <div key={category.id} className="mobile-nav-category">
// //                   <button 
// //                     className="mobile-nav-btn"
// //                     onClick={() => {
// //                       category.onClick();
// //                       setMobileMenu(false);
// //                     }}
// //                   >
// //                     <span className="mobile-nav-icon">{category.icon}</span>
// //                     {category.label}
// //                     {category.submenu.length > 0 && <span className="mobile-arrow">›</span>}
// //                   </button>

// //                   {category.submenu.length > 0 && (
// //                     <div className="mobile-submenu">
// //                       {category.submenu.map((subItem, index) => (
// //                         <button
// //                           key={index}
// //                           className="mobile-submenu-item"
// //                           onClick={() => {
// //                             navigate(subItem.path);
// //                             setMobileMenu(false);
// //                           }}
// //                         >
// //                           {subItem.label}
// //                         </button>
// //                       ))}
// //                     </div>
// //                   )}
// //                 </div>
// //               ))}
// //             </div>

// //             {/* Mobile Action Buttons */}
// //             <div className="mobile-actions-grid">
// //               <button className="mobile-action-item" onClick={() => navigate("/stores")}>
// //                 <span className="mobile-action-icon">📍</span>
// //                 <span className="mobile-action-text">Store</span>
// //               </button>
// //               <button 
// //                 className="mobile-action-item" 
// //                 onClick={() => {
// //                   navigate("/cart");
// //                   setMobileMenu(false);
// //                 }}
// //               >
// //                 <span className="mobile-action-icon">🛒</span>
// //                 <span className="mobile-action-text">Cart</span>
// //                 {cart.length > 0 && <span className="mobile-action-badge">{cart.length}</span>}
// //               </button>
// //               <button 
// //                 className="mobile-action-item"
// //                 onClick={() => {
// //                   if (user) {
// //                     navigate("/profile");
// //                   } else {
// //                     navigate("/login");
// //                   }
// //                   setMobileMenu(false);
// //                 }}
// //               >
// //                 <span className="mobile-action-icon">👤</span>
// //                 <span className="mobile-action-text">Account</span>
// //               </button>
// //               <button 
// //                 className="mobile-action-item" 
// //                 onClick={() => {
// //                   navigate("/wishlist");
// //                   setMobileMenu(false);
// //                 }}
// //               >
// //                 <span className="mobile-action-icon">❤️</span>
// //                 <span className="mobile-action-text">Wishlist</span>
// //                 {wishlistCount > 0 && <span className="mobile-action-badge">{wishlistCount}</span>}
// //               </button>
// //             </div>

// //             <div className="mobile-footer">
// //               {user ? (
// //                 <button className="mobile-logout" onClick={logout}>
// //                   🚪 Logout
// //                 </button>
// //               ) : (
// //                 <button 
// //                   className="mobile-signin"
// //                   onClick={() => {
// //                     navigate("/login");
// //                     setMobileMenu(false);
// //                   }}
// //                 >
// //                   🔐 Sign In / Register
// //                 </button>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // }

// // export default Navbar;



// import React, { useContext, useState, useEffect, useRef } from "react";
// import "./Navbar.css";
// import logo from "../assets/logoo.jpg";
// import { CartContext } from "../context/CartContext";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate, useLocation } from "react-router-dom";

// function Navbar() {
//   const { cart, getCartTotal, clearCart } = useContext(CartContext);
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [scrolled, setScrolled] = useState(false);
//   const [mobileMenu, setMobileMenu] = useState(false);
//   const [profileDropdown, setProfileDropdown] = useState(false);
//   const [cartDropdown, setCartDropdown] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeCategory, setActiveCategory] = useState("home");
//   const [showSearch, setShowSearch] = useState(false);

//   const searchRef = useRef(null);
//   const profileRef = useRef(null);
//   const cartRef = useRef(null);

//   // FIXED: Add null check for cart
//   const cartTotal = getCartTotal ? getCartTotal() : 
//     (Array.isArray(cart) ? cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0) : 0);

//   // Static values for notification and wishlist counts
//   const notificationCount = 3;
//   const wishlistCount = 5;

//   // FIXED: Add debugging to see what's in user object
//   useEffect(() => {
//     console.log("Navbar: user object:", user);
//   }, [user]);

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (profileRef.current && !profileRef.current.contains(event.target)) {
//         setProfileDropdown(false);
//       }
//       if (cartRef.current && !cartRef.current.contains(event.target)) {
//         setCartDropdown(false);
//       }
//       if (searchRef.current && !searchRef.current.contains(event.target)) {
//         setShowSearch(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 30);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Update active category based on route
//   useEffect(() => {
//     const path = location.pathname;
//     if (path === "/") setActiveCategory("home");
//     else if (path.includes("/shop") || path.includes("/jewellery")) setActiveCategory("shop");
//     else if (path.includes("/collection")) setActiveCategory("collection");
//     else if (path.includes("/gold")) setActiveCategory("gold");
//     else if (path.includes("/diamond")) setActiveCategory("diamond");
//     else if (path.includes("/wedding")) setActiveCategory("wedding");
//     else if (path.includes("/gift")) setActiveCategory("gift");
//     else if (path.includes("/contact")) setActiveCategory("contact");
//   }, [location]);

//   const scrollToSection = (id) => {
//     if (location.pathname !== "/") {
//       navigate("/");
//       setTimeout(() => {
//         const section = document.getElementById(id);
//         if (section) {
//           section.scrollIntoView({ behavior: "smooth" });
//           setActiveCategory(id);
//         }
//       }, 500);
//     } else {
//       const section = document.getElementById(id);
//       if (section) {
//         section.scrollIntoView({ behavior: "smooth" });
//         setActiveCategory(id);
//       }
//     }
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
//       setSearchQuery("");
//       setShowSearch(false);
//     }
//   };

//   const quickCategories = [
//     "Diamond Rings", "Gold Necklaces", "Wedding Sets", "Earrings", "Bracelets", "Men's Jewellery"
//   ];

//   const navCategories = [
//     { 
//       id: "home", 
//       label: "Home", 
//       icon: "🏠", 
//       onClick: () => scrollToSection("hero"),
//       submenu: []
//     },
//     { 
//       id: "shop", 
//       label: "Shop", 
//       icon: "💎", 
//       onClick: () => scrollToSection("shop"),
//       submenu: [
//         { label: "All Products", path: "/shop" },
//         { label: "New Arrivals", path: "/shop/new" },
//         { label: "Best Sellers", path: "/shop/bestsellers" },
//         { label: "Sale", path: "/shop/sale" }
//       ]
//     },
//     { 
//       id: "collections", 
//       label: "Collections", 
//       icon: "📚", 
//       onClick: () => scrollToSection("collection"),
//       submenu: [
//         { label: "Bridal Collection", path: "/collections/bridal" },
//         { label: "Luxury Diamonds", path: "/collections/diamonds" },
//         { label: "Everyday Wear", path: "/collections/everyday" },
//         { label: "Festive Special", path: "/collections/festive" }
//       ]
//     },
//     { 
//       id: "gold", 
//       label: "Gold", 
//       icon: "💰", 
//       onClick: () => navigate("/gold"),
//       submenu: [
//         { label: "22K Gold", path: "/gold/22k" },
//         { label: "18K Gold", path: "/gold/18k" },
//         { label: "Gold Coins", path: "/gold/coins" },
//         { label: "Gold Bars", path: "/gold/bars" }
//       ]
//     },
//     { 
//       id: "diamond", 
//       label: "Diamonds", 
//       icon: "💎", 
//       onClick: () => navigate("/diamonds"),
//       submenu: [
//         { label: "Solitaire", path: "/diamonds/solitaire" },
//         { label: "Certified Diamonds", path: "/diamonds/certified" },
//         { label: "Diamond Sets", path: "/diamonds/sets" }
//       ]
//     },
//     { 
//       id: "wedding", 
//       label: "Wedding", 
//       icon: "💍", 
//       onClick: () => navigate("/wedding"),
//       submenu: [
//         { label: "Bridal Sets", path: "/wedding/bridal" },
//         { label: "Mangalsutra", path: "/wedding/mangalsutra" },
//         { label: "Groom Collection", path: "/wedding/groom" }
//       ]
//     },
//     { 
//       id: "gift", 
//       label: "Gifts", 
//       icon: "🎁", 
//       onClick: () => navigate("/gifts"),
//       submenu: [
//         { label: "Anniversary", path: "/gifts/anniversary" },
//         { label: "Birthday", path: "/gifts/birthday" },
//         { label: "Corporate", path: "/gifts/corporate" }
//       ]
//     }
//   ];

//   const userMenuItems = user ? [
//     { label: "My Profile", icon: "👤", onClick: () => navigate("/profile") },
//     { label: "My Orders", icon: "📦", onClick: () => navigate("/orders") },
//     { label: "Wishlist", icon: "❤️", badge: wishlistCount, onClick: () => navigate("/wishlist") },
//     { label: "Saved Cards", icon: "💳", onClick: () => navigate("/profile/payments") },
//     { label: "Address Book", icon: "🏠", onClick: () => navigate("/profile/addresses") },
//     { label: "Notifications", icon: "🔔", badge: notificationCount, onClick: () => navigate("/notifications") },
//     { label: "Stores", icon: "📍", onClick: () => navigate("/stores") },
//     { label: "Logout", icon: "🚪", onClick: logout },
//   ] : [
//     { label: "Login / Sign Up", icon: "🔐", onClick: () => navigate("/login") },
//     { label: "Track Order", icon: "📍", onClick: () => navigate("/track-order") },
//     { label: "Guest Checkout", icon: "🛒", onClick: () => navigate("/guest-checkout") },
//     { label: "Store Locator", icon: "📍", onClick: () => navigate("/stores") },
//   ];

//   const handleCartAction = (action, itemId = null) => {
//     switch(action) {
//       case 'checkout':
//         navigate("/checkout");
//         setCartDropdown(false);
//         break;
//       case 'clear':
//         if (window.confirm("Are you sure you want to clear your cart?")) {
//           clearCart();
//         }
//         break;
//       case 'remove':
//         // Remove item logic here
//         break;
//       default:
//         navigate("/cart");
//         setCartDropdown(false);
//     }
//   };

//   // FIXED: Safe access to user properties
//   const getUserName = () => {
//     if (!user) return "User";
//     return user.name || user.email?.split('@')[0] || "User";
//   };

//   const getUserInitial = () => {
//     if (!user) return "U";
//     const name = user.name || user.email || "";
//     return name.charAt(0).toUpperCase();
//   };

//   const getUserEmail = () => {
//     if (!user) return "";
//     return user.email || "";
//   };

//   return (
//     <>
//       {/* ===== TOP PROMO BAR ===== */}
//       <div className="promo-bar">
//         <div className="promo-slider">
//           <div className="promo-slide">
//             🚚 <strong>FREE SHIPPING</strong> on orders above ₹10,000
//           </div>
//           <div className="promo-slide">
//             💎 <strong>BIS HALLMARKED</strong> | 100% Certified Jewellery
//           </div>
//           <div className="promo-slide">
//             🔒 <strong>SECURE PAYMENT</strong> | Easy EMI Options Available
//           </div>
//           <div className="promo-slide">
//             🎁 <strong>DIWALI SALE</strong> | Up to 50% OFF + Extra 10%
//           </div>
//         </div>
//         <div className="promo-close">✕</div>
//       </div>

//       {/* ===== MAIN NAVBAR ===== */}
//       <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
//         <div className="nav-container">

//           {/* LOGO SECTION */}
//           <div className="nav-logo" onClick={() => navigate("/")}>
//             <div className="logo-wrapper">
//               <img src={logo} alt="Rika Jewels" className="logo-image" />
//               <div className="logo-text">
//                 <h1 className="logo-name">RIKA JEWELS</h1>
//                 <p className="logo-tagline">Since 2026 • Pure & Precious</p>
//               </div>
//             </div>
//           </div>

//           {/* SEARCH BAR */}
//           <div className="nav-search" ref={searchRef}>
//             <div className={`search-wrapper ${showSearch ? 'expanded' : ''}`}>
//               <form onSubmit={handleSearch} className="search-form">
//                 <input
//                   type="text"
//                   placeholder="Search diamonds, gold, rings, necklaces..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="search-input"
//                   onFocus={() => setShowSearch(true)}
//                 />
//                 <button type="submit" className="search-button">
//                   <span className="search-icon">🔍</span>
//                   <span className="search-text">Search</span>
//                 </button>
//               </form>

//               {showSearch && (
//                 <div className="search-dropdown">
//                   <div className="search-quick-categories">
//                     <h4>Quick Categories:</h4>
//                     <div className="quick-tags">
//                       {quickCategories.map((category, index) => (
//                         <span 
//                           key={index} 
//                           className="quick-tag"
//                           onClick={() => {
//                             navigate(`/search?q=${encodeURIComponent(category)}`);
//                             setShowSearch(false);
//                           }}
//                         >
//                           {category}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                   <div className="search-recent">
//                     <h4>Recent Searches:</h4>
//                     <div className="recent-list">
//                       <span className="recent-item">💍 Diamond Rings</span>
//                       <span className="recent-item">💰 Gold Coins</span>
//                       <span className="recent-item">📿 Mangalsutra</span>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* ACTION BUTTONS - Updated layout */}
//           <div className="nav-actions">
//             {/* Store, Cart, Account, Wishlist in horizontal layout */}
//             <div className="nav-actions-row">
//               {/* STORE */}
//               <button 
//                 className="nav-action-btn store-btn"
//                 onClick={() => navigate("/stores")}
//                 title="Store Locator"
//               >
//                 <span className="nav-action-icon">📍</span>
//                 <span className="nav-action-label">Store</span>
//               </button>

//               {/* CART */}
//               <div className="nav-action-btn-container cart-container" ref={cartRef}>
//                 <button 
//                   className="nav-action-btn cart-btn"
//                   onClick={() => setCartDropdown(!cartDropdown)}
//                   title="Shopping Cart"
//                 >
//                   <span className="nav-action-icon">🛒</span>
//                   <span className="nav-action-label">Cart</span>
//                   {cart && cart.length > 0 && (
//                     <span className="nav-action-badge cart-badge">{cart.length}</span>
//                   )}
//                 </button>

//                 {cartDropdown && (
//                   <div className="cart-dropdown">
//                     <div className="cart-dropdown-header">
//                       <h3>Your Shopping Cart</h3>
//                       <span className="cart-total">Total: ₹{cartTotal.toLocaleString()}</span>
//                     </div>

//                     {cart && cart.length > 0 ? (
//                       <>
//                         <div className="cart-items-list">
//                           {cart.slice(0, 3).map((item, index) => (
//                             <div key={index} className="cart-dropdown-item">
//                               <img src={item.image} alt={item.name} className="item-image" />
//                               <div className="item-details">
//                                 <h4 className="item-name">{item.name}</h4>
//                                 <p className="item-price">₹{item.price.toLocaleString()} × {item.quantity || 1}</p>
//                                 <div className="item-actions">
//                                   <button className="item-action-btn" title="Remove">🗑️</button>
//                                   <button className="item-action-btn" title="Save for later">❤️</button>
//                                 </div>
//                               </div>
//                             </div>
//                           ))}
//                         </div>

//                         {cart.length > 3 && (
//                           <div className="cart-more-items">
//                             +{cart.length - 3} more items
//                           </div>
//                         )}

//                         <div className="cart-dropdown-actions">
//                           <button 
//                             className="cart-action-btn view-cart"
//                             onClick={() => handleCartAction('view')}
//                           >
//                             View Full Cart
//                           </button>
//                           <button 
//                             className="cart-action-btn checkout"
//                             onClick={() => handleCartAction('checkout')}
//                           >
//                             Proceed to Checkout
//                           </button>
//                           <button 
//                             className="cart-action-btn clear"
//                             onClick={() => handleCartAction('clear')}
//                           >
//                             Clear Cart
//                           </button>
//                         </div>
//                       </>
//                     ) : (
//                       <div className="cart-empty">
//                         <div className="empty-icon">🛒</div>
//                         <p>Your cart is empty</p>
//                         <button 
//                           className="shop-now-btn"
//                           onClick={() => {
//                             navigate("/shop");
//                             setCartDropdown(false);
//                           }}
//                         >
//                           Start Shopping
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* PROFILE/ACCOUNT */}
//               <div className="nav-action-btn-container profile-container" ref={profileRef}>
//                 <button 
//                   className="nav-action-btn profile-btn"
//                   onClick={() => setProfileDropdown(!profileDropdown)}
//                   title={user ? "My Account" : "Account"}
//                 >
//                   <span className="nav-action-icon">
//                     {user ? "👤" : "👤"}
//                   </span>
//                   <span className="nav-action-label">
//                     {user ? "Account" : "Account"}
//                   </span>
//                 </button>

//                 {profileDropdown && (
//                   <div className="profile-dropdown">
//                     {user ? (
//                       <>
//                         <div className="profile-header">
//                           <div className="user-avatar">
//                             {getUserInitial()}
//                           </div>
//                           <div className="user-info">
//                             <h4 className="user-name">{getUserName()}</h4>
//                             <p className="user-email">{getUserEmail()}</p>
//                             <div className="user-tier">
//                               <span className="tier-badge">💎 DIAMOND MEMBER</span>
//                               <span className="tier-points">2,500 Points</span>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="profile-stats">
//                           <div className="stat-item">
//                             <span className="stat-value">12</span>
//                             <span className="stat-label">Orders</span>
//                           </div>
//                           <div className="stat-item">
//                             <span className="stat-value">₹1.2L</span>
//                             <span className="stat-label">Spent</span>
//                           </div>
//                           <div className="stat-item">
//                             <span className="stat-value">{wishlistCount}</span>
//                             <span className="stat-label">Wishlist</span>
//                           </div>
//                         </div>
//                       </>
//                     ) : (
//                       <div className="profile-header guest">
//                         <h4>Welcome to Rika Jewels</h4>
//                         <p>Sign in for better experience</p>
//                         <button 
//                           className="signin-btn"
//                           onClick={() => {
//                             navigate("/login");
//                             setProfileDropdown(false);
//                           }}
//                         >
//                           Sign In / Register
//                         </button>
//                       </div>
//                     )}

//                     <div className="dropdown-menu">
//                       {userMenuItems.map((item, index) => (
//                         <button
//                           key={index}
//                           className="dropdown-item"
//                           onClick={() => {
//                             item.onClick();
//                             setProfileDropdown(false);
//                           }}
//                         >
//                           <span className="item-icon">{item.icon}</span>
//                           <span className="item-label">{item.label}</span>
//                           {item.badge && <span className="item-badge">{item.badge}</span>}
//                         </button>
//                       ))}
//                     </div>

//                     <div className="dropdown-footer">
//                       <div className="support-section">
//                         <div className="support-item">
//                           <span className="support-icon">📞</span>
//                           <div>
//                             <p className="support-title">24/7 Support</p>
//                             <p className="support-number">1800-123-4567</p>
//                           </div>
//                         </div>
//                         <button className="help-btn">Need Help?</button>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* WISHLIST */}
//               <button 
//                 className="nav-action-btn wishlist-btn"
//                 onClick={() => navigate("/wishlist")}
//                 title="My Wishlist"
//               >
//                 <span className="nav-action-icon">❤️</span>
//                 <span className="nav-action-label">Wishlist</span>
//                 {wishlistCount > 0 && (
//                   <span className="nav-action-badge wishlist-badge">{wishlistCount}</span>
//                 )}
//               </button>
//             </div>

//             {/* MOBILE MENU TOGGLE */}
//             <button 
//               className="mobile-toggle"
//               onClick={() => setMobileMenu(!mobileMenu)}
//             >
//               {mobileMenu ? "✕" : "☰"}
//             </button>
//           </div>
//         </div>

//         {/* CATEGORY NAVBAR */}
//         <div className="category-nav">
//           <div className="category-container">
//             {navCategories.map((category) => (
//               <div 
//                 key={category.id}
//                 className={`category-item ${activeCategory === category.id ? 'active' : ''}`}
//                 onMouseEnter={(e) => {
//                   if (category.submenu.length > 0) {
//                     e.currentTarget.classList.add('hover');
//                   }
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.classList.remove('hover');
//                 }}
//               >
//                 <button 
//                   className="category-btn"
//                   onClick={category.onClick}
//                 >
//                   <span className="category-icon">{category.icon}</span>
//                   <span className="category-label">{category.label}</span>
//                   {category.submenu.length > 0 && (
//                     <span className="category-arrow">▼</span>
//                   )}
//                 </button>

//                 {category.submenu.length > 0 && (
//                   <div className="category-submenu">
//                     <div className="submenu-container">
//                       {category.submenu.map((subItem, index) => (
//                         <button
//                           key={index}
//                           className="submenu-item"
//                           onClick={() => navigate(subItem.path)}
//                         >
//                           {subItem.label}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* SPECIAL OFFER BADGE */}
//           <div className="special-offer">
//             <span className="offer-badge"></span>
//           </div>
//         </div>
//       </nav>

//       {/* MOBILE MENU OVERLAY */}
//       {mobileMenu && (
//         <div className="mobile-menu-overlay">
//           <div className="mobile-menu-container">
//             <div className="mobile-menu-header">
//               <div className="mobile-user-info">
//                 {user ? (
//                   <>
//                     <div className="mobile-user-avatar">
//                       {getUserInitial()}
//                     </div>
//                     <div>
//                       <h4>{getUserName()}</h4>
//                       <p>{getUserEmail()}</p>
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     <div className="mobile-user-avatar">👤</div>
//                     <div>
//                       <h4>Welcome Guest</h4>
//                       <p>Sign in for better experience</p>
//                     </div>
//                   </>
//                 )}
//               </div>
//               <button 
//                 className="mobile-close"
//                 onClick={() => setMobileMenu(false)}
//               >
//                 ✕
//               </button>
//             </div>

//             <div className="mobile-search-box">
//               <form onSubmit={handleSearch}>
//                 <input
//                   type="text"
//                   placeholder="Search jewellery..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//                 <button type="submit">🔍</button>
//               </form>
//             </div>

//             <div className="mobile-nav">
//               {navCategories.map((category) => (
//                 <div key={category.id} className="mobile-nav-category">
//                   <button 
//                     className="mobile-nav-btn"
//                     onClick={() => {
//                       category.onClick();
//                       setMobileMenu(false);
//                     }}
//                   >
//                     <span className="mobile-nav-icon">{category.icon}</span>
//                     {category.label}
//                     {category.submenu.length > 0 && <span className="mobile-arrow">›</span>}
//                   </button>

//                   {category.submenu.length > 0 && (
//                     <div className="mobile-submenu">
//                       {category.submenu.map((subItem, index) => (
//                         <button
//                           key={index}
//                           className="mobile-submenu-item"
//                           onClick={() => {
//                             navigate(subItem.path);
//                             setMobileMenu(false);
//                           }}
//                         >
//                           {subItem.label}
//                         </button>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* Mobile Action Buttons */}
//             <div className="mobile-actions-grid">
//               <button className="mobile-action-item" onClick={() => navigate("/stores")}>
//                 <span className="mobile-action-icon">📍</span>
//                 <span className="mobile-action-text">Store</span>
//               </button>
//               <button 
//                 className="mobile-action-item" 
//                 onClick={() => {
//                   navigate("/cart");
//                   setMobileMenu(false);
//                 }}
//               >
//                 <span className="mobile-action-icon">🛒</span>
//                 <span className="mobile-action-text">Cart</span>
//                 {cart && cart.length > 0 && <span className="mobile-action-badge">{cart.length}</span>}
//               </button>
//               <button 
//                 className="mobile-action-item"
//                 onClick={() => {
//                   if (user) {
//                     navigate("/profile");
//                   } else {
//                     navigate("/login");
//                   }
//                   setMobileMenu(false);
//                 }}
//               >
//                 <span className="mobile-action-icon">👤</span>
//                 <span className="mobile-action-text">Account</span>
//               </button>
//               <button 
//                 className="mobile-action-item" 
//                 onClick={() => {
//                   navigate("/wishlist");
//                   setMobileMenu(false);
//                 }}
//               >
//                 <span className="mobile-action-icon">❤️</span>
//                 <span className="mobile-action-text">Wishlist</span>
//                 {wishlistCount > 0 && <span className="mobile-action-badge">{wishlistCount}</span>}
//               </button>
//             </div>

//             <div className="mobile-footer">
//               {user ? (
//                 <button className="mobile-logout" onClick={logout}>
//                   🚪 Logout
//                 </button>
//               ) : (
//                 <button 
//                   className="mobile-signin"
//                   onClick={() => {
//                     navigate("/login");
//                     setMobileMenu(false);
//                   }}
//                 >
//                   🔐 Sign In / Register
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default Navbar;




// import React, { useContext, useState, useEffect, useRef } from "react";
// import "./Navbar.css";
// import logo from "../assets/logoo.jpg";
// import { CartContext } from "../context/CartContext";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate, useLocation } from "react-router-dom";

// function Navbar() {
//   const { cart, getCartTotal, clearCart } = useContext(CartContext);
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [scrolled, setScrolled] = useState(false);
//   const [mobileMenu, setMobileMenu] = useState(false);
//   const [profileDropdown, setProfileDropdown] = useState(false);
//   const [cartDropdown, setCartDropdown] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeCategory, setActiveCategory] = useState("home");
//   const [showSearch, setShowSearch] = useState(false);

//   const searchRef = useRef(null);
//   const profileRef = useRef(null);
//   const cartRef = useRef(null);

//   const cartTotal = getCartTotal ? getCartTotal() : 
//     (Array.isArray(cart) ? cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0) : 0);

//   // Static values for notification and wishlist counts
//   const notificationCount = 3;
//   const wishlistCount = 5;

//   // FIXED: Safe user name access
//   const getUserName = () => {
//     if (!user) return "User";
//     if (user.name && typeof user.name === 'string') {
//       return user.name.split(' ')[0] || user.name;
//     }
//     if (user.email && typeof user.email === 'string') {
//       return user.email.split('@')[0] || "User";
//     }
//     return "User";
//   };

//   // FIXED: Safe user initial access
//   const getUserInitial = () => {
//     if (!user) return "U";

//     let nameStr = "";

//     // Check user.name first
//     if (user.name && typeof user.name === 'string') {
//       nameStr = user.name;
//     } 
//     // Fallback to user.email
//     else if (user.email && typeof user.email === 'string') {
//       nameStr = user.email;
//     }

//     // Return first character or default
//     return nameStr && nameStr.length > 0 ? nameStr.charAt(0).toUpperCase() : "U";
//   };

//   // FIXED: Safe user email access
//   const getUserEmail = () => {
//     if (!user) return "";
//     return user.email || "";
//   };

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (profileRef.current && !profileRef.current.contains(event.target)) {
//         setProfileDropdown(false);
//       }
//       if (cartRef.current && !cartRef.current.contains(event.target)) {
//         setCartDropdown(false);
//       }
//       if (searchRef.current && !searchRef.current.contains(event.target)) {
//         setShowSearch(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 30);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Update active category based on route
//   useEffect(() => {
//     const path = location.pathname;
//     if (path === "/") setActiveCategory("home");
//     else if (path.includes("/shop") || path.includes("/jewellery")) setActiveCategory("shop");
//     else if (path.includes("/collection")) setActiveCategory("collection");
//     else if (path.includes("/gold")) setActiveCategory("gold");
//     else if (path.includes("/diamond")) setActiveCategory("diamond");
//     else if (path.includes("/wedding")) setActiveCategory("wedding");
//     else if (path.includes("/gift")) setActiveCategory("gift");
//     else if (path.includes("/contact")) setActiveCategory("contact");
//   }, [location]);

//   const scrollToSection = (id) => {
//     if (location.pathname !== "/") {
//       navigate("/");
//       setTimeout(() => {
//         const section = document.getElementById(id);
//         if (section) {
//           section.scrollIntoView({ behavior: "smooth" });
//           setActiveCategory(id);
//         }
//       }, 500);
//     } else {
//       const section = document.getElementById(id);
//       if (section) {
//         section.scrollIntoView({ behavior: "smooth" });
//         setActiveCategory(id);
//       }
//     }
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
//       setSearchQuery("");
//       setShowSearch(false);
//     }
//   };

//   const quickCategories = [
//     "Diamond Rings", "Gold Necklaces", "Wedding Sets", "Earrings", "Bracelets", "Men's Jewellery"
//   ];

//   const navCategories = [
//     { 
//       id: "home", 
//       label: "Home", 
//       icon: "", 
//       onClick: () => scrollToSection("hero"),
//       submenu: []
//     },
//     { 
//       id: "shop", 
//       label: "Shop", 
//       icon: "", 
//       onClick: () => scrollToSection("shop"),
//       submenu: [
//         { label: "All Products", path: "/shop" },
//         { label: "New Arrivals", path: "/shop/new" },
//         { label: "Best Sellers", path: "/shop/bestsellers" },
//         { label: "Sale", path: "/shop/sale" }
//       ]
//     },
//     { 
//       id: "collections", 
//       label: "Collections", 
//       icon: "", 
//       onClick: () => scrollToSection("collection"),
//       submenu: [
//         { label: "Bridal Collection", path: "/collections/bridal" },
//         { label: "Luxury Diamonds", path: "/collections/diamonds" },
//         { label: "Everyday Wear", path: "/collections/everyday" },
//         { label: "Festive Special", path: "/collections/festive" }
//       ]
//     },
//     { 
//       id: "gold", 
//       label: "Gold", 
//       icon: "", 
//       onClick: () => navigate("/gold"),
//       submenu: [
//         { label: "22K Gold", path: "/gold/22k" },
//         { label: "18K Gold", path: "/gold/18k" },
//         { label: "Gold Coins", path: "/gold/coins" },
//         { label: "Gold Bars", path: "/gold/bars" }
//       ]
//     },
//     { 
//       id: "diamond", 
//       label: "Diamonds", 
//       icon: "", 
//       onClick: () => navigate("/diamonds"),
//       submenu: [
//         { label: "Solitaire", path: "/diamonds/solitaire" },
//         { label: "Certified Diamonds", path: "/diamonds/certified" },
//         { label: "Diamond Sets", path: "/diamonds/sets" }
//       ]
//     },
//     { 
//       id: "wedding", 
//       label: "Wedding", 
//       icon: "", 
//       onClick: () => navigate("/wedding"),
//       submenu: [
//         { label: "Bridal Sets", path: "/wedding/bridal" },
//         { label: "Mangalsutra", path: "/wedding/mangalsutra" },
//         { label: "Groom Collection", path: "/wedding/groom" }
//       ]
//     },
//     { 
//       id: "gift", 
//       label: "Gifts", 
//       icon: "", 
//       onClick: () => navigate("/gifts"),
//       submenu: [
//         { label: "Anniversary", path: "/gifts/anniversary" },
//         { label: "Birthday", path: "/gifts/birthday" },
//         { label: "Corporate", path: "/gifts/corporate" }
//       ]
//     }
//   ];

//   const userMenuItems = user ? [
//     { label: "My Profile", icon: "👤", onClick: () => navigate("/profile") },
//     { label: "My Orders", icon: "📦", onClick: () => navigate("/orders") },
//     { label: "Wishlist", icon: "❤️", badge: wishlistCount, onClick: () => navigate("/wishlist") },
//     { label: "Saved Cards", icon: "💳", onClick: () => navigate("/profile/payments") },
//     { label: "Address Book", icon: "🏠", onClick: () => navigate("/profile/addresses") },
//     { label: "Notifications", icon: "🔔", badge: notificationCount, onClick: () => navigate("/notifications") },
//     { label: "Stores", icon: "📍", onClick: () => navigate("/stores") },
//     { label: "Logout", icon: "🚪", onClick: logout },
//   ] : [
//     { label: "Login / Sign Up", icon: "🔐", onClick: () => navigate("/login") },
//     { label: "Track Order", icon: "📍", onClick: () => navigate("/track-order") },
//     { label: "Guest Checkout", icon: "🛒", onClick: () => navigate("/guest-checkout") },
//     { label: "Store Locator", icon: "📍", onClick: () => navigate("/stores") },
//   ];

//   const handleCartAction = (action, itemId = null) => {
//     switch(action) {
//       case 'checkout':
//         navigate("/checkout");
//         setCartDropdown(false);
//         break;
//       case 'clear':
//         if (window.confirm("Are you sure you want to clear your cart?")) {
//           clearCart();
//         }
//         break;
//       case 'remove':
//         // Remove item logic here
//         break;
//       default:
//         navigate("/cart");
//         setCartDropdown(false);
//     }
//   };

//   return (
//     <>
//       {/* ===== TOP PROMO BAR ===== */}
//       <div className="promo-bar">
//         <div className="promo-slider">
//           <div className="promo-slide">
//             🚚 <strong>FREE SHIPPING</strong> on orders above ₹10,000
//           </div>
//           <div className="promo-slide">
//             💎 <strong>BIS HALLMARKED</strong> | 100% Certified Jewellery
//           </div>
//           <div className="promo-slide">
//             🔒 <strong>SECURE PAYMENT</strong> | Easy EMI Options Available
//           </div>
//           <div className="promo-slide">
//             🎁 <strong>NEW YEAR SALE</strong> | Up to 50% OFF + Extra 10%
//           </div>
//         </div>
//         <div className="promo-close">✕</div>
//       </div>

//       {/* ===== MAIN NAVBAR ===== */}
//       <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
//         <div className="nav-container">

//           {/* LOGO SECTION */}
//           <div className="nav-logo" onClick={() => navigate("/")}>
//             <div className="logo-wrapper">
//               <img src={logo} alt="Rika Jewels" className="logo-image" />
//               <div className="logo-text">
//                 <h1 className="logo-name">RIKA JEWELS</h1>
//                 <p className="logo-tagline">Since 2026 • Pure & Precious</p>
//               </div>
//             </div>
//           </div>

//           {/* SEARCH BAR */}
//           <div className="nav-search" ref={searchRef}>
//             <div className={`search-wrapper ${showSearch ? 'expanded' : ''}`}>
//               <form onSubmit={handleSearch} className="search-form">
//                 <input
//                   type="text"
//                   placeholder="Search diamonds, gold, rings, necklaces..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="search-input"
//                   onFocus={() => setShowSearch(true)}
//                 />
//                 <button type="submit" className="search-button">
//                   <span className="search-icon">🔍</span>
//                   <span className="search-text">Search</span>
//                 </button>
//               </form>

//               {showSearch && (
//                 <div className="search-dropdown">
//                   <div className="search-quick-categories">
//                     <h4>Quick Categories:</h4>
//                     <div className="quick-tags">
//                       {quickCategories.map((category, index) => (
//                         <span 
//                           key={index} 
//                           className="quick-tag"
//                           onClick={() => {
//                             navigate(`/search?q=${encodeURIComponent(category)}`);
//                             setShowSearch(false);
//                           }}
//                         >
//                           {category}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                   <div className="search-recent">
//                     <h4>Recent Searches:</h4>
//                     <div className="recent-list">
//                       <span className="recent-item">💍 Diamond Rings</span>
//                       <span className="recent-item">💰 Gold Coins</span>
//                       <span className="recent-item">📿 Mangalsutra</span>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* ACTION BUTTONS - Updated layout */}
//           <div className="nav-actions">
//             {/* Store, Cart, Account, Wishlist in horizontal layout */}
//             <div className="nav-actions-row">
//               {/* STORE */}
//               <button 
//                 className="nav-action-btn store-btn"
//                 onClick={() => navigate("/stores")}
//                 title="Store Locator"
//               >
//                 <span className="nav-action-icon">📍</span>
//                 <span className="nav-action-label">Store</span>
//               </button>

//               {/* CART */}
//               <div className="nav-action-btn-container cart-container" ref={cartRef}>
//                 <button 
//                   className="nav-action-btn cart-btn"
//                   onClick={() => setCartDropdown(!cartDropdown)}
//                   title="Shopping Cart"
//                 >
//                   <span className="nav-action-icon">🛒</span>
//                   <span className="nav-action-label">Cart</span>
//                   {cart && cart.length > 0 && (
//                     <span className="nav-action-badge cart-badge">{cart.length}</span>
//                   )}
//                 </button>

//                 {cartDropdown && (
//                   <div className="cart-dropdown">
//                     <div className="cart-dropdown-header">
//                       <h3>Your Shopping Cart</h3>
//                       <span className="cart-total">Total: ₹{cartTotal.toLocaleString()}</span>
//                     </div>

//                     {cart && cart.length > 0 ? (
//                       <>
//                         <div className="cart-items-list">
//                           {cart.slice(0, 3).map((item, index) => (
//                             <div key={index} className="cart-dropdown-item">
//                               <img src={item.image} alt={item.name} className="item-image" />
//                               <div className="item-details">
//                                 <h4 className="item-name">{item.name}</h4>
//                                 <p className="item-price">₹{item.price.toLocaleString()} × {item.quantity || 1}</p>
//                                 <div className="item-actions">
//                                   <button className="item-action-btn" title="Remove">🗑️</button>
//                                   <button className="item-action-btn" title="Save for later">❤️</button>
//                                 </div>
//                               </div>
//                             </div>
//                           ))}
//                         </div>

//                         {cart.length > 3 && (
//                           <div className="cart-more-items">
//                             +{cart.length - 3} more items
//                           </div>
//                         )}

//                         <div className="cart-dropdown-actions">
//                           <button 
//                             className="cart-action-btn view-cart"
//                             onClick={() => handleCartAction('view')}
//                           >
//                             View Full Cart
//                           </button>
//                           <button 
//                             className="cart-action-btn checkout"
//                             onClick={() => handleCartAction('checkout')}
//                           >
//                             Proceed to Checkout
//                           </button>
//                           <button 
//                             className="cart-action-btn clear"
//                             onClick={() => handleCartAction('clear')}
//                           >
//                             Clear Cart
//                           </button>
//                         </div>
//                       </>
//                     ) : (
//                       <div className="cart-empty">
//                         <div className="empty-icon">🛒</div>
//                         <p>Your cart is empty</p>
//                         <button 
//                           className="shop-now-btn"
//                           onClick={() => {
//                             navigate("/shop");
//                             setCartDropdown(false);
//                           }}
//                         >
//                           Start Shopping
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* PROFILE/ACCOUNT */}
//               <div className="nav-action-btn-container profile-container" ref={profileRef}>
//                 <button 
//                   className="nav-action-btn profile-btn"
//                   onClick={() => setProfileDropdown(!profileDropdown)}
//                   title={user ? "My Account" : "Account"}
//                 >
//                   <span className="nav-action-icon">
//                     {user ? "👤" : "👤"}
//                   </span>
//                   <span className="nav-action-label">
//                     {user ? "Account" : "Account"}
//                   </span>
//                 </button>

//                 {profileDropdown && (
//                   <div className="profile-dropdown">
//                     {user ? (
//                       <>
//                         <div className="profile-header">
//                           <div className="user-avatar">
//                             {getUserInitial()}
//                           </div>
//                           <div className="user-info">
//                             <h4 className="user-name">{getUserName()}</h4>
//                             <p className="user-email">{getUserEmail()}</p>
//                             <div className="user-tier">
//                               <span className="tier-badge">💎 DIAMOND MEMBER</span>
//                               <span className="tier-points">2,500 Points</span>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="profile-stats">
//                           <div className="stat-item">
//                             <span className="stat-value">12</span>
//                             <span className="stat-label">Orders</span>
//                           </div>
//                           <div className="stat-item">
//                             <span className="stat-value">₹1.2L</span>
//                             <span className="stat-label">Spent</span>
//                           </div>
//                           <div className="stat-item">
//                             <span className="stat-value">{wishlistCount}</span>
//                             <span className="stat-label">Wishlist</span>
//                           </div>
//                         </div>
//                       </>
//                     ) : (
//                       <div className="profile-header guest">
//                         <h4>Welcome to Rika Jewels</h4>
//                         <p>Sign in for better experience</p>
//                         <button 
//                           className="signin-btn"
//                           onClick={() => {
//                             navigate("/login");
//                             setProfileDropdown(false);
//                           }}
//                         >
//                           Sign In / Register
//                         </button>
//                       </div>
//                     )}

//                     <div className="dropdown-menu">
//                       {userMenuItems.map((item, index) => (
//                         <button
//                           key={index}
//                           className="dropdown-item"
//                           onClick={() => {
//                             item.onClick();
//                             setProfileDropdown(false);
//                           }}
//                         >
//                           <span className="item-icon">{item.icon}</span>
//                           <span className="item-label">{item.label}</span>
//                           {item.badge && <span className="item-badge">{item.badge}</span>}
//                         </button>
//                       ))}
//                     </div>

//                     <div className="dropdown-footer">
//                       <div className="support-section">
//                         <div className="support-item">
//                           <span className="support-icon">📞</span>
//                           <div>
//                             <p className="support-title">24/7 Support</p>
//                             <p className="support-number">1800-123-4567</p>
//                           </div>
//                         </div>
//                         <button className="help-btn">Need Help?</button>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* WISHLIST */}
//               <button 
//                 className="nav-action-btn wishlist-btn"
//                 onClick={() => navigate("/wishlist")}
//                 title="My Wishlist"
//               >
//                 <span className="nav-action-icon">❤️</span>
//                 <span className="nav-action-label">Wishlist</span>
//                 {wishlistCount > 0 && (
//                   <span className="nav-action-badge wishlist-badge">{wishlistCount}</span>
//                 )}
//               </button>
//             </div>

//             {/* MOBILE MENU TOGGLE */}
//             <button 
//               className="mobile-toggle"
//               onClick={() => setMobileMenu(!mobileMenu)}
//             >
//               {mobileMenu ? "✕" : "☰"}
//             </button>
//           </div>
//         </div>

//         {/* CATEGORY NAVBAR */}
//         <div className="category-nav">
//           <div className="category-container">
//             {navCategories.map((category) => (
//               <div 
//                 key={category.id}
//                 className={`category-item ${activeCategory === category.id ? 'active' : ''}`}
//                 onMouseEnter={(e) => {
//                   if (category.submenu.length > 0) {
//                     e.currentTarget.classList.add('hover');
//                   }
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.classList.remove('hover');
//                 }}
//               >
//                 <button 
//                   className="category-btn"
//                   onClick={category.onClick}
//                 >
//                   <span className="category-icon">{category.icon}</span>
//                   <span className="category-label">{category.label}</span>
//                   {category.submenu.length > 0 && (
//                     <span className="category-arrow">▼</span>
//                   )}
//                 </button>

//                 {category.submenu.length > 0 && (
//                   <div className="category-submenu">
//                     <div className="submenu-container">
//                       {category.submenu.map((subItem, index) => (
//                         <button
//                           key={index}
//                           className="submenu-item"
//                           onClick={() => navigate(subItem.path)}
//                         >
//                           {subItem.label}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* SPECIAL OFFER BADGE */}
//           <div className="special-offer">
//             <span className="offer-badge"></span>
//           </div>
//         </div>
//       </nav>

//       {/* MOBILE MENU OVERLAY */}
//       {mobileMenu && (
//         <div className="mobile-menu-overlay">
//           <div className="mobile-menu-container">
//             <div className="mobile-menu-header">
//               <div className="mobile-user-info">
//                 {user ? (
//                   <>
//                     <div className="mobile-user-avatar">
//                       {getUserInitial()}
//                     </div>
//                     <div>
//                       <h4>{getUserName()}</h4>
//                       <p>{getUserEmail()}</p>
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     <div className="mobile-user-avatar">👤</div>
//                     <div>
//                       <h4>Welcome Guest</h4>
//                       <p>Sign in for better experience</p>
//                     </div>
//                   </>
//                 )}
//               </div>
//               <button 
//                 className="mobile-close"
//                 onClick={() => setMobileMenu(false)}
//               >
//                 ✕
//               </button>
//             </div>

//             <div className="mobile-search-box">
//               <form onSubmit={handleSearch}>
//                 <input
//                   type="text"
//                   placeholder="Search jewellery..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//                 <button type="submit">🔍</button>
//               </form>
//             </div>

//             <div className="mobile-nav">
//               {navCategories.map((category) => (
//                 <div key={category.id} className="mobile-nav-category">
//                   <button 
//                     className="mobile-nav-btn"
//                     onClick={() => {
//                       category.onClick();
//                       setMobileMenu(false);
//                     }}
//                   >
//                     <span className="mobile-nav-icon">{category.icon}</span>
//                     {category.label}
//                     {category.submenu.length > 0 && <span className="mobile-arrow">›</span>}
//                   </button>

//                   {category.submenu.length > 0 && (
//                     <div className="mobile-submenu">
//                       {category.submenu.map((subItem, index) => (
//                         <button
//                           key={index}
//                           className="mobile-submenu-item"
//                           onClick={() => {
//                             navigate(subItem.path);
//                             setMobileMenu(false);
//                           }}
//                         >
//                           {subItem.label}
//                         </button>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* Mobile Action Buttons */}
//             <div className="mobile-actions-grid">
//               <button className="mobile-action-item" onClick={() => navigate("/stores")}>
//                 <span className="mobile-action-icon">📍</span>
//                 <span className="mobile-action-text">Store</span>
//               </button>
//               <button 
//                 className="mobile-action-item" 
//                 onClick={() => {
//                   navigate("/cart");
//                   setMobileMenu(false);
//                 }}
//               >
//                 <span className="mobile-action-icon">🛒</span>
//                 <span className="mobile-action-text">Cart</span>
//                 {cart && cart.length > 0 && <span className="mobile-action-badge">{cart.length}</span>}
//               </button>
//               <button 
//                 className="mobile-action-item"
//                 onClick={() => {
//                   if (user) {
//                     navigate("/profile");
//                   } else {
//                     navigate("/login");
//                   }
//                   setMobileMenu(false);
//                 }}
//               >
//                 <span className="mobile-action-icon">👤</span>
//                 <span className="mobile-action-text">Account</span>
//               </button>
//               <button 
//                 className="mobile-action-item" 
//                 onClick={() => {
//                   navigate("/wishlist");
//                   setMobileMenu(false);
//                 }}
//               >
//                 <span className="mobile-action-icon">❤️</span>
//                 <span className="mobile-action-text">Wishlist</span>
//                 {wishlistCount > 0 && <span className="mobile-action-badge">{wishlistCount}</span>}
//               </button>
//             </div>

//             <div className="mobile-footer">
//               {user ? (
//                 <button className="mobile-logout" onClick={logout}>
//                   🚪 Logout
//                 </button>
//               ) : (
//                 <button 
//                   className="mobile-signin"
//                   onClick={() => {
//                     navigate("/login");
//                     setMobileMenu(false);
//                   }}
//                 >
//                   🔐 Sign In / Register
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default Navbar;



// import React, { useContext, useState, useEffect, useRef } from "react";
// import "./Navbar.css";
// import logo from "../assets/logoo.jpg";
// import { CartContext } from "../context/CartContext";
// import { useAuth } from "../context/AuthContext"; // FIXED: Changed import
// import { useNavigate, useLocation } from "react-router-dom";

// function Navbar() {
//   const { cart, getCartTotal, clearCart } = useContext(CartContext);
//   const { user, logout } = useAuth(); // FIXED: Using custom hook
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [scrolled, setScrolled] = useState(false);
//   const [mobileMenu, setMobileMenu] = useState(false);
//   const [profileDropdown, setProfileDropdown] = useState(false);
//   const [cartDropdown, setCartDropdown] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeCategory, setActiveCategory] = useState("home");
//   const [showSearch, setShowSearch] = useState(false);

//   const searchRef = useRef(null);
//   const profileRef = useRef(null);
//   const cartRef = useRef(null);

//   // Debug: Log user data to see what we're getting
//   useEffect(() => {
//     console.log("Navbar - User data:", user);
//   }, [user]);

//   const cartTotal = getCartTotal ? getCartTotal() : 
//     (Array.isArray(cart) ? cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0) : 0);

//   // Static values for notification and wishlist counts
//   const notificationCount = 3;
//   const wishlistCount = 5;

//   // FIXED: Safe user name access
//   const getUserName = () => {
//     if (!user) return "User";
//     if (user.name && typeof user.name === 'string') {
//       return user.name.split(' ')[0] || user.name;
//     }
//     if (user.email && typeof user.email === 'string') {
//       return user.email.split('@')[0] || "User";
//     }
//     return "User";
//   };

//   // FIXED: Safe user initial access
//   const getUserInitial = () => {
//     if (!user) return "U";

//     let nameStr = "";

//     // Check user.name first
//     if (user.name && typeof user.name === 'string') {
//       nameStr = user.name;
//     } 
//     // Fallback to user.email
//     else if (user.email && typeof user.email === 'string') {
//       nameStr = user.email;
//     }

//     // Return first character or default
//     return nameStr && nameStr.length > 0 ? nameStr.charAt(0).toUpperCase() : "U";
//   };

//   // FIXED: Safe user email access
//   const getUserEmail = () => {
//     if (!user) return "";
//     return user.email || "";
//   };

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (profileRef.current && !profileRef.current.contains(event.target)) {
//         setProfileDropdown(false);
//       }
//       if (cartRef.current && !cartRef.current.contains(event.target)) {
//         setCartDropdown(false);
//       }
//       if (searchRef.current && !searchRef.current.contains(event.target)) {
//         setShowSearch(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 30);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Update active category based on route
//   useEffect(() => {
//     const path = location.pathname;
//     if (path === "/") setActiveCategory("home");
//     else if (path.includes("/shop") || path.includes("/jewellery")) setActiveCategory("shop");
//     else if (path.includes("/collection")) setActiveCategory("collection");
//     else if (path.includes("/gold")) setActiveCategory("gold");
//     else if (path.includes("/diamond")) setActiveCategory("diamond");
//     else if (path.includes("/wedding")) setActiveCategory("wedding");
//     else if (path.includes("/gift")) setActiveCategory("gift");
//     else if (path.includes("/contact")) setActiveCategory("contact");
//   }, [location]);

//   const scrollToSection = (id) => {
//     if (location.pathname !== "/") {
//       navigate("/");
//       setTimeout(() => {
//         const section = document.getElementById(id);
//         if (section) {
//           section.scrollIntoView({ behavior: "smooth" });
//           setActiveCategory(id);
//         }
//       }, 500);
//     } else {
//       const section = document.getElementById(id);
//       if (section) {
//         section.scrollIntoView({ behavior: "smooth" });
//         setActiveCategory(id);
//       }
//     }
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
//       setSearchQuery("");
//       setShowSearch(false);
//     }
//   };

//   const quickCategories = [
//     "Diamond Rings", "Gold Necklaces", "Wedding Sets", "Earrings", "Bracelets", "Men's Jewellery"
//   ];

//   const navCategories = [
//     { 
//       id: "home", 
//       label: "Home", 
//       icon: "", 
//       onClick: () => scrollToSection("hero"),
//       submenu: []
//     },
//     { 
//       id: "shop", 
//       label: "Shop", 
//       icon: "", 
//       onClick: () => scrollToSection("shop"),
//       submenu: [
//         { label: "All Products", path: "/shop" },
//         { label: "New Arrivals", path: "/shop/new" },
//         { label: "Best Sellers", path: "/shop/bestsellers" },
//         { label: "Sale", path: "/shop/sale" }
//       ]
//     },
//     { 
//       id: "collections", 
//       label: "Collections", 
//       icon: "", 
//       onClick: () => scrollToSection("collection"),
//       submenu: [
//         { label: "Bridal Collection", path: "/collections/bridal" },
//         { label: "Luxury Diamonds", path: "/collections/diamonds" },
//         { label: "Everyday Wear", path: "/collections/everyday" },
//         { label: "Festive Special", path: "/collections/festive" }
//       ]
//     },
//     { 
//       id: "gold", 
//       label: "Gold", 
//       icon: "", 
//       onClick: () => navigate("/gold"),
//       submenu: [
//         { label: "22K Gold", path: "/gold/22k" },
//         { label: "18K Gold", path: "/gold/18k" },
//         { label: "Gold Coins", path: "/gold/coins" },
//         { label: "Gold Bars", path: "/gold/bars" }
//       ]
//     },
//     { 
//       id: "diamond", 
//       label: "Diamonds", 
//       icon: "", 
//       onClick: () => navigate("/diamonds"),
//       submenu: [
//         { label: "Solitaire", path: "/diamonds/solitaire" },
//         { label: "Certified Diamonds", path: "/diamonds/certified" },
//         { label: "Diamond Sets", path: "/diamonds/sets" }
//       ]
//     },
//     { 
//       id: "wedding", 
//       label: "Wedding", 
//       icon: "", 
//       onClick: () => navigate("/wedding"),
//       submenu: [
//         { label: "Bridal Sets", path: "/wedding/bridal" },
//         { label: "Mangalsutra", path: "/wedding/mangalsutra" },
//         { label: "Groom Collection", path: "/wedding/groom" }
//       ]
//     },
//     { 
//       id: "gift", 
//       label: "Gifts", 
//       icon: "", 
//       onClick: () => navigate("/gifts"),
//       submenu: [
//         { label: "Anniversary", path: "/gifts/anniversary" },
//         { label: "Birthday", path: "/gifts/birthday" },
//         { label: "Corporate", path: "/gifts/corporate" }
//       ]
//     }
//   ];

//   const userMenuItems = user ? [
//     { label: "My Profile", icon: "👤", onClick: () => navigate("/profile") },
//     { label: "My Orders", icon: "📦", onClick: () => navigate("/orders") },
//     { label: "Wishlist", icon: "❤️", badge: wishlistCount, onClick: () => navigate("/wishlist") },
//     { label: "Saved Cards", icon: "💳", onClick: () => navigate("/profile/payments") },
//     { label: "Address Book", icon: "🏠", onClick: () => navigate("/profile/addresses") },
//     { label: "Notifications", icon: "🔔", badge: notificationCount, onClick: () => navigate("/notifications") },
//     { label: "Stores", icon: "📍", onClick: () => navigate("/stores") },
//     { label: "Logout", icon: "🚪", onClick: logout },
//   ] : [
//     { label: "Login / Sign Up", icon: "🔐", onClick: () => navigate("/login") },
//     { label: "Track Order", icon: "📍", onClick: () => navigate("/track-order") },
//     { label: "Guest Checkout", icon: "🛒", onClick: () => navigate("/guest-checkout") },
//     { label: "Store Locator", icon: "📍", onClick: () => navigate("/stores") },
//   ];

//   const handleCartAction = (action, itemId = null) => {
//     switch(action) {
//       case 'checkout':
//         navigate("/checkout");
//         setCartDropdown(false);
//         break;
//       case 'clear':
//         if (window.confirm("Are you sure you want to clear your cart?")) {
//           clearCart();
//         }
//         break;
//       case 'remove':
//         // Remove item logic here
//         break;
//       default:
//         navigate("/cart");
//         setCartDropdown(false);
//     }
//   };

//   return (
//     <>
//       {/* ===== TOP PROMO BAR ===== */}
//       <div className="promo-bar">
//         <div className="promo-slider">
//           <div className="promo-slide">
//             🚚 <strong>FREE SHIPPING</strong> on orders above ₹10,000
//           </div>
//           <div className="promo-slide">
//             💎 <strong>BIS HALLMARKED</strong> | 100% Certified Jewellery
//           </div>
//           <div className="promo-slide">
//             🔒 <strong>SECURE PAYMENT</strong> | Easy EMI Options Available
//           </div>
//           <div className="promo-slide">
//             🎁 <strong>NEW YEAR SALE</strong> | Up to 50% OFF + Extra 10%
//           </div>
//         </div>
//         <div className="promo-close">✕</div>
//       </div>

//       {/* ===== MAIN NAVBAR ===== */}
//       <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
//         <div className="nav-container">

//           {/* LOGO SECTION */}
//           <div className="nav-logo" onClick={() => navigate("/")}>
//             <div className="logo-wrapper">
//               <img src={logo} alt="Rika Jewels" className="logo-image" />
//               <div className="logo-text">
//                 <h1 className="logo-name">RIKA JEWELS</h1>
//                 <p className="logo-tagline">Since 2026 • Pure & Precious</p>
//               </div>
//             </div>
//           </div>

//           {/* SEARCH BAR */}
//           <div className="nav-search" ref={searchRef}>
//             <div className={`search-wrapper ${showSearch ? 'expanded' : ''}`}>
//               <form onSubmit={handleSearch} className="search-form">
//                 <input
//                   type="text"
//                   placeholder="Search diamonds, gold, rings, necklaces..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="search-input"
//                   onFocus={() => setShowSearch(true)}
//                 />
//                 <button type="submit" className="search-button">
//                   <span className="search-icon">🔍</span>
//                   <span className="search-text">Search</span>
//                 </button>
//               </form>

//               {showSearch && (
//                 <div className="search-dropdown">
//                   <div className="search-quick-categories">
//                     <h4>Quick Categories:</h4>
//                     <div className="quick-tags">
//                       {quickCategories.map((category, index) => (
//                         <span 
//                           key={index} 
//                           className="quick-tag"
//                           onClick={() => {
//                             navigate(`/search?q=${encodeURIComponent(category)}`);
//                             setShowSearch(false);
//                           }}
//                         >
//                           {category}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                   <div className="search-recent">
//                     <h4>Recent Searches:</h4>
//                     <div className="recent-list">
//                       <span className="recent-item">💍 Diamond Rings</span>
//                       <span className="recent-item">💰 Gold Coins</span>
//                       <span className="recent-item">📿 Mangalsutra</span>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* ACTION BUTTONS - Updated layout */}
//           <div className="nav-actions">
//             {/* Store, Cart, Account, Wishlist in horizontal layout */}
//             <div className="nav-actions-row">
//               {/* STORE */}
//               <button 
//                 className="nav-action-btn store-btn"
//                 onClick={() => navigate("/stores")}
//                 title="Store Locator"
//               >
//                 <span className="nav-action-icon">📍</span>
//                 <span className="nav-action-label">Store</span>
//               </button>

//               {/* CART */}
//               <div className="nav-action-btn-container cart-container" ref={cartRef}>
//                 <button 
//                   className="nav-action-btn cart-btn"
//                   onClick={() => setCartDropdown(!cartDropdown)}
//                   title="Shopping Cart"
//                 >
//                   <span className="nav-action-icon">🛒</span>
//                   <span className="nav-action-label">Cart</span>
//                   {cart && cart.length > 0 && (
//                     <span className="nav-action-badge cart-badge">{cart.length}</span>
//                   )}
//                 </button>

//                 {cartDropdown && (
//                   <div className="cart-dropdown">
//                     <div className="cart-dropdown-header">
//                       <h3>Your Shopping Cart</h3>
//                       <span className="cart-total">Total: ₹{cartTotal.toLocaleString()}</span>
//                     </div>

//                     {cart && cart.length > 0 ? (
//                       <>
//                         <div className="cart-items-list">
//                           {cart.slice(0, 3).map((item, index) => (
//                             <div key={index} className="cart-dropdown-item">
//                               <img src={item.image} alt={item.name} className="item-image" />
//                               <div className="item-details">
//                                 <h4 className="item-name">{item.name}</h4>
//                                 <p className="item-price">₹{item.price.toLocaleString()} × {item.quantity || 1}</p>
//                                 <div className="item-actions">
//                                   <button className="item-action-btn" title="Remove">🗑️</button>
//                                   <button className="item-action-btn" title="Save for later">❤️</button>
//                                 </div>
//                               </div>
//                             </div>
//                           ))}
//                         </div>

//                         {cart.length > 3 && (
//                           <div className="cart-more-items">
//                             +{cart.length - 3} more items
//                           </div>
//                         )}

//                         <div className="cart-dropdown-actions">
//                           <button 
//                             className="cart-action-btn view-cart"
//                             onClick={() => handleCartAction('view')}
//                           >
//                             View Full Cart
//                           </button>
//                           <button 
//                             className="cart-action-btn checkout"
//                             onClick={() => handleCartAction('checkout')}
//                           >
//                             Proceed to Checkout
//                           </button>
//                           <button 
//                             className="cart-action-btn clear"
//                             onClick={() => handleCartAction('clear')}
//                           >
//                             Clear Cart
//                           </button>
//                         </div>
//                       </>
//                     ) : (
//                       <div className="cart-empty">
//                         <div className="empty-icon">🛒</div>
//                         <p>Your cart is empty</p>
//                         <button 
//                           className="shop-now-btn"
//                           onClick={() => {
//                             navigate("/shop");
//                             setCartDropdown(false);
//                           }}
//                         >
//                           Start Shopping
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* PROFILE/ACCOUNT */}
//               <div className="nav-action-btn-container profile-container" ref={profileRef}>
//                 <button 
//                   className="nav-action-btn profile-btn"
//                   onClick={() => setProfileDropdown(!profileDropdown)}
//                   title={user ? "My Account" : "Account"}
//                 >
//                   <span className="nav-action-icon">
//                     {user ? "👤" : "👤"}
//                   </span>
//                   <span className="nav-action-label">
//                     {user ? "Account" : "Account"}
//                   </span>
//                 </button>

//                 {profileDropdown && (
//                   <div className="profile-dropdown">
//                     {user ? (
//                       <>
//                         <div className="profile-header">
//                           <div className="user-avatar">
//                             {getUserInitial()}
//                           </div>
//                           <div className="user-info">
//                             <h4 className="user-name">{getUserName()}</h4>
//                             <p className="user-email">{getUserEmail()}</p>
//                             <div className="user-tier">
//                               <span className="tier-badge">💎 DIAMOND MEMBER</span>
//                               <span className="tier-points">2,500 Points</span>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="profile-stats">
//                           <div className="stat-item">
//                             <span className="stat-value">12</span>
//                             <span className="stat-label">Orders</span>
//                           </div>
//                           <div className="stat-item">
//                             <span className="stat-value">₹1.2L</span>
//                             <span className="stat-label">Spent</span>
//                           </div>
//                           <div className="stat-item">
//                             <span className="stat-value">{wishlistCount}</span>
//                             <span className="stat-label">Wishlist</span>
//                           </div>
//                         </div>
//                       </>
//                     ) : (
//                       <div className="profile-header guest">
//                         <h4>Welcome to Rika Jewels</h4>
//                         <p>Sign in for better experience</p>
//                         <button 
//                           className="signin-btn"
//                           onClick={() => {
//                             navigate("/login");
//                             setProfileDropdown(false);
//                           }}
//                         >
//                           Sign In / Register
//                         </button>
//                       </div>
//                     )}

//                     <div className="dropdown-menu">
//                       {userMenuItems.map((item, index) => (
//                         <button
//                           key={index}
//                           className="dropdown-item"
//                           onClick={() => {
//                             item.onClick();
//                             setProfileDropdown(false);
//                           }}
//                         >
//                           <span className="item-icon">{item.icon}</span>
//                           <span className="item-label">{item.label}</span>
//                           {item.badge && <span className="item-badge">{item.badge}</span>}
//                         </button>
//                       ))}
//                     </div>

//                     <div className="dropdown-footer">
//                       <div className="support-section">
//                         <div className="support-item">
//                           <span className="support-icon">📞</span>
//                           <div>
//                             <p className="support-title">24/7 Support</p>
//                             <p className="support-number">1800-123-4567</p>
//                           </div>
//                         </div>
//                         <button className="help-btn">Need Help?</button>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* WISHLIST */}
//               <button 
//                 className="nav-action-btn wishlist-btn"
//                 onClick={() => navigate("/wishlist")}
//                 title="My Wishlist"
//               >
//                 <span className="nav-action-icon">❤️</span>
//                 <span className="nav-action-label">Wishlist</span>
//                 {wishlistCount > 0 && (
//                   <span className="nav-action-badge wishlist-badge">{wishlistCount}</span>
//                 )}
//               </button>
//             </div>

//             {/* MOBILE MENU TOGGLE */}
//             <button 
//               className="mobile-toggle"
//               onClick={() => setMobileMenu(!mobileMenu)}
//             >
//               {mobileMenu ? "✕" : "☰"}
//             </button>
//           </div>
//         </div>

//         {/* CATEGORY NAVBAR */}
//         <div className="category-nav">
//           <div className="category-container">
//             {navCategories.map((category) => (
//               <div 
//                 key={category.id}
//                 className={`category-item ${activeCategory === category.id ? 'active' : ''}`}
//                 onMouseEnter={(e) => {
//                   if (category.submenu.length > 0) {
//                     e.currentTarget.classList.add('hover');
//                   }
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.classList.remove('hover');
//                 }}
//               >
//                 <button 
//                   className="category-btn"
//                   onClick={category.onClick}
//                 >
//                   <span className="category-icon">{category.icon}</span>
//                   <span className="category-label">{category.label}</span>
//                   {category.submenu.length > 0 && (
//                     <span className="category-arrow">▼</span>
//                   )}
//                 </button>

//                 {category.submenu.length > 0 && (
//                   <div className="category-submenu">
//                     <div className="submenu-container">
//                       {category.submenu.map((subItem, index) => (
//                         <button
//                           key={index}
//                           className="submenu-item"
//                           onClick={() => navigate(subItem.path)}
//                         >
//                           {subItem.label}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* SPECIAL OFFER BADGE */}
//           <div className="special-offer">
//             <span className="offer-badge"></span>
//           </div>
//         </div>
//       </nav>

//       {/* MOBILE MENU OVERLAY */}
//       {mobileMenu && (
//         <div className="mobile-menu-overlay">
//           <div className="mobile-menu-container">
//             <div className="mobile-menu-header">
//               <div className="mobile-user-info">
//                 {user ? (
//                   <>
//                     <div className="mobile-user-avatar">
//                       {getUserInitial()}
//                     </div>
//                     <div>
//                       <h4>{getUserName()}</h4>
//                       <p>{getUserEmail()}</p>
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     <div className="mobile-user-avatar">👤</div>
//                     <div>
//                       <h4>Welcome Guest</h4>
//                       <p>Sign in for better experience</p>
//                     </div>
//                   </>
//                 )}
//               </div>
//               <button 
//                 className="mobile-close"
//                 onClick={() => setMobileMenu(false)}
//               >
//                 ✕
//               </button>
//             </div>

//             <div className="mobile-search-box">
//               <form onSubmit={handleSearch}>
//                 <input
//                   type="text"
//                   placeholder="Search jewellery..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//                 <button type="submit">🔍</button>
//               </form>
//             </div>

//             <div className="mobile-nav">
//               {navCategories.map((category) => (
//                 <div key={category.id} className="mobile-nav-category">
//                   <button 
//                     className="mobile-nav-btn"
//                     onClick={() => {
//                       category.onClick();
//                       setMobileMenu(false);
//                     }}
//                   >
//                     <span className="mobile-nav-icon">{category.icon}</span>
//                     {category.label}
//                     {category.submenu.length > 0 && <span className="mobile-arrow">›</span>}
//                   </button>

//                   {category.submenu.length > 0 && (
//                     <div className="mobile-submenu">
//                       {category.submenu.map((subItem, index) => (
//                         <button
//                           key={index}
//                           className="mobile-submenu-item"
//                           onClick={() => {
//                             navigate(subItem.path);
//                             setMobileMenu(false);
//                           }}
//                         >
//                           {subItem.label}
//                         </button>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* Mobile Action Buttons */}
//             <div className="mobile-actions-grid">
//               <button className="mobile-action-item" onClick={() => navigate("/stores")}>
//                 <span className="mobile-action-icon">📍</span>
//                 <span className="mobile-action-text">Store</span>
//               </button>
//               <button 
//                 className="mobile-action-item" 
//                 onClick={() => {
//                   navigate("/cart");
//                   setMobileMenu(false);
//                 }}
//               >
//                 <span className="mobile-action-icon">🛒</span>
//                 <span className="mobile-action-text">Cart</span>
//                 {cart && cart.length > 0 && <span className="mobile-action-badge">{cart.length}</span>}
//               </button>
//               <button 
//                 className="mobile-action-item"
//                 onClick={() => {
//                   if (user) {
//                     navigate("/profile");
//                   } else {
//                     navigate("/login");
//                   }
//                   setMobileMenu(false);
//                 }}
//               >
//                 <span className="mobile-action-icon">👤</span>
//                 <span className="mobile-action-text">Account</span>
//               </button>
//               <button 
//                 className="mobile-action-item" 
//                 onClick={() => {
//                   navigate("/wishlist");
//                   setMobileMenu(false);
//                 }}
//               >
//                 <span className="mobile-action-icon">❤️</span>
//                 <span className="mobile-action-text">Wishlist</span>
//                 {wishlistCount > 0 && <span className="mobile-action-badge">{wishlistCount}</span>}
//               </button>
//             </div>

//             <div className="mobile-footer">
//               {user ? (
//                 <button className="mobile-logout" onClick={logout}>
//                   🚪 Logout
//                 </button>
//               ) : (
//                 <button 
//                   className="mobile-signin"
//                   onClick={() => {
//                     navigate("/login");
//                     setMobileMenu(false);
//                   }}
//                 >
//                   🔐 Sign In / Register
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default Navbar;







import React, { useContext, useState, useEffect, useRef } from "react";
import "./Navbar.css";
import logo from "../assets/logoo.jpg";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const { cart, getCartTotal, clearCart } = useContext(CartContext);
  const { user, logout } = useAuth();
  const { getWishlistCount } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [cartDropdown, setCartDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("home");
  const [showSearch, setShowSearch] = useState(false);
  const [promos, setPromos] = useState([]);

  useEffect(() => {
    const fetchPromos = async () => {
      try {
        const response = await fetch('/api/promos');
        const data = await response.json();
        const activePromos = data.filter(p => p.isActive);
        if (activePromos.length > 0) {
          setPromos(activePromos);
        }
      } catch (error) {
        console.error('Error fetching promos:', error);
      }
    };
    fetchPromos();
  }, []);

  const searchRef = useRef(null);
  const profileRef = useRef(null);
  const cartRef = useRef(null);

  // REMOVED debug useEffect that might cause issues
  // useEffect(() => {
  //   console.log("Navbar - User data:", user);
  // }, [user]);

  // Safe user object check
  const safeUser = React.useMemo(() => {
    if (!user || typeof user !== 'object') return null;
    return {
      name: typeof user.name === 'string' ? user.name : '',
      email: typeof user.email === 'string' ? user.email : '',
      phone: typeof user.phone === 'string' ? user.phone : '',
      // Add other properties as needed
    };
  }, [user]);

  const cartTotal = getCartTotal ? getCartTotal() :
    (Array.isArray(cart) ? cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0) : 0);

  const notificationCount = 3;
  const wishlistCount = getWishlistCount ? getWishlistCount() : 0;

  // FIXED: Enhanced safe user name access
  const getUserName = () => {
    if (!safeUser || !safeUser.name) {
      // Check original user object as fallback
      if (user && typeof user === 'object' && typeof user.name === 'string') {
        const name = user.name.split(' ')[0] || user.name;
        return name || "User";
      }
      if (user && typeof user === 'object' && typeof user.email === 'string') {
        return user.email.split('@')[0] || "User";
      }
      return "User";
    }

    const name = safeUser.name.split(' ')[0] || safeUser.name;
    return name || "User";
  };

  // FIXED: Enhanced safe user initial access
  const getUserInitial = () => {
    const name = getUserName();
    return name && name.length > 0 ? name.charAt(0).toUpperCase() : "U";
  };

  // FIXED: Enhanced safe user email access
  const getUserEmail = () => {
    if (safeUser && safeUser.email) return safeUser.email;
    if (user && typeof user === 'object' && typeof user.email === 'string') {
      return user.email;
    }
    return "";
  };

  // Check if user is logged in (safely)
  const isUserLoggedIn = () => {
    return !!(safeUser || (user && typeof user === 'object' && (user.name || user.email)));
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdown(false);
      }
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setCartDropdown(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update active category based on route
  useEffect(() => {
    const path = location.pathname;
    if (path === "/") setActiveCategory("home");
    else if (path.includes("/shop") || path.includes("/jewellery")) setActiveCategory("shop");
    else if (path.includes("/collection")) setActiveCategory("collection");
    else if (path.includes("/gold")) setActiveCategory("gold");
    else if (path.includes("/diamond")) setActiveCategory("diamond");
    else if (path.includes("/wedding")) setActiveCategory("wedding");
    else if (path.includes("/gift")) setActiveCategory("gift");
    else if (path.includes("/contact")) setActiveCategory("contact");
    else if (path.includes("/Shop")) setActiveCategory("Shop");
    else if (path.includes("/platinum")) setActiveCategory("platinum");
    else if (path.includes("/silver")) setActiveCategory("silver");
    else if (path.includes("/gemstone")) setActiveCategory("gemstone");
    else if (path.includes("/diamond")) setActiveCategory("diamond");
  }, [location]);

  const scrollToSection = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const section = document.getElementById(id);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
          setActiveCategory(id);
        }
      }, 500);
    } else {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        setActiveCategory(id);
      }
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setShowSearch(false);
    }
  };

  const quickCategories = [
    "Diamond Rings", "Gold Necklaces", "Wedding Sets", "Earrings", "Bracelets", "Men's Jewellery"
  ];

  const navCategories = [
    {
      id: "home",
      label: "Home",
      icon: "",
      onClick: () => scrollToSection("hero"),
      submenu: []
    },

    {
      id: "Collections",
      label: "Collections",
      icon: "",
      onClick: () => navigate("/collections"),
      submenu: [
        // { label: "Bridal Collection", path: "/collections/bridal" },
        // { label: "Luxury Diamonds", path: "/collections/diamonds" },
        // { label: "Everyday Wear", path: "/collections/everyday" },
        // { label: "Festive Special", path: "/collections/festive" }
        { label: "Gold Jewellery", path: "/gold" },
        { label: "Silver Jewellery", path: "/silver" },
        { label: "Diamond Jewellery", path: "/diamond" },
        { label: "All Jewellery", path: "/collections" }

      ]
    },

    {
      id: "Silver",
      label: "Silver",
      icon: "",
      onClick: () => navigate("/silver"),
      submenu: []
    },

    {
      id: "gold",
      label: "Gold",
      icon: "",
      onClick: () => navigate("/gold"),
      submenu: [
        // { label: "22K Gold", path: "/gold/22k" },
        // { label: "18K Gold", path: "/gold/18k" },
        // { label: "Gold Coins", path: "/gold/coins" },
        // { label: "Gold Bars", path: "/gold/bars" }
      ]
    },
    {
      id: "Diamond",
      label: "Diamond",
      icon: "",
      onClick: () => navigate("/diamond"),
      submenu: [
        // { label: "Solitaire", path: "/diamonds/solitaire" },
        // { label: "Certified Diamonds", path: "/diamonds/certified" },
        // { label: "Diamond Sets", path: "/diamonds/sets" }
      ]
    },


    {
      id: "Platinum",
      label: "Platinum",
      icon: "",
      onClick: () => navigate("/platinum"),
      submenu: []
    },

    {
      id: "Gemstone",
      label: "Gemstone",
      icon: "",
      onClick: () => navigate("/gemstone"),
      submenu: [
        //   { label: "Bridal Sets", path: "/wedding/bridal" },
        //   { label: "Mangalsutra", path: "/wedding/mangalsutra" },
        //   { label: "Groom Collection", path: "/wedding/groom" }
      ]
    },

    {
      id: "Wedding",
      label: "Wedding",
      icon: "",
      onClick: () => navigate("/wedding"),
      submenu: [
        // { label: "Bridal Sets", path: "/wedding/bridal" },
        // { label: "Mangalsutra", path: "/wedding/mangalsutra" },
        // { label: "Groom Collection", path: "/wedding/groom" }
      ]
    },

    {
      id: "gift",
      label: "Gift",
      icon: "",
      onClick: () => navigate("/gift"),
      submenu: [
        // { label: "Anniversary", path: "/gifts/anniversary" },
        // { label: "Birthday", path: "/gifts/birthday" },
        // { label: "Corporate", path: "/gifts/corporate" }
      ]
    },

    {
      id: "shop",
      label: "Shop",
      icon: "",
      onClick: () => navigate("/shop"),
      submenu: [
        // { label: "All Products", path: "/shop" },
        // { label: "New Arrivals", path: "/shop/new" },
        // { label: "Best Sellers", path: "/shop/bestsellers" },
        // { label: "Sale", path: "/shop/sale" }
      ]
    },

    {
      id: "contact",
      label: "Contact",
      icon: "",
      onClick: () => navigate("/contact"), // Make sure this line exists
      submenu: []
    }
  ];

  // Safe user menu items
  const userMenuItems = user ? [
    ...(user && (user.role === 'admin' || user.isAdmin === true || user.isAdmin === "true") ? [{ label: "Admin Dashboard", icon: "⚡", onClick: () => navigate("/admin/dashboard") }] : []),
    { label: "My Profile", icon: "👤", onClick: () => navigate("/profile") },
    { label: "My Orders", icon: "📦", onClick: () => navigate("/orders") },
    { label: "Wishlist", icon: "❤️", badge: wishlistCount, onClick: () => navigate("/wishlist") },
    // { label: "Saved Cards", icon: "💳", onClick: () => navigate("/profile/payments") },
    // { label: "Address Book", icon: "🏠", onClick: () => navigate("/profile/addresses") },
    // { label: "Notifications", icon: "🔔", badge: notificationCount, onClick: () => navigate("/notifications") },
    { label: "Stores", icon: "📍", onClick: () => navigate("/stores") },
    { label: "Logout", icon: "🚪", onClick: logout },
  ] : [
    { label: "Login securely", icon: "🔐", onClick: () => navigate("/login"), className: "menu-login-btn" },
    { label: "Create an Account", icon: "✨", onClick: () => navigate("/Signup"), className: "menu-signup-btn" },
    { label: "Store Locator", icon: "📍", onClick: () => navigate("/stores"), className: "menu-login-btn" },
  ];

  const handleCartAction = (action, itemId = null) => {
    switch (action) {
      case 'checkout':
        navigate("/checkout");
        setCartDropdown(false);
        break;
      case 'clear':
        if (window.confirm("Are you sure you want to clear your cart?")) {
          clearCart();
        }
        break;
      case 'remove':
        // Remove item logic here
        break;
      default:
        navigate("/cart");
        setCartDropdown(false);
    }
  };

  // The rest of your JSX remains the same...
  // I'll continue with the JSX but the key changes are above

  return (
    <>
      {/* ===== TOP PROMO BAR ===== */}
      <div className="promo-bar">
        <div className="promo-slider">
          {promos.length > 0 ? (
            promos.map((promo, index) => (
              <div key={index} className="promo-slide">
                {promo.text}
              </div>
            ))
          ) : (
            <>
              <div className="promo-slide">
                🚚 <strong>FREE SHIPPING</strong> on orders above ₹10,000
              </div>
              <div className="promo-slide">
                💎 <strong>BIS HALLMARKED</strong> | 100% Certified Jewellery
              </div>
              <div className="promo-slide">
                🔒 <strong>SECURE PAYMENT</strong> | Easy EMI Options Available
              </div>
              <div className="promo-slide">
                🎁 <strong>NEW YEAR SALE</strong> | Up to 50% OFF + Extra 10%
              </div>
            </>
          )}
        </div>
      </div>

      {/* ===== MAIN NAVBAR ===== */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">

          {/* LOGO SECTION */}
          <div className="nav-logo" onClick={() => navigate("/")}>
            <div className="logo-wrapper">
              <img src={logo} alt="Rika Jewels" className="logo-image" />
              <div className="logo-text">
                <h1 className="logo-name">RIKA JEWELLS</h1>
                <p className="logo-tagline">Since 2026 • Pure & Precious</p>
              </div>
            </div>
          </div>

          {/* SEARCH BAR */}
          <div className="nav-search" ref={searchRef}>
            <div className={`search-wrapper ${showSearch ? 'expanded' : ''}`}>
              <form onSubmit={handleSearch} className="search-form">
                <input
                  type="text"
                  placeholder="Search diamonds, gold, rings, necklaces..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                  onFocus={() => setShowSearch(true)}
                />
                <button type="submit" className="search-button">
                  <span className="search-icon">🔍</span>
                  <span className="search-text">Search</span>
                </button>
              </form>

              {showSearch && (
                <div className="search-dropdown">
                  <div className="search-quick-categories">
                    <h4>Quick Categories:</h4>
                    <div className="quick-tags">
                      {quickCategories.map((category, index) => (
                        <span
                          key={index}
                          className="quick-tag"
                          onClick={() => {
                            navigate(`/search?q=${encodeURIComponent(category)}`);
                            setShowSearch(false);
                          }}
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="search-recent">
                    <h4>Recent Searches:</h4>
                    <div className="recent-list">
                      <span className="recent-item">💍 Diamond Rings</span>
                      <span className="recent-item">💰 Gold Coins</span>
                      <span className="recent-item">📿 Mangalsutra</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="nav-actions">
            <div className="nav-actions-row">
              {/* STORE
              <button 
                className="nav-action-btn store-btn"
                onClick={() => navigate("/Store")}
                title="Store Locator"
              >
                <span className="nav-action-icon">📍</span>
                <span className="nav-action-label">Store</span>
              </button> */}
              {/* <button 
                 className="nav-action-btn shop-btn"
                  onClick={() => navigate("/shop")}
                     title="Shop & Store Locations"
                >
                   <span className="nav-action-icon">🛍️</span>
                     <span className="nav-action-label">Shop</span>
               </button> */}
              {/* CART */}
              <div className="nav-action-btn-container cart-container" ref={cartRef}>
                <button
                  className="nav-action-btn cart-btn"
                  onClick={() => setCartDropdown(!cartDropdown)}
                  title="Shopping Cart"
                >
                  <span className="nav-action-icon">🛒</span>
                  <span className="nav-action-label">Cart</span>
                  {cart && cart.length > 0 && (
                    <span className="nav-action-badge cart-badge">{cart.length}</span>
                  )}
                </button>

                {cartDropdown && (
                  <div className="cart-dropdown">
                    <div className="cart-dropdown-header">
                      <h3>Your Shopping Cart</h3>
                      <span className="cart-total">Total: ₹{cartTotal.toLocaleString()}</span>
                    </div>

                    {cart && cart.length > 0 ? (
                      <>
                        <div className="cart-items-list">
                          {cart.slice(0, 3).map((item, index) => (
                            <div key={index} className="cart-dropdown-item">
                              <img src={item.image} alt={item.name} className="item-image" />
                              <div className="item-details">
                                <h4 className="item-name">{item.name}</h4>
                                <p className="item-price">₹{item.price.toLocaleString()} × {item.quantity || 1}</p>
                                <div className="item-actions">
                                  <button className="item-action-btn" title="Remove">🗑️</button>
                                  <button className="item-action-btn" title="Save for later">❤️</button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {cart.length > 3 && (
                          <div className="cart-more-items">
                            +{cart.length - 3} more items
                          </div>
                        )}

                        <div className="cart-dropdown-actions">
                          <button
                            className="cart-action-btn view-cart"
                            onClick={() => handleCartAction('view')}
                          >
                            View Full Cart
                          </button>
                          <button
                            className="cart-action-btn checkout"
                            onClick={() => handleCartAction('checkout')}
                          >
                            Proceed to Checkout
                          </button>
                          <button
                            className="cart-action-btn clear"
                            onClick={() => handleCartAction('clear')}
                          >
                            Clear Cart
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="cart-empty">
                        <div className="empty-icon">🛒</div>
                        <p>Your cart is empty</p>
                        <button
                          className="shop-now-btn"
                          onClick={() => {
                            navigate("/shop");
                            setCartDropdown(false);
                          }}
                        >
                          Start Shopping
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* PROFILE/ACCOUNT */}
              <div className="nav-action-btn-container nav-profile-wrapper" ref={profileRef}>
                <button
                  className="nav-action-btn profile-btn"
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  title={isUserLoggedIn() ? "My Account" : "Account"}
                >
                  <span className="nav-action-icon">
                    {isUserLoggedIn() ? "👤" : "👤"}
                  </span>
                  <span className="nav-action-label">
                    {isUserLoggedIn() ? "Account" : "Account"}
                  </span>
                </button>

                {profileDropdown && (
                  <div className="nav-profile-dropdown">
                    {isUserLoggedIn() ? (
                      <>
                        <div className="nav-profile-header">
                          <div className="user-avatar">
                            {getUserInitial()}
                          </div>
                          <div className="user-info">
                            <h4 className="user-name">{getUserName()}</h4>
                            <p className="user-email">{getUserEmail()}</p>
                            <div className="user-tier">
                              <span className="tier-badge">💎 DIAMOND MEMBER</span>
                              <span className="tier-points">2,500 Points</span>
                            </div>
                          </div>
                        </div>
                        <div className="nav-profile-stats">
                          <div className="nav-stat-item">
                            <span className="nav-stat-value">12</span>
                            <span className="nav-stat-label">Orders</span>
                          </div>
                          <div className="nav-stat-item">
                            <span className="nav-stat-value">₹1.2L</span>
                            <span className="nav-stat-label">Spent</span>
                          </div>
                          <div className="nav-stat-item">
                            <span className="nav-stat-value">{wishlistCount}</span>
                            <span className="nav-stat-label">Wishlist</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="nav-profile-header guest">
                        <h4>Welcome to Rika Jewels</h4>
                        <p>Sign in for better experience</p>
                        <button
                          className="signin-btn"
                          onClick={() => {
                            navigate("/login");
                            setProfileDropdown(false);
                          }}
                        >
                          Sign In / Register
                        </button>
                      </div>
                    )}

                    <div className="dropdown-menu">
                      {userMenuItems.map((item, index) => (
                        <button
                          key={index}
                          className={`dropdown-item ${item.className || ''}`}
                          onClick={() => {
                            item.onClick();
                            setProfileDropdown(false);
                          }}
                        >
                          <span className="item-icon">{item.icon}</span>
                          <span className="item-label">{item.label}</span>
                          {item.badge && <span className="item-badge">{item.badge}</span>}
                        </button>
                      ))}
                    </div>

                    <div className="dropdown-footer">
                      <div className="support-section">
                        <div className="support-item">
                          <span className="support-icon">📞</span>
                          <div>
                            <p className="support-title">24/7 Support</p>
                            <p className="support-number">1800-123-4567</p>
                          </div>
                        </div>
                        <button className="help-btn">Need Help?</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* WISHLIST */}
              {<button
                className="nav-action-btn wishlist-btn"
                onClick={() => navigate("/wishlist")}
                title="My Wishlist"
              >
                <span className="nav-action-icon">❤️</span>
                <span className="nav-action-label">Wishlist</span>
                {wishlistCount > 0 && (
                  <span className="nav-action-badge wishlist-badge">{wishlistCount}</span>
                )}
              </button>}
            </div>

            {/* MOBILE MENU TOGGLE */}
            <button
              className="mobile-toggle"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              {mobileMenu ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* CATEGORY NAVBAR */}
        <div className="category-nav">
          <div className="category-container">
            {navCategories.map((category) => (
              <div
                key={category.id}
                className={`category-item ${activeCategory === category.id ? 'active' : ''}`}
                onMouseEnter={(e) => {
                  if (category.submenu.length > 0) {
                    e.currentTarget.classList.add('hover');
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.classList.remove('hover');
                }}
              >
                <button
                  className="category-btn"
                  onClick={category.onClick}
                >
                  <span className="category-icon">{category.icon}</span>
                  <span className="category-label">{category.label}</span>
                  {category.submenu.length > 0 && (
                    <span className="category-arrow">▼</span>
                  )}
                </button>

                {category.submenu.length > 0 && (
                  <div className="category-submenu">
                    <div className="submenu-container">
                      {category.submenu.map((subItem, index) => (
                        <button
                          key={index}
                          className="submenu-item"
                          onClick={() => navigate(subItem.path)}
                        >
                          {subItem.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* SPECIAL OFFER BADGE */}
          <div className="special-offer">
            <span className="offer-badge"></span>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY - SAFE VERSION */}
      {mobileMenu && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu-container">
            <div className="mobile-menu-header">
              <div className="mobile-user-info">
                {user ? (
                  <>
                    <div className="mobile-user-avatar">
                      {getUserInitial()}
                    </div>
                    <div>
                      <h4>{getUserName()}</h4>
                      <p>{getUserEmail()}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mobile-user-avatar">👤</div>
                    <div>
                      <h4>Welcome Guest</h4>
                      <p>Sign in for better experience</p>
                    </div>
                  </>
                )}
              </div>
              <button
                className="mobile-close"
                onClick={() => setMobileMenu(false)}
              >
                ✕
              </button>
            </div>

            <div className="mobile-search-box">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search jewellery..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit">🔍</button>
              </form>
            </div>

            <div className="mobile-nav">
              {navCategories.map((category) => (
                <div key={category.id} className="mobile-nav-category">
                  <button
                    className="mobile-nav-btn"
                    onClick={() => {
                      category.onClick();
                      setMobileMenu(false);
                    }}
                  >
                    <span className="mobile-nav-icon">{category.icon}</span>
                    {category.label}
                    {category.submenu.length > 0 && <span className="mobile-arrow">›</span>}
                  </button>

                  {category.submenu.length > 0 && (
                    <div className="mobile-submenu">
                      {category.submenu.map((subItem, index) => (
                        <button
                          key={index}
                          className="mobile-submenu-item"
                          onClick={() => {
                            navigate(subItem.path);
                            setMobileMenu(false);
                          }}
                        >
                          {subItem.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Action Buttons */}
            <div className="mobile-actions-grid">
              <button className="mobile-action-item" onClick={() => navigate("/stores")}>
                <span className="mobile-action-icon">📍</span>
                <span className="mobile-action-text">Store</span>
              </button>
              <button
                className="mobile-action-item"
                onClick={() => {
                  navigate("/cart");
                  setMobileMenu(false);
                }}
              >
                <span className="mobile-action-icon">🛒</span>
                <span className="mobile-action-text">Cart</span>
                {cart && cart.length > 0 && <span className="mobile-action-badge">{cart.length}</span>}
              </button>
              <button
                className="mobile-action-item"
                onClick={() => {
                  if (user) {
                    navigate("/profile");
                  } else {
                    navigate("/login");
                  }
                  setMobileMenu(false);
                }}
              >
                <span className="mobile-action-icon">👤</span>
                <span className="mobile-action-text">Account</span>
              </button>
              <button
                className="mobile-action-item"
                onClick={() => {
                  navigate("/wishlist");
                  setMobileMenu(false);
                }}
              >
                <span className="mobile-action-icon">❤️</span>
                <span className="mobile-action-text">Wishlist</span>
                {wishlistCount > 0 && <span className="mobile-action-badge">{wishlistCount}</span>}
              </button>
            </div>

            <div className="mobile-footer">
              {user ? (
                <button className="mobile-logout" onClick={logout}>
                  🚪 Logout
                </button>
              ) : (
                <button
                  className="mobile-signin"
                  onClick={() => {
                    navigate("/login");
                    setMobileMenu(false);
                  }}
                >
                  🔐 Sign In / Register
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;