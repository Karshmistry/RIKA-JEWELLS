// import React, { useContext } from "react";
// import "./Cart.css";
// import { CartContext } from "../context/CartContext";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// function Cart() {
//   const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   // Calculate totals
//   const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
//   const deliveryCharge = subtotal > 10000 ? 0 : 199;
//   const tax = subtotal * 0.03; // 3% tax
//   const total = subtotal + deliveryCharge + tax;

//   const handleQuantityChange = (index, newQuantity) => {
//     if (newQuantity < 1) {
//       removeFromCart(index);
//       return;
//     }
//     updateQuantity(index, newQuantity);
//   };

//   const handleRemove = (index) => {
//     if (window.confirm("Remove this item from cart?")) {
//       removeFromCart(index);
//     }
//   };

//   const handleCheckout = () => {
//     if (!user) {
//       if (window.confirm("You need to login to checkout. Go to login page?")) {
//         navigate("/login");
//       }
//       return;
//     }
//     navigate("/checkout");
//   };

//   if (cart.length === 0) {
//     return (
//       <div className="cart-empty-page">
//         <div className="empty-cart-icon">🛒</div>
//         <h2>Your Cart is Empty</h2>
//         <p>Looks like you haven't added any items to your cart yet.</p>
//         <button 
//           className="continue-shopping-btn"
//           onClick={() => navigate("/")}
//         >
//           Continue Shopping
//         </button>
        
//         <div className="cart-suggestions">
//           <h3>You Might Like:</h3>
//           <div className="suggestion-cards">
//             <div className="suggestion-card" onClick={() => navigate("/gold")}>
//               <div className="suggestion-icon">💰</div>
//               <h4>Gold Jewellery</h4>
//               <p>Starting from ₹25,000</p>
//             </div>
//             <div className="suggestion-card" onClick={() => navigate("/gift")}>
//               <div className="suggestion-icon">🎁</div>
//               <h4>Gift Collection</h4>
//               <p>Perfect for special occasions</p>
//             </div>
//             <div className="suggestion-card" onClick={() => navigate("/collections/rings")}>
//               <div className="suggestion-icon">💍</div>
//               <h4>Rings</h4>
//               <p>Elegant designs</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="cart-page">
//       <div className="cart-header">
//         <h1>Your Shopping Cart</h1>
//         <p>{cart.length} {cart.length === 1 ? 'item' : 'items'} in cart</p>
//       </div>

//       <div className="cart-container">
//         {/* Cart Items */}
//         <div className="cart-items-section">
//           <div className="cart-items-header">
//             <h2>Cart Items</h2>
//             <button 
//               className="clear-cart-btn"
//               onClick={() => {
//                 if (window.confirm("Clear all items from cart?")) {
//                   clearCart();
//                 }
//               }}
//             >
//               Clear Cart
//             </button>
//           </div>

//           <div className="cart-items-list">
//             {cart.map((item, index) => (
//               <div className="cart-item" key={`${item.id}-${index}`}>
//                 <div className="item-image">
//                   <img 
//                     src={item.image || "https://images.unsplash.com/photo-1605100804763-247f67b3557e"} 
//                     alt={item.name} 
//                   />
//                 </div>
                
//                 <div className="item-details">
//                   <h3 className="item-name">{item.name}</h3>
//                   {item.description && (
//                     <p className="item-description">{item.description}</p>
//                   )}
                  
//                   <div className="item-specs">
//                     {item.material && (
//                       <span className="spec">Material: {item.material}</span>
//                     )}
//                     {item.weight && (
//                       <span className="spec">Weight: {item.weight}</span>
//                     )}
//                     {item.purity && (
//                       <span className="spec">Purity: {item.purity}</span>
//                     )}
//                   </div>
                  
//                   <div className="item-price">
//                     <span className="current-price">₹{(item.price * (item.quantity || 1)).toLocaleString()}</span>
//                     {item.originalPrice && item.originalPrice > item.price && (
//                       <span className="original-price">₹{item.originalPrice.toLocaleString()}</span>
//                     )}
//                   </div>
//                 </div>
                
//                 <div className="item-actions">
//                   <div className="quantity-controls">
//                     <button 
//                       className="quantity-btn"
//                       onClick={() => handleQuantityChange(index, (item.quantity || 1) - 1)}
//                     >
//                       −
//                     </button>
//                     <span className="quantity-value">{item.quantity || 1}</span>
//                     <button 
//                       className="quantity-btn"
//                       onClick={() => handleQuantityChange(index, (item.quantity || 1) + 1)}
//                     >
//                       +
//                     </button>
//                   </div>
                  
//                   <button 
//                     className="remove-btn"
//                     onClick={() => handleRemove(index)}
//                   >
//                     Remove
//                   </button>
                  
//                   <button 
//                     className="save-later-btn"
//                     onClick={() => {
//                       // Add to wishlist functionality
//                       alert(`${item.name} saved for later!`);
//                     }}
//                   >
//                     Save for Later
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="cart-continue-shopping">
//             <button 
//               className="continue-shopping-btn"
//               onClick={() => navigate("/")}
//             >
//               ← Continue Shopping
//             </button>
//           </div>
//         </div>

//         {/* Order Summary */}
//         <div className="order-summary-section">
//           <div className="order-summary">
//             <h2>Order Summary</h2>
            
//             <div className="summary-details">
//               <div className="summary-row">
//                 <span>Subtotal ({cart.length} items)</span>
//                 <span>₹{subtotal.toLocaleString()}</span>
//               </div>
              
//               <div className="summary-row">
//                 <span>Delivery Charges</span>
//                 <span className={deliveryCharge === 0 ? "free-delivery" : ""}>
//                   {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
//                 </span>
//               </div>
              
//               <div className="summary-row">
//                 <span>Tax (3%)</span>
//                 <span>₹{tax.toLocaleString()}</span>
//               </div>
              
//               <div className="summary-row total-row">
//                 <span>Total Amount</span>
//                 <span className="total-amount">₹{total.toLocaleString()}</span>
//               </div>
//             </div>

//             <div className="delivery-info">
//               <div className="delivery-icon">🚚</div>
//               <div>
//                 <p className="delivery-title">Free Delivery</p>
//                 <p className="delivery-text">On orders above ₹10,000</p>
//                 <p className="delivery-estimate">Estimated delivery: 3-5 business days</p>
//               </div>
//             </div>

//             <div className="secure-payment">
//               <div className="secure-icon">🔒</div>
//               <p>100% Secure Payment | SSL Encrypted</p>
//             </div>

//             <button 
//               className="checkout-btn"
//               onClick={handleCheckout}
//             >
//               Proceed to Checkout
//             </button>

//             {!user && (
//               <div className="login-prompt">
//                 <p>Have an account? <button onClick={() => navigate("/login")}>Login</button> for faster checkout</p>
//               </div>
//             )}

//             <div className="payment-options">
//               <p className="payment-title">We Accept:</p>
//               <div className="payment-icons">
//                 <span className="payment-icon">💳</span>
//                 <span className="payment-icon">📱</span>
//                 <span className="payment-icon">🏦</span>
//                 <span className="payment-icon">💰</span>
//               </div>
//             </div>
//           </div>

//           <div className="cart-benefits">
//             <h3>Benefits of Shopping with Us</h3>
//             <ul>
//               <li>✅ Free shipping on orders above ₹10,000</li>
//               <li>✅ 30-day return policy</li>
//               <li>✅ BIS Hallmarked jewellery</li>
//               <li>✅ EMI options available</li>
//               <li>✅ Lifetime exchange policy</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Cart;



// import React, { useContext } from "react";
// import "./Cart.css";
// import { CartContext } from "../context/CartContext";
// import { useAuth } from "../context/AuthContext"; // FIXED: Changed import
// import { useNavigate } from "react-router-dom";

// function Cart() {
//   const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
//   const { user } = useAuth(); // FIXED: Using custom hook
//   const navigate = useNavigate();

//   // Calculate totals
//   const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
//   const deliveryCharge = subtotal > 10000 ? 0 : 199;
//   const tax = subtotal * 0.03; // 3% tax
//   const total = subtotal + deliveryCharge + tax;

//   const handleQuantityChange = (index, newQuantity) => {
//     if (newQuantity < 1) {
//       removeFromCart(index);
//       return;
//     }
//     updateQuantity(index, newQuantity);
//   };

//   const handleRemove = (index) => {
//     if (window.confirm("Remove this item from cart?")) {
//       removeFromCart(index);
//     }
//   };

//   const handleCheckout = () => {
//     if (!user) {
//       if (window.confirm("You need to login to checkout. Go to login page?")) {
//         navigate("/login");
//       }
//       return;
//     }
//     navigate("/checkout");
//   };

//   if (cart.length === 0) {
//     return (
//       <div className="cart-empty-page">
//         <div className="empty-cart-icon">🛒</div>
//         <h2>Your Cart is Empty</h2>
//         <p>Looks like you haven't added any items to your cart yet.</p>
//         <button 
//           className="continue-shopping-btn"
//           onClick={() => navigate("/")}
//         >
//           Continue Shopping
//         </button>
        
//         <div className="cart-suggestions">
//           <h3>You Might Like:</h3>
//           <div className="suggestion-cards">
//             <div className="suggestion-card" onClick={() => navigate("/gold")}>
//               <div className="suggestion-icon">💰</div>
//               <h4>Gold Jewellery</h4>
//               <p>Starting from ₹25,000</p>
//             </div>
//             <div className="suggestion-card" onClick={() => navigate("/gift")}>
//               <div className="suggestion-icon">🎁</div>
//               <h4>Gift Collection</h4>
//               <p>Perfect for special occasions</p>
//             </div>
//             <div className="suggestion-card" onClick={() => navigate("/collections/rings")}>
//               <div className="suggestion-icon">💍</div>
//               <h4>Rings</h4>
//               <p>Elegant designs</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="cart-page">
//       <div className="cart-header">
//         <h1>Your Shopping Cart</h1>
//         <p>{cart.length} {cart.length === 1 ? 'item' : 'items'} in cart</p>
//       </div>

//       <div className="cart-container">
//         {/* Cart Items */}
//         <div className="cart-items-section">
//           <div className="cart-items-header">
//             <h2>Cart Items</h2>
//             <button 
//               className="clear-cart-btn"
//               onClick={() => {
//                 if (window.confirm("Clear all items from cart?")) {
//                   clearCart();
//                 }
//               }}
//             >
//               Clear Cart
//             </button>
//           </div>

//           <div className="cart-items-list">
//             {cart.map((item, index) => (
//               <div className="cart-item" key={`${item.id}-${index}`}>
//                 <div className="item-image">
//                   <img 
//                     src={item.image || "https://images.unsplash.com/photo-1605100804763-247f67b3557e"} 
//                     alt={item.name} 
//                   />
//                 </div>
                
//                 <div className="item-details">
//                   <h3 className="item-name">{item.name}</h3>
//                   {item.description && (
//                     <p className="item-description">{item.description}</p>
//                   )}
                  
//                   <div className="item-specs">
//                     {item.material && (
//                       <span className="spec">Material: {item.material}</span>
//                     )}
//                     {item.weight && (
//                       <span className="spec">Weight: {item.weight}</span>
//                     )}
//                     {item.purity && (
//                       <span className="spec">Purity: {item.purity}</span>
//                     )}
//                   </div>
                  
//                   <div className="item-price">
//                     <span className="current-price">₹{(item.price * (item.quantity || 1)).toLocaleString()}</span>
//                     {item.originalPrice && item.originalPrice > item.price && (
//                       <span className="original-price">₹{item.originalPrice.toLocaleString()}</span>
//                     )}
//                   </div>
//                 </div>
                
//                 <div className="item-actions">
//                   <div className="quantity-controls">
//                     <button 
//                       className="quantity-btn"
//                       onClick={() => handleQuantityChange(index, (item.quantity || 1) - 1)}
//                     >
//                       −
//                     </button>
//                     <span className="quantity-value">{item.quantity || 1}</span>
//                     <button 
//                       className="quantity-btn"
//                       onClick={() => handleQuantityChange(index, (item.quantity || 1) + 1)}
//                     >
//                       +
//                     </button>
//                   </div>
                  
//                   <button 
//                     className="remove-btn"
//                     onClick={() => handleRemove(index)}
//                   >
//                     Remove
//                   </button>
                  
//                   <button 
//                     className="save-later-btn"
//                     onClick={() => {
//                       // Add to wishlist functionality
//                       alert(`${item.name} saved for later!`);
//                     }}
//                   >
//                     Save for Later
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="cart-continue-shopping">
//             <button 
//               className="continue-shopping-btn"
//               onClick={() => navigate("/")}
//             >
//               ← Continue Shopping
//             </button>
//           </div>
//         </div>

//         {/* Order Summary */}
//         <div className="order-summary-section">
//           <div className="order-summary">
//             <h2>Order Summary</h2>
            
//             <div className="summary-details">
//               <div className="summary-row">
//                 <span>Subtotal ({cart.length} items)</span>
//                 <span>₹{subtotal.toLocaleString()}</span>
//               </div>
              
//               <div className="summary-row">
//                 <span>Delivery Charges</span>
//                 <span className={deliveryCharge === 0 ? "free-delivery" : ""}>
//                   {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
//                 </span>
//               </div>
              
//               <div className="summary-row">
//                 <span>Tax (3%)</span>
//                 <span>₹{tax.toLocaleString()}</span>
//               </div>
              
//               <div className="summary-row total-row">
//                 <span>Total Amount</span>
//                 <span className="total-amount">₹{total.toLocaleString()}</span>
//               </div>
//             </div>

//             <div className="delivery-info">
//               <div className="delivery-icon">🚚</div>
//               <div>
//                 <p className="delivery-title">Free Delivery</p>
//                 <p className="delivery-text">On orders above ₹10,000</p>
//                 <p className="delivery-estimate">Estimated delivery: 3-5 business days</p>
//               </div>
//             </div>

//             <div className="secure-payment">
//               <div className="secure-icon">🔒</div>
//               <p>100% Secure Payment | SSL Encrypted</p>
//             </div>

//             <button 
//               className="checkout-btn"
//               onClick={handleCheckout}
//             >
//               Proceed to Checkout
//             </button>

//             {!user && (
//               <div className="login-prompt">
//                 <p>Have an account? <button onClick={() => navigate("/login")}>Login</button> for faster checkout</p>
//               </div>
//             )}

//             <div className="payment-options">
//               <p className="payment-title">We Accept:</p>
//               <div className="payment-icons">
//                 <span className="payment-icon">💳</span>
//                 <span className="payment-icon">📱</span>
//                 <span className="payment-icon">🏦</span>
//                 <span className="payment-icon">💰</span>
//               </div>
//             </div>
//           </div>

//           <div className="cart-benefits">
//             <h3>Benefits of Shopping with Us</h3>
//             <ul>
//               <li>✅ Free shipping on orders above ₹10,000</li>
//               <li>✅ 30-day return policy</li>
//               <li>✅ BIS Hallmarked jewellery</li>
//               <li>✅ EMI options available</li>
//               <li>✅ Lifetime exchange policy</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Cart;

import React, { useContext, useState } from "react";
import "./Cart.css";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [savingItem, setSavingItem] = useState(null);

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const deliveryCharge = subtotal > 10000 ? 0 : 199;
  const tax = subtotal * 0.03;
  const total = subtotal + deliveryCharge + tax;

  const handleQuantityChange = (index, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(index);
      return;
    }
    updateQuantity(index, newQuantity);
  };

  const handleRemove = (index) => {
    removeFromCart(index);
  };

  const handleSaveForLater = async (item, index) => {
    setSavingItem(index);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    alert(`${item.name} saved for later!`);
    setSavingItem(null);
  };

  const handleCheckout = () => {
    if (!user) {
      if (window.confirm("You need to login to checkout. Go to login page?")) {
        navigate("/login");
      }
      return;
    }
    navigate("/checkout");
  };

  if (cart.length === 0) {
    return (
      <div className="cart-empty-page">
        <div className="empty-cart-container">
          <div className="empty-cart-icon">
            🛒
          </div>
          <h2>Your Cart is Empty</h2>
          <p className="empty-cart-message">
            Looks like you haven't added any items to your cart yet.
          </p>
          <button 
            className="continue-shopping-btn primary-btn"
            onClick={() => navigate("/")}
          >
            ← Start Shopping
          </button>
          
          <div className="cart-suggestions">
            <h3>You Might Like:</h3>
            <div className="suggestion-cards">
              <div className="suggestion-card" onClick={() => navigate("/gold")}>
                <div className="suggestion-icon">💰</div>
                <div className="suggestion-content">
                  <h4>Gold Jewellery</h4>
                  <p>Starting from ₹25,000</p>
                  <span className="suggestion-cta">Shop Now →</span>
                </div>
              </div>
              <div className="suggestion-card" onClick={() => navigate("/gift")}>
                <div className="suggestion-icon">🎁</div>
                <div className="suggestion-content">
                  <h4>Gift Collection</h4>
                  <p>Perfect for special occasions</p>
                  <span className="suggestion-cta">Shop Now →</span>
                </div>
              </div>
              <div className="suggestion-card" onClick={() => navigate("/collections/rings")}>
                <div className="suggestion-icon">💍</div>
                <div className="suggestion-content">
                  <h4>Rings</h4>
                  <p>Elegant designs</p>
                  <span className="suggestion-cta">Shop Now →</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <div className="header-content">
            <h1>Your Shopping Cart</h1>
            <p className="cart-count">{cart.length} {cart.length === 1 ? 'item' : 'items'}</p>
          </div>
          <button 
            className="clear-cart-btn secondary-btn"
            onClick={() => {
              if (window.confirm("Clear all items from cart?")) {
                clearCart();
              }
            }}
          >
            🗑️ Clear Cart
          </button>
        </div>

        <div className="cart-content">
          {/* Cart Items Section */}
          <div className="cart-items-section">
            <div className="cart-items-header">
              <h2>Cart Items</h2>
              <div className="cart-subtotal-mobile">
                <span>Subtotal:</span>
                <span className="price">₹{subtotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="cart-items-list">
              {cart.map((item, index) => (
                <div className="cart-item" key={`${item.id}-${index}`}>
                  <div className="item-image-container">
                    <img 
                      src={item.image || "https://images.unsplash.com/photo-1605100804763-247f67b3557e"} 
                      alt={item.name}
                      className="item-image"
                      onClick={() => navigate(`/product/${item.id}`)}
                    />
                    {item.discount && (
                      <span className="discount-badge">-{item.discount}%</span>
                    )}
                  </div>
                  
                  <div className="item-content">
                    <div className="item-header">
                      <div>
                        <h3 className="item-name">{item.name}</h3>
                        {item.description && (
                          <p className="item-description">{item.description}</p>
                        )}
                      </div>
                      <button 
                        className="remove-item-btn"
                        onClick={() => handleRemove(index)}
                      >
                        ✕
                      </button>
                    </div>
                    
                    <div className="item-specs">
                      {item.material && (
                        <span className="spec-badge">{item.material}</span>
                      )}
                      {item.weight && (
                        <span className="spec-badge">{item.weight}g</span>
                      )}
                      {item.purity && (
                        <span className="spec-badge">{item.purity}</span>
                      )}
                    </div>
                    
                    <div className="item-footer">
                      <div className="item-pricing">
                        <div className="price-section">
                          <span className="current-price">₹{(item.price * (item.quantity || 1)).toLocaleString()}</span>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <span className="original-price">₹{item.originalPrice.toLocaleString()}</span>
                          )}
                        </div>
                        <p className="unit-price">₹{item.price.toLocaleString()} per item</p>
                      </div>
                      
                      <div className="item-actions">
                        <div className="quantity-controls">
                          <button 
                            className="quantity-btn"
                            onClick={() => handleQuantityChange(index, (item.quantity || 1) - 1)}
                            disabled={(item.quantity || 1) <= 1}
                          >
                            −
                          </button>
                          <span className="quantity-value">{item.quantity || 1}</span>
                          <button 
                            className="quantity-btn"
                            onClick={() => handleQuantityChange(index, (item.quantity || 1) + 1)}
                          >
                            +
                          </button>
                        </div>
                        
                        <div className="action-buttons">
                          <button 
                            className="save-later-btn"
                            onClick={() => handleSaveForLater(item, index)}
                            disabled={savingItem === index}
                          >
                            {savingItem === index ? '⏳ Saving...' : '❤️ Save for Later'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-actions">
              <button 
                className="continue-shopping-btn secondary-btn"
                onClick={() => navigate("/")}
              >
                ← Continue Shopping
              </button>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="order-summary-section">
            <div className="order-summary-card">
              <h2>Order Summary</h2>
              
              <div className="summary-details">
                <div className="summary-row">
                  <span>Subtotal ({cart.length} items)</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                
                <div className="summary-row">
                  <span>Delivery Charges</span>
                  <span className={`delivery-charge ${deliveryCharge === 0 ? "free" : ""}`}>
                    {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
                  </span>
                </div>
                
                <div className="summary-row">
                  <span>Tax (3%)</span>
                  <span>₹{tax.toLocaleString()}</span>
                </div>
                
                <div className="summary-divider"></div>
                
                <div className="summary-row total-row">
                  <span>Total Amount</span>
                  <span className="total-amount">₹{total.toLocaleString()}</span>
                </div>
              </div>

              <button 
                className="checkout-btn primary-btn"
                onClick={handleCheckout}
              >
                Proceed to Checkout 💳
              </button>

              {!user && (
                <div className="login-prompt">
                  <p>
                    Have an account? 
                    <button 
                      className="login-link"
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </button>
                    for faster checkout
                  </p>
                </div>
              )}

              <div className="delivery-info-card">
                <div className="delivery-header">
                  🚚
                  <h4>Delivery Information</h4>
                </div>
                <div className="delivery-details">
                  <div className="delivery-item">
                    <span className="delivery-label">Free Delivery</span>
                    <span className="delivery-value">On orders above ₹10,000</span>
                  </div>
                  <div className="delivery-item">
                    <span className="delivery-label">Estimated Delivery</span>
                    <span className="delivery-value">3-5 business days</span>
                  </div>
                  <div className="delivery-item">
                    <span className="delivery-label">Express Delivery</span>
                    <span className="delivery-value">Available for ₹299</span>
                  </div>
                </div>
              </div>

              <div className="security-info">
                <div className="security-header">
                  🔒
                  <h4>Secure Shopping</h4>
                </div>
                <p className="security-text">
                  100% Secure Payment | SSL Encrypted | BIS Hallmarked Jewellery
                </p>
              </div>

              <div className="payment-options">
                <h4>We Accept:</h4>
                <div className="payment-icons">
                  <div className="payment-icon">💳</div>
                  <div className="payment-icon">📱</div>
                  <div className="payment-icon">🏦</div>
                  <div className="payment-icon">💰</div>
                </div>
              </div>
            </div>

            <div className="cart-benefits-card">
              <h3>🛡️ Shopping Benefits</h3>
              <ul className="benefits-list">
                <li>
                  <div className="benefit-icon">✓</div>
                  <span>Free shipping on orders above ₹10,000</span>
                </li>
                <li>
                  <div className="benefit-icon">✓</div>
                  <span>30-day hassle-free return policy</span>
                </li>
                <li>
                  <div className="benefit-icon">✓</div>
                  <span>BIS Hallmarked jewellery</span>
                </li>
                <li>
                  <div className="benefit-icon">✓</div>
                  <span>EMI options available</span>
                </li>
                <li>
                  <div className="benefit-icon">✓</div>
                  <span>Lifetime exchange policy</span>
                </li>
                <li>
                  <div className="benefit-icon">✓</div>
                  <span>Free jewellery cleaning for 1 year</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;