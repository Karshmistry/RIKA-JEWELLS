// // // Checkout.js - COMPLETE VERSION
// // import React, { useContext, useState } from "react";
// // import { CartContext } from "../context/CartContext";
// // import { useNavigate } from "react-router-dom";
// // import "./Checkout.css";

// // function Checkout() {
// //   const { cart, clearCart } = useContext(CartContext);
// //   const navigate = useNavigate();

// //   const [formData, setFormData] = useState({
// //     fullName: "",
// //     email: "",
// //     phone: "",
// //     address: "",
// //     city: "",
// //     state: "",
// //     pincode: "",
// //     paymentMethod: "cod",
// //   });

// //   const [errors, setErrors] = useState({});

// //   const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
// //   const deliveryCharge = total > 10000 ? 0 : 199;
// //   const tax = total * 0.03; // 3% tax
// //   const finalTotal = total + deliveryCharge + tax;

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({
// //       ...prev,
// //       [name]: value
// //     }));
// //     // Clear error when user starts typing
// //     if (errors[name]) {
// //       setErrors(prev => ({
// //         ...prev,
// //         [name]: ""
// //       }));
// //     }
// //   };

// //   const validateForm = () => {
// //     const newErrors = {};

// //     if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
// //     if (!formData.email.trim()) newErrors.email = "Email is required";
// //     else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email address";

// //     if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
// //     else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Invalid phone number (10 digits)";

// //     if (!formData.address.trim()) newErrors.address = "Address is required";
// //     if (!formData.city.trim()) newErrors.city = "City is required";
// //     if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";

// //     return newErrors;
// //   };

// //   const placeOrder = () => {
// //     const validationErrors = validateForm();
// //     if (Object.keys(validationErrors).length > 0) {
// //       setErrors(validationErrors);
// //       return;
// //     }

// //     // Create order object
// //     const order = {
// //       orderId: `RIKA${Date.now()}`,
// //       items: [...cart],
// //       total: finalTotal,
// //       customer: { ...formData },
// //       date: new Date().toISOString(),
// //       status: "pending"
// //     };

// //     // Save order to localStorage
// //     const orders = JSON.parse(localStorage.getItem("orders") || "[]");
// //     orders.push(order);
// //     localStorage.setItem("orders", JSON.stringify(orders));

// //     // Clear cart and show success
// //     clearCart();

// //     // Navigate to success page
// //     navigate("/order-success", { 
// //       state: { 
// //         orderId: order.orderId,
// //         total: finalTotal 
// //       } 
// //     });
// //   };

// //   if (cart.length === 0) {
// //     return (
// //       <div className="empty-checkout">
// //         <div className="empty-icon">🛒</div>
// //         <h2>Your cart is empty</h2>
// //         <p>Add some items to your cart before checkout</p>
// //         <button onClick={() => navigate("/")}>Continue Shopping</button>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="checkout-page">
// //       <div className="checkout-header">
// //         <h1>Checkout</h1>
// //         <div className="checkout-steps">
// //           <div className="step active">1. Delivery</div>
// //           <div className="step">2. Payment</div>
// //           <div className="step">3. Confirmation</div>
// //         </div>
// //       </div>

// //       <div className="checkout-container">
// //         {/* LEFT: ADDRESS & PAYMENT */}
// //         <div className="checkout-left">
// //           {/* Delivery Address */}
// //           <div className="checkout-form-section">
// //             <h2><span className="section-icon">📍</span> Delivery Address</h2>

// //             <div className="form-grid">
// //               <div className="form-group">
// //                 <label>Full Name *</label>
// //                 <input
// //                   type="text"
// //                   name="fullName"
// //                   value={formData.fullName}
// //                   onChange={handleChange}
// //                   placeholder="Enter your full name"
// //                   className={errors.fullName ? "error" : ""}
// //                 />
// //                 {errors.fullName && <span className="error-message">{errors.fullName}</span>}
// //               </div>

// //               <div className="form-group">
// //                 <label>Email Address *</label>
// //                 <input
// //                   type="email"
// //                   name="email"
// //                   value={formData.email}
// //                   onChange={handleChange}
// //                   placeholder="Enter your email"
// //                   className={errors.email ? "error" : ""}
// //                 />
// //                 {errors.email && <span className="error-message">{errors.email}</span>}
// //               </div>

// //               <div className="form-group">
// //                 <label>Phone Number *</label>
// //                 <input
// //                   type="tel"
// //                   name="phone"
// //                   value={formData.phone}
// //                   onChange={handleChange}
// //                   placeholder="Enter 10-digit number"
// //                   maxLength="10"
// //                   className={errors.phone ? "error" : ""}
// //                 />
// //                 {errors.phone && <span className="error-message">{errors.phone}</span>}
// //               </div>

// //               <div className="form-group full-width">
// //                 <label>Full Address *</label>
// //                 <textarea
// //                   name="address"
// //                   value={formData.address}
// //                   onChange={handleChange}
// //                   placeholder="House no., Building, Street, Area"
// //                   rows="3"
// //                   className={errors.address ? "error" : ""}
// //                 />
// //                 {errors.address && <span className="error-message">{errors.address}</span>}
// //               </div>

// //               <div className="form-group">
// //                 <label>City *</label>
// //                 <input
// //                   type="text"
// //                   name="city"
// //                   value={formData.city}
// //                   onChange={handleChange}
// //                   placeholder="Enter city"
// //                   className={errors.city ? "error" : ""}
// //                 />
// //                 {errors.city && <span className="error-message">{errors.city}</span>}
// //               </div>

// //               <div className="form-group">
// //                 <label>State</label>
// //                 <input
// //                   type="text"
// //                   name="state"
// //                   value={formData.state}
// //                   onChange={handleChange}
// //                   placeholder="Enter state"
// //                 />
// //               </div>

// //               <div className="form-group">
// //                 <label>Pincode *</label>
// //                 <input
// //                   type="text"
// //                   name="pincode"
// //                   value={formData.pincode}
// //                   onChange={handleChange}
// //                   placeholder="6-digit pincode"
// //                   maxLength="6"
// //                   className={errors.pincode ? "error" : ""}
// //                 />
// //                 {errors.pincode && <span className="error-message">{errors.pincode}</span>}
// //               </div>
// //             </div>
// //           </div>

// //           {/* Payment Method */}
// //           <div className="checkout-form-section">
// //             <h2><span className="section-icon">💳</span> Payment Method</h2>

// //             <div className="payment-options">
// //               <label className="payment-option">
// //                 <input
// //                   type="radio"
// //                   name="paymentMethod"
// //                   value="cod"
// //                   checked={formData.paymentMethod === "cod"}
// //                   onChange={handleChange}
// //                 />
// //                 <div className="payment-content">
// //                   <span className="payment-icon">💰</span>
// //                   <div>
// //                     <h3>Cash on Delivery</h3>
// //                     <p>Pay when you receive your order</p>
// //                   </div>
// //                 </div>
// //               </label>

// //               <label className="payment-option">
// //                 <input
// //                   type="radio"
// //                   name="paymentMethod"
// //                   value="card"
// //                   checked={formData.paymentMethod === "card"}
// //                   onChange={handleChange}
// //                 />
// //                 <div className="payment-content">
// //                   <span className="payment-icon">💳</span>
// //                   <div>
// //                     <h3>Credit/Debit Card</h3>
// //                     <p>Pay securely with your card</p>
// //                   </div>
// //                 </div>
// //               </label>

// //               <label className="payment-option">
// //                 <input
// //                   type="radio"
// //                   name="paymentMethod"
// //                   value="upi"
// //                   checked={formData.paymentMethod === "upi"}
// //                   onChange={handleChange}
// //                 />
// //                 <div className="payment-content">
// //                   <span className="payment-icon">📱</span>
// //                   <div>
// //                     <h3>UPI Payment</h3>
// //                     <p>Pay using UPI apps</p>
// //                   </div>
// //                 </div>
// //               </label>

// //               <label className="payment-option">
// //                 <input
// //                   type="radio"
// //                   name="paymentMethod"
// //                   value="netbanking"
// //                   checked={formData.paymentMethod === "netbanking"}
// //                   onChange={handleChange}
// //                 />
// //                 <div className="payment-content">
// //                   <span className="payment-icon">🏦</span>
// //                   <div>
// //                     <h3>Net Banking</h3>
// //                     <p>Pay using your bank account</p>
// //                   </div>
// //                 </div>
// //               </label>
// //             </div>
// //           </div>
// //         </div>

// //         {/* RIGHT: ORDER SUMMARY */}
// //         <div className="checkout-right">
// //           <div className="order-summary">
// //             <h2><span className="section-icon">📦</span> Order Summary</h2>

// //             <div className="order-items">
// //               {cart.map((item, index) => (
// //                 <div key={index} className="order-item">
// //                   <div className="item-info">
// //                     <h4>{item.name}</h4>
// //                     <p>Quantity: {item.quantity || 1}</p>
// //                   </div>
// //                   <div className="item-price">
// //                     ₹{(item.price * (item.quantity || 1)).toLocaleString()}
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>

// //             <div className="price-breakdown">
// //               <div className="price-row">
// //                 <span>Subtotal</span>
// //                 <span>₹{total.toLocaleString()}</span>
// //               </div>
// //               <div className="price-row">
// //                 <span>Delivery Charge</span>
// //                 <span className={deliveryCharge === 0 ? "free" : ""}>
// //                   {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
// //                 </span>
// //               </div>
// //               <div className="price-row">
// //                 <span>Tax (3%)</span>
// //                 <span>₹{tax.toLocaleString()}</span>
// //               </div>
// //               <div className="price-row total">
// //                 <span>Total Amount</span>
// //                 <span>₹{finalTotal.toLocaleString()}</span>
// //               </div>
// //             </div>

// //             <div className="order-note">
// //               <p>💡 <strong>Free delivery</strong> on orders above ₹10,000</p>
// //               <p>🔒 Your payment information is secure and encrypted</p>
// //             </div>

// //             <button className="place-order-btn" onClick={placeOrder}>
// //               Place Order - ₹{finalTotal.toLocaleString()}
// //             </button>

// //             <div className="security-badge">
// //               <span>🔒</span>
// //               <p>100% Secure Payment | SSL Encrypted</p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Checkout;

// import React, { useContext, useState, useEffect } from "react";
// import { CartContext } from "../context/CartContext";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import "./Checkout.css";

// function Checkout() {
//   const { cart, clearCart, updateQuantity, removeFromCart } = useContext(CartContext);
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//     state: "Gujarat",
//     pincode: "",
//     paymentMethod: "cod",
//     saveAddress: true,
//     giftWrap: false,
//     giftMessage: "",
//     deliveryDate: "",
//     deliverySlot: "morning"
//   });

//   const [errors, setErrors] = useState({});
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [couponCode, setCouponCode] = useState("");
//   const [couponApplied, setCouponApplied] = useState(false);
//   const [couponError, setCouponError] = useState("");

//   // Delivery slots
//   const deliverySlots = [
//     { id: "morning", time: "9 AM - 12 PM", icon: "🌅" },
//     { id: "afternoon", time: "12 PM - 4 PM", icon: "☀️" },
//     { id: "evening", time: "4 PM - 8 PM", icon: "🌆" }
//   ];

//   // Available coupons
//   const availableCoupons = [
//     { code: "RIKA10", discount: 10, minAmount: 5000 },
//     { code: "RIKA20", discount: 20, minAmount: 15000 },
//     { code: "WELCOME5", discount: 5, minAmount: 3000 }
//   ];

//   // Calculate totals
//   const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
//   const deliveryCharge = subtotal > 10000 ? 0 : 199;
//   const tax = subtotal * 0.03; // 3% tax
//   const giftWrapCharge = formData.giftWrap ? 299 : 0;
//   let discount = 0;

//   // Apply coupon if valid
//   if (couponApplied) {
//     const coupon = availableCoupons.find(c => c.code === couponCode);
//     if (coupon && subtotal >= coupon.minAmount) {
//       discount = (subtotal * coupon.discount) / 100;
//     }
//   }

//   const finalTotal = subtotal + deliveryCharge + tax + giftWrapCharge - discount;

//   // Initialize form with user data if available
//   useEffect(() => {
//     if (user) {
//       const userName = user.name ? user.name.split(' ') : [];
//       setFormData(prev => ({
//         ...prev,
//         fullName: user.name || "",
//         email: user.email || "",
//         phone: user.phone || "",
//         address: user.address?.street || "",
//         city: user.address?.city || "",
//         state: user.address?.state || "Gujarat",
//         pincode: user.address?.zipCode || ""
//       }));
//     }
//   }, [user]);

//   // Validate form
//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
//     if (!formData.email.trim()) newErrors.email = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email address";

//     if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
//     else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Invalid phone number (10 digits)";

//     if (!formData.address.trim()) newErrors.address = "Address is required";
//     if (!formData.city.trim()) newErrors.city = "City is required";
//     if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";
//     else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = "Invalid pincode (6 digits)";

//     return newErrors;
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ""
//       }));
//     }
//   };

//   const handleCouponApply = () => {
//     setCouponError("");
//     const coupon = availableCoupons.find(c => c.code === couponCode);

//     if (!coupon) {
//       setCouponError("Invalid coupon code");
//       return;
//     }

//     if (subtotal < coupon.minAmount) {
//       setCouponError(`Minimum purchase of ₹${coupon.minAmount.toLocaleString()} required`);
//       return;
//     }

//     setCouponApplied(true);
//   };

//   const handleCouponRemove = () => {
//     setCouponApplied(false);
//     setCouponCode("");
//     setCouponError("");
//   };

//   const placeOrder = async () => {
//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     setIsProcessing(true);

//     // Simulate payment processing
//     setTimeout(() => {
//       // Create order object
//       const order = {
//         orderId: `RIKA${Date.now()}`,
//         items: [...cart.map(item => ({
//           ...item,
//           giftWrapped: formData.giftWrap,
//           giftMessage: formData.giftWrap ? formData.giftMessage : ""
//         }))],
//         subtotal: subtotal,
//         deliveryCharge: deliveryCharge,
//         tax: tax,
//         giftWrapCharge: giftWrapCharge,
//         discount: discount,
//         total: finalTotal,
//         customer: { 
//           ...formData,
//           userId: user?.id || null 
//         },
//         couponCode: couponApplied ? couponCode : null,
//         deliveryDate: formData.deliveryDate || new Date().toISOString().split('T')[0],
//         deliverySlot: formData.deliverySlot,
//         date: new Date().toISOString(),
//         status: "confirmed",
//         paymentMethod: formData.paymentMethod,
//         paymentStatus: "pending"
//       };

//       // Save order to localStorage
//       const orders = JSON.parse(localStorage.getItem("orders") || "[]");
//       orders.push(order);
//       localStorage.setItem("orders", JSON.stringify(orders));

//       // Save address if requested
//       if (formData.saveAddress && user) {
//         const updatedUser = {
//           ...user,
//           address: {
//             street: formData.address,
//             city: formData.city,
//             state: formData.state,
//             zipCode: formData.pincode,
//             country: "India"
//           }
//         };
//         localStorage.setItem("user", JSON.stringify(updatedUser));
//       }

//       // Clear cart
//       clearCart();

//       // Navigate to success page
//       navigate("/order-success", { 
//         state: { 
//           orderId: order.orderId,
//           total: finalTotal,
//           deliveryDate: order.deliveryDate,
//           deliverySlot: deliverySlots.find(slot => slot.id === order.deliverySlot)?.time
//         } 
//       });
//     }, 2000);
//   };

//   const handleQuantityChange = (itemId, newQuantity) => {
//     if (newQuantity >= 1) {
//       updateQuantity(itemId, newQuantity);
//     }
//   };

//   const handleRemoveItem = (itemId) => {
//     if (window.confirm("Are you sure you want to remove this item from your cart?")) {
//       removeFromCart(itemId);
//     }
//   };

//   // Get next available delivery dates (excluding today)
//   const getDeliveryDates = () => {
//     const dates = [];
//     const today = new Date();
//     for (let i = 1; i <= 7; i++) {
//       const date = new Date(today);
//       date.setDate(today.getDate() + i);
//       dates.push({
//         value: date.toISOString().split('T')[0],
//         label: date.toLocaleDateString('en-US', { 
//           weekday: 'short', 
//           month: 'short', 
//           day: 'numeric' 
//         })
//       });
//     }
//     return dates;
//   };

//   if (cart.length === 0) {
//     return (
//       <div className="checkout-empty">
//         <div className="empty-container">
//           <div className="empty-icon">🛒</div>
//           <h2>Your Cart is Empty</h2>
//           <p>Add some exquisite jewellery pieces to your cart before checkout</p>
//           <button className="shop-now-btn" onClick={() => navigate("/shop")}>
//             💎 Explore Collections
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="checkout-page">
//       {/* Header */}
//       <div className="checkout-header">
//         <div className="header-content">
//           <button className="back-btn" onClick={() => navigate(-1)}>
//             ← Back
//           </button>
//           <h1 className="header-title">Secure Checkout</h1>
//           <div className="header-actions">
//             <span className="cart-count">🛒 {cart.length} items</span>
//             <span className="total-amount">₹{finalTotal.toLocaleString()}</span>
//           </div>
//         </div>

//         <div className="checkout-steps">
//           <div className={`step ${formData.fullName ? 'completed' : 'active'}`}>
//             <div className="step-number">1</div>
//             <div className="step-text">Delivery</div>
//           </div>
//           <div className={`step ${formData.paymentMethod ? '' : ''}`}>
//             <div className="step-number">2</div>
//             <div className="step-text">Payment</div>
//           </div>
//           <div className="step">
//             <div className="step-number">3</div>
//             <div className="step-text">Confirm</div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="checkout-container">
//         {/* Left Side - Form */}
//         <div className="checkout-left">
//           {/* Delivery Address Section */}
//           <div className="form-section">
//             <div className="section-header">
//               <div className="section-icon">📍</div>
//               <div>
//                 <h2>Delivery Address</h2>
//                 <p className="section-subtitle">Where should we deliver your order?</p>
//               </div>
//             </div>

//             <div className="address-card">
//               <div className="address-header">
//                 <h3>Shipping Details</h3>
//                 {user && (
//                   <button className="use-saved-btn" onClick={() => {
//                     if (user.address?.street) {
//                       setFormData(prev => ({
//                         ...prev,
//                         address: user.address.street,
//                         city: user.address.city,
//                         state: user.address.state,
//                         pincode: user.address.zipCode
//                       }));
//                     }
//                   }}>
//                     Use Saved Address
//                   </button>
//                 )}
//               </div>

//               <div className="form-grid">
//                 <div className="form-group">
//                   <label>
//                     <span className="label-text">Full Name</span>
//                     <span className="required">*</span>
//                   </label>
//                   <div className="input-with-icon">
//                     <span className="input-icon">👤</span>
//                     <input
//                       type="text"
//                       name="fullName"
//                       value={formData.fullName}
//                       onChange={handleChange}
//                       placeholder="Enter your full name"
//                       className={errors.fullName ? "error" : ""}
//                     />
//                   </div>
//                   {errors.fullName && <span className="error-message">{errors.fullName}</span>}
//                 </div>

//                 <div className="form-group">
//                   <label>
//                     <span className="label-text">Email</span>
//                     <span className="required">*</span>
//                   </label>
//                   <div className="input-with-icon">
//                     <span className="input-icon">📧</span>
//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       placeholder="your@email.com"
//                       className={errors.email ? "error" : ""}
//                     />
//                   </div>
//                   {errors.email && <span className="error-message">{errors.email}</span>}
//                 </div>

//                 <div className="form-group">
//                   <label>
//                     <span className="label-text">Phone</span>
//                     <span className="required">*</span>
//                   </label>
//                   <div className="phone-input">
//                     <span className="country-code">🇮🇳 +91</span>
//                     <input
//                       type="tel"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleChange}
//                       placeholder="98765 43210"
//                       maxLength="10"
//                       className={errors.phone ? "error" : ""}
//                     />
//                   </div>
//                   {errors.phone && <span className="error-message">{errors.phone}</span>}
//                 </div>

//                 <div className="form-group full-width">
//                   <label>
//                     <span className="label-text">Complete Address</span>
//                     <span className="required">*</span>
//                   </label>
//                   <div className="input-with-icon">
//                     <span className="input-icon">🏠</span>
//                     <textarea
//                       name="address"
//                       value={formData.address}
//                       onChange={handleChange}
//                       placeholder="House no., Building, Street, Area, Landmark"
//                       rows="3"
//                       className={errors.address ? "error" : ""}
//                     />
//                   </div>
//                   {errors.address && <span className="error-message">{errors.address}</span>}
//                 </div>

//                 <div className="form-group">
//                   <label>
//                     <span className="label-text">City</span>
//                     <span className="required">*</span>
//                   </label>
//                   <div className="input-with-icon">
//                     <span className="input-icon">🏙️</span>
//                     <input
//                       type="text"
//                       name="city"
//                       value={formData.city}
//                       onChange={handleChange}
//                       placeholder="Enter city"
//                       className={errors.city ? "error" : ""}
//                     />
//                   </div>
//                   {errors.city && <span className="error-message">{errors.city}</span>}
//                 </div>

//                 <div className="form-group">
//                   <label>
//                     <span className="label-text">State</span>
//                   </label>
//                   <div className="input-with-icon">
//                     <span className="input-icon">🗺️</span>
//                     <input
//                       type="text"
//                       name="state"
//                       value={formData.state}
//                       onChange={handleChange}
//                       placeholder="Enter state"
//                     />
//                   </div>
//                 </div>

//                 <div className="form-group">
//                   <label>
//                     <span className="label-text">Pincode</span>
//                     <span className="required">*</span>
//                   </label>
//                   <div className="input-with-icon">
//                     <span className="input-icon">📮</span>
//                     <input
//                       type="text"
//                       name="pincode"
//                       value={formData.pincode}
//                       onChange={handleChange}
//                       placeholder="6-digit pincode"
//                       maxLength="6"
//                       className={errors.pincode ? "error" : ""}
//                     />
//                   </div>
//                   {errors.pincode && <span className="error-message">{errors.pincode}</span>}
//                 </div>
//               </div>

//               <div className="address-options">
//                 <label className="checkbox-label">
//                   <input
//                     type="checkbox"
//                     name="saveAddress"
//                     checked={formData.saveAddress}
//                     onChange={handleChange}
//                   />
//                   <span className="custom-checkbox"></span>
//                   <span className="checkbox-text">Save this address for future orders</span>
//                 </label>
//               </div>
//             </div>
//           </div>

//           {/* Delivery Options */}
//           <div className="form-section">
//             <div className="section-header">
//               <div className="section-icon">🚚</div>
//               <div>
//                 <h2>Delivery Options</h2>
//                 <p className="section-subtitle">Choose your preferred delivery time</p>
//               </div>
//             </div>

//             <div className="delivery-options">
//               <div className="delivery-date">
//                 <label>Preferred Delivery Date</label>
//                 <select
//                   name="deliveryDate"
//                   value={formData.deliveryDate}
//                   onChange={handleChange}
//                   className="date-select"
//                 >
//                   <option value="">Select a date</option>
//                   {getDeliveryDates().map(date => (
//                     <option key={date.value} value={date.value}>
//                       {date.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="delivery-slots">
//                 <label>Preferred Time Slot</label>
//                 <div className="slot-options">
//                   {deliverySlots.map(slot => (
//                     <label key={slot.id} className="slot-option">
//                       <input
//                         type="radio"
//                         name="deliverySlot"
//                         value={slot.id}
//                         checked={formData.deliverySlot === slot.id}
//                         onChange={handleChange}
//                       />
//                       <div className="slot-content">
//                         <span className="slot-icon">{slot.icon}</span>
//                         <div>
//                           <h4>{slot.id.charAt(0).toUpperCase() + slot.id.slice(1)}</h4>
//                           <p>{slot.time}</p>
//                         </div>
//                       </div>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Gift Options */}
//           <div className="form-section">
//             <div className="section-header">
//               <div className="section-icon">🎁</div>
//               <div>
//                 <h2>Gift Options</h2>
//                 <p className="section-subtitle">Make your gift extra special</p>
//               </div>
//             </div>

//             <div className="gift-options">
//               <label className="gift-option">
//                 <input
//                   type="checkbox"
//                   name="giftWrap"
//                   checked={formData.giftWrap}
//                   onChange={handleChange}
//                 />
//                 <div className="gift-content">
//                   <span className="gift-icon">🎀</span>
//                   <div>
//                     <h3>Premium Gift Wrapping</h3>
//                     <p>Beautiful gift box with ribbon and personalized card</p>
//                     <span className="gift-price">+ ₹299</span>
//                   </div>
//                 </div>
//               </label>

//               {formData.giftWrap && (
//                 <div className="gift-message">
//                   <label>Personalized Gift Message (Optional)</label>
//                   <textarea
//                     name="giftMessage"
//                     value={formData.giftMessage}
//                     onChange={handleChange}
//                     placeholder="Write your heartfelt message here..."
//                     rows="3"
//                   />
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Payment Method */}
//           <div className="form-section">
//             <div className="section-header">
//               <div className="section-icon">💳</div>
//               <div>
//                 <h2>Payment Method</h2>
//                 <p className="section-subtitle">Choose how you want to pay</p>
//               </div>
//             </div>

//             <div className="payment-options">
//               <label className={`payment-option ${formData.paymentMethod === 'cod' ? 'selected' : ''}`}>
//                 <input
//                   type="radio"
//                   name="paymentMethod"
//                   value="cod"
//                   checked={formData.paymentMethod === "cod"}
//                   onChange={handleChange}
//                 />
//                 <div className="payment-content">
//                   <span className="payment-icon">💰</span>
//                   <div>
//                     <h3>Cash on Delivery</h3>
//                     <p>Pay when you receive your order</p>
//                     <small>Available for all orders</small>
//                   </div>
//                 </div>
//               </label>

//               <label className={`payment-option ${formData.paymentMethod === 'card' ? 'selected' : ''}`}>
//                 <input
//                   type="radio"
//                   name="paymentMethod"
//                   value="card"
//                   checked={formData.paymentMethod === "card"}
//                   onChange={handleChange}
//                 />
//                 <div className="payment-content">
//                   <span className="payment-icon">💳</span>
//                   <div>
//                     <h3>Credit/Debit Card</h3>
//                     <p>Pay securely with your card</p>
//                     <small>Visa, Mastercard, RuPay</small>
//                   </div>
//                 </div>
//               </label>

//               <label className={`payment-option ${formData.paymentMethod === 'upi' ? 'selected' : ''}`}>
//                 <input
//                   type="radio"
//                   name="paymentMethod"
//                   value="upi"
//                   checked={formData.paymentMethod === "upi"}
//                   onChange={handleChange}
//                 />
//                 <div className="payment-content">
//                   <span className="payment-icon">📱</span>
//                   <div>
//                     <h3>UPI Payment</h3>
//                     <p>Pay using UPI apps</p>
//                     <small>GPay, PhonePe, Paytm</small>
//                   </div>
//                 </div>
//               </label>

//               <label className={`payment-option ${formData.paymentMethod === 'netbanking' ? 'selected' : ''}`}>
//                 <input
//                   type="radio"
//                   name="paymentMethod"
//                   value="netbanking"
//                   checked={formData.paymentMethod === "netbanking"}
//                   onChange={handleChange}
//                 />
//                 <div className="payment-content">
//                   <span className="payment-icon">🏦</span>
//                   <div>
//                     <h3>Net Banking</h3>
//                     <p>Pay using your bank account</p>
//                     <small>All major banks</small>
//                   </div>
//                 </div>
//               </label>
//             </div>
//           </div>
//         </div>

//         {/* Right Side - Order Summary */}
//         <div className="checkout-right">
//           <div className="order-summary-card">
//             <div className="summary-header">
//               <h2>Order Summary</h2>
//               <span className="item-count">{cart.length} items</span>
//             </div>

//             {/* Cart Items */}
//             <div className="cart-items">
//               {cart.map((item, index) => (
//                 <div key={index} className="cart-item">
//                   <div className="item-image">
//                     <img src={item.image} alt={item.name} />
//                   </div>
//                   <div className="item-details">
//                     <h4>{item.name}</h4>
//                     <p className="item-price">₹{item.price.toLocaleString()}</p>
//                     {item.giftWrapped && (
//                       <span className="gift-tag">🎁 Gift Wrapped</span>
//                     )}
//                     <div className="item-actions">
//                       <div className="quantity-control">
//                         <button 
//                           onClick={() => handleQuantityChange(item.id, (item.quantity || 1) - 1)}
//                           disabled={item.quantity <= 1}
//                         >
//                           -
//                         </button>
//                         <span>{item.quantity || 1}</span>
//                         <button onClick={() => handleQuantityChange(item.id, (item.quantity || 1) + 1)}>
//                           +
//                         </button>
//                       </div>
//                       <button 
//                         className="remove-btn"
//                         onClick={() => handleRemoveItem(item.id)}
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                   <div className="item-total">
//                     ₹{(item.price * (item.quantity || 1)).toLocaleString()}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Coupon Section */}
//             <div className="coupon-section">
//               <div className="coupon-input">
//                 <input
//                   type="text"
//                   placeholder="Enter coupon code"
//                   value={couponCode}
//                   onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
//                   disabled={couponApplied}
//                 />
//                 {couponApplied ? (
//                   <button className="remove-coupon-btn" onClick={handleCouponRemove}>
//                     Remove
//                   </button>
//                 ) : (
//                   <button className="apply-coupon-btn" onClick={handleCouponApply}>
//                     Apply
//                   </button>
//                 )}
//               </div>
//               {couponError && <span className="coupon-error">{couponError}</span>}
//               {couponApplied && (
//                 <div className="coupon-success">
//                   🎉 Coupon applied! You saved ₹{discount.toLocaleString()}
//                 </div>
//               )}
//             </div>

//             {/* Available Coupons */}
//             <div className="available-coupons">
//               <h4>Available Coupons</h4>
//               <div className="coupon-list">
//                 {availableCoupons.map(coupon => (
//                   <div key={coupon.code} className="coupon-item">
//                     <span className="coupon-code">{coupon.code}</span>
//                     <span className="coupon-desc">
//                       {coupon.discount}% off on orders above ₹{coupon.minAmount.toLocaleString()}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Price Breakdown */}
//             <div className="price-breakdown">
//               <div className="price-row">
//                 <span>Subtotal</span>
//                 <span>₹{subtotal.toLocaleString()}</span>
//               </div>

//               {discount > 0 && (
//                 <div className="price-row discount">
//                   <span>
//                     Discount <span className="coupon-code-badge">{couponCode}</span>
//                   </span>
//                   <span className="discount-amount">- ₹{discount.toLocaleString()}</span>
//                 </div>
//               )}

//               <div className="price-row">
//                 <span>Delivery Charge</span>
//                 <span className={deliveryCharge === 0 ? "free" : ""}>
//                   {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
//                 </span>
//               </div>

//               {formData.giftWrap && (
//                 <div className="price-row">
//                   <span>Gift Wrapping</span>
//                   <span>₹{giftWrapCharge}</span>
//                 </div>
//               )}

//               <div className="price-row">
//                 <span>Tax (3%)</span>
//                 <span>₹{tax.toLocaleString()}</span>
//               </div>

//               <div className="price-row total">
//                 <span>Total Amount</span>
//                 <span className="final-total">₹{finalTotal.toLocaleString()}</span>
//               </div>
//             </div>

//             {/* Order Notes */}
//             <div className="order-notes">
//               <div className="note-item">
//                 <span className="note-icon">📦</span>
//                 <p>Free delivery on orders above ₹10,000</p>
//               </div>
//               <div className="note-item">
//                 <span className="note-icon">🔒</span>
//                 <p>100% secure payment & SSL encrypted</p>
//               </div>
//               <div className="note-item">
//                 <span className="note-icon">📞</span>
//                 <p>Need help? Call us at +91 81601 36653</p>
//               </div>
//             </div>

//             {/* Place Order Button */}
//             <button 
//               className="place-order-btn"
//               onClick={placeOrder}
//               disabled={isProcessing}
//             >
//               {isProcessing ? (
//                 <>
//                   <span className="spinner"></span>
//                   Processing Your Order...
//                 </>
//               ) : (
//                 <>
//                   <span className="btn-icon">💎</span>
//                   Place Order - ₹{finalTotal.toLocaleString()}
//                 </>
//               )}
//             </button>

//             {/* Security Badges */}
//             <div className="security-badges">
//               <div className="security-badge">
//                 <span>🔒</span>
//                 <span>Secure Payment</span>
//               </div>
//               <div className="security-badge">
//                 <span>✅</span>
//                 <span>SSL Encrypted</span>
//               </div>
//               <div className="security-badge">
//                 <span>💳</span>
//                 <span>PCI DSS Compliant</span>
//               </div>
//             </div>

//             {/* Terms */}
//             <div className="terms-agreement">
//               <p className="terms-text">
//                 By placing your order, you agree to our{" "}
//                 <a href="/terms" className="terms-link">Terms of Service</a> and{" "}
//                 <a href="/privacy" className="terms-link">Privacy Policy</a>
//               </p>
//             </div>
//           </div>

//           {/* Need Help */}
//           <div className="help-section">
//             <h3>Need Help?</h3>
//             <div className="help-options">
//               <button className="help-btn">
//                 <span>📞</span>
//                 Call Us
//               </button>
//               <button className="help-btn">
//                 <span>💬</span>
//                 WhatsApp
//               </button>
//               <button className="help-btn">
//                 <span>📧</span>
//                 Email
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Checkout;


import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { generateInvoice } from "../utils/invoiceGenerator";
import "./Checkout.css";

function Checkout() {
  const { cart, clearCart, updateQuantity, removeFromCart } = useContext(CartContext);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "Gujarat",
    pincode: "",
    paymentMethod: "cod",
    saveAddress: true,
    giftWrap: false,
    giftMessage: "",
    deliveryDate: "",
    deliverySlot: "morning"
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");

  // NEW STATES for success page
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  // Delivery slots
  const deliverySlots = [
    { id: "morning", time: "9 AM - 12 PM", icon: "🌅" },
    { id: "afternoon", time: "12 PM - 4 PM", icon: "☀️" },
    { id: "evening", time: "4 PM - 8 PM", icon: "🌆" }
  ];

  // Available coupons
  const availableCoupons = [
    { code: "RIKA10", discount: 10, minAmount: 5000 },
    { code: "RIKA20", discount: 20, minAmount: 15000 },
    { code: "WELCOME5", discount: 5, minAmount: 3000 }
  ];

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const deliveryCharge = subtotal > 10000 ? 0 : 199;
  const tax = subtotal * 0.03; // 3% tax
  const giftWrapCharge = formData.giftWrap ? 299 : 0;
  let discount = 0;

  // Apply coupon if valid
  if (couponApplied) {
    const coupon = availableCoupons.find(c => c.code === couponCode);
    if (coupon && subtotal >= coupon.minAmount) {
      discount = (subtotal * coupon.discount) / 100;
    }
  }

  const finalTotal = subtotal + deliveryCharge + tax + giftWrapCharge - discount;

  // Initialize form with user data if available
  useEffect(() => {
    if (user) {
      const userName = user.name ? user.name.split(' ') : [];
      setFormData(prev => ({
        ...prev,
        fullName: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address?.street || "",
        city: user.address?.city || "",
        state: user.address?.state || "Gujarat",
        pincode: user.address?.zipCode || ""
      }));
    }
  }, [user]);

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Safety check for formData values to prevent .trim() crashes
    const fullName = formData.fullName || "";
    const email = formData.email || "";
    const phone = formData.phone || "";
    const address = formData.address || "";
    const city = formData.city || "";
    const pincode = formData.pincode || "";

    if (!fullName.trim()) newErrors.fullName = "Full name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email address";

    if (!phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(phone)) newErrors.phone = "Invalid phone number (10 digits)";

    if (!address.trim()) newErrors.address = "Address is required";
    if (!city.trim()) newErrors.city = "City is required";
    if (!pincode.trim()) newErrors.pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(pincode)) newErrors.pincode = "Invalid pincode (6 digits)";

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleCouponApply = () => {
    setCouponError("");
    const coupon = availableCoupons.find(c => c.code === couponCode);

    if (!coupon) {
      setCouponError("Invalid coupon code");
      return;
    }

    if (subtotal < coupon.minAmount) {
      setCouponError(`Minimum purchase of ₹${coupon.minAmount.toLocaleString()} required`);
      return;
    }

    setCouponApplied(true);
  };

  const handleCouponRemove = () => {
    setCouponApplied(false);
    setCouponCode("");
    setCouponError("");
  };

  const finalizeOrderPlacement = async (paymentMethodStr, paymentId = null) => {
    try {
      const tempOrderId = `RIKA${Date.now()}${Math.floor(Math.random() * 1000)}`;

      const orderData = {
        orderId: tempOrderId,
        items: cart.map(item => ({
          product: item.id || item._id, // Support both id formats
          quantity: item.quantity || 1
        })),
        shippingAddress: {
          name: formData.fullName,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode
        },
        paymentMethod: paymentMethodStr,
        paymentId: paymentId,
        totalAmount: finalTotal
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(orderData)
      });

      const data = await response.json();

      if (data.success) {
        clearCart();
        if (formData.saveAddress) {
          const updatedUser = {
            ...user,
            address: {
              street: formData.address,
              city: formData.city,
              state: formData.state,
              zipCode: formData.pincode,
              country: "India"
            }
          };
        }
        setOrderDetails({
          ...data.order,
          deliveryDate: formData.deliveryDate || new Date().toISOString().split('T')[0],
          deliverySlot: deliverySlots.find(slot => slot.id === formData.deliverySlot)?.time
        });
        setOrderPlaced(true);
      } else {
        if (response.status === 401 || (data.message && data.message.includes("Not authorized"))) {
          alert("Your session has expired. Please log in again to continue.");
          logout();
          navigate("/login", { state: { from: "/checkout" } });
        } else {
          alert(data.message || "Failed to place order. Please try again.");
        }
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Order error:", error);
      alert("An error occurred while placing your order. Please check your connection and try again.");
      setIsProcessing(false);
    }
  };

  const placeOrder = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      alert("Please fill in all required fields correctly.");
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (!user || !user.token) {
      alert("Please login to place your order.");
      navigate("/login", { state: { from: "/checkout" } });
      return;
    }

    setIsProcessing(true);

    try {
      let paymentMethod = (formData.paymentMethod || "cod").toUpperCase();

      if (paymentMethod !== "COD") {
         const rzpResponse = await fetch('/api/orders/razorpay/create', {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
                 'Authorization': `Bearer ${user.token}`
             },
             body: JSON.stringify({ amount: finalTotal })
         });
         
         if (rzpResponse.status === 401) {
            alert("Your session has expired. Please log in again to continue.");
            logout();
            navigate("/login", { state: { from: "/checkout" } });
            setIsProcessing(false);
            return;
         }
         
         const rzpData = await rzpResponse.json();
         
         if (!rzpData.success) {
            if (rzpData.message && rzpData.message.includes("npm install razorpay")) {
               alert("Developer Notice: " + rzpData.message);
            } else {
               alert("Error initializing payment: " + (rzpData.message || "Server Error"));
            }
            setIsProcessing(false);
            return;
         }

         const options = {
             key: rzpData.key_id,
             amount: rzpData.order.amount,
             currency: "INR",
             name: "Rika Jewels",
             description: "Payment for your exquisite jewellery order",
             order_id: rzpData.order.id,
             handler: async function (response) {
                 await finalizeOrderPlacement(paymentMethod, response.razorpay_payment_id);
             },
             prefill: {
                 name: formData.fullName,
                 email: formData.email,
                 contact: formData.phone
             },
             theme: { color: "#c5a044" }
         };

         const rzpWindow = new window.Razorpay(options);
         rzpWindow.on('payment.failed', function (response){
             alert("Payment Failed! " + response.error.description);
             setIsProcessing(false);
         });
         rzpWindow.open();
         return; 
      }

      // COD Path directly saves the order
      await finalizeOrderPlacement(paymentMethod, null);

    } catch (error) {
      console.error("Order process error:", error);
      alert("An error occurred. Please try again.");
      setIsProcessing(false);
    }
  };

  const handleQuantityChange = (index, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(index, newQuantity);
    }
  };

  const handleRemoveItem = (index) => {
    if (window.confirm("Are you sure you want to remove this item from your cart?")) {
      removeFromCart(index);
    }
  };

  // Get next available delivery dates (excluding today)
  const getDeliveryDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        })
      });
    }
    return dates;
  };

  // Success Page Component
  const SuccessPage = () => {
    const deliverySlotsMap = {
      "morning": "9 AM - 12 PM",
      "afternoon": "12 PM - 4 PM",
      "evening": "4 PM - 8 PM"
    };

    return (
      <div className="checkout-success-page">
        <div className="success-container">
          <div className="success-animation">
            <div className="success-icon">✅</div>
          </div>

          <div className="success-content">
            <h1>🎉 Order Confirmed!</h1>
            <p className="success-subtitle">Thank you for shopping with Rika Jewellery</p>

            <div className="order-id">
              <span>Order ID: </span>
              <strong>{orderDetails.orderId}</strong>
            </div>

            <div className="order-summary-card">
              <h3>Order Summary</h3>
              <div className="summary-details">
                <div className="detail-row">
                  <span>Total Amount:</span>
                  <span className="total-amount">₹{(orderDetails.totalAmount || orderDetails.total || 0).toLocaleString()}</span>
                </div>
                <div className="detail-row">
                  <span>Payment Method:</span>
                  <span>{orderDetails.paymentMethod || (orderDetails.payment?.method) || "Cash on Delivery"}</span>
                </div>
                <div className="detail-row">
                  <span>Estimated Delivery:</span>
                  <span>
                    {orderDetails.deliveryDate && new Date(orderDetails.deliveryDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric'
                    })}
                    <br />
                    <small>{orderDetails.deliverySlot}</small>
                  </span>
                </div>
              </div>
            </div>

            <div className="action-buttons">
              <button className="btn-primary" onClick={() => generateInvoice(orderDetails)}>
                Download Invoice 📄
              </button>
              <button className="btn-secondary" onClick={() => navigate("/orders")}>
                Track Order
              </button>
              <button className="btn-outline" onClick={() => navigate("/")}>
                Continue Shopping
              </button>
            </div>

            <div className="help-section">
              <p>Need help? Call us at +91 81601 36653</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Check if order was placed and show success page
  if (orderPlaced && orderDetails) {
    return <SuccessPage />;
  }

  if (cart.length === 0) {
    return (
      <div className="checkout-empty">
        <div className="empty-container">
          <div className="empty-icon">🛒</div>
          <h2>Your Cart is Empty</h2>
          <p>Add some exquisite jewellery pieces to your cart before checkout</p>
          <button className="shop-now-btn" onClick={() => navigate("/shop")}>
            💎 Explore Collections
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      {/* Header */}
      <div className="checkout-header">
        <div className="header-content">
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Back
          </button>
          <h1 className="header-title">Secure Checkout</h1>
          <div className="header-actions">
            <span className="cart-count">🛒 {cart.length} items</span>
            <span className="total-amount">₹{finalTotal.toLocaleString()}</span>
          </div>
        </div>

        <div className="checkout-steps">
          <div className={`step ${formData.fullName ? 'completed' : 'active'}`}>
            <div className="step-number">1</div>
            <div className="step-text">Delivery</div>
          </div>
          <div className={`step ${formData.paymentMethod ? '' : ''}`}>
            <div className="step-number">2</div>
            <div className="step-text">Payment</div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-text">Confirm</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="checkout-container">
        {/* Left Side - Form */}
        <div className="checkout-left">
          {/* Delivery Address Section */}
          <div className="form-section">
            <div className="section-header">
              <div className="section-icon">📍</div>
              <div>
                <h2>Delivery Address</h2>
                <p className="section-subtitle">Where should we deliver your order?</p>
              </div>
            </div>

            <div className="address-card">
              <div className="address-header">
                <h3>Shipping Details</h3>
                {user && (
                  <button className="use-saved-btn" onClick={() => {
                    if (user.address?.street) {
                      setFormData(prev => ({
                        ...prev,
                        address: user.address.street,
                        city: user.address.city,
                        state: user.address.state,
                        pincode: user.address.zipCode
                      }));
                    }
                  }}>
                    Use Saved Address
                  </button>
                )}
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>
                    <span className="label-text">Full Name</span>
                    <span className="required">*</span>
                  </label>
                  <div className="input-with-icon">
                    <span className="input-icon">👤</span>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className={errors.fullName ? "error" : ""}
                    />
                  </div>
                  {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                </div>

                <div className="form-group">
                  <label>
                    <span className="label-text">Email</span>
                    <span className="required">*</span>
                  </label>
                  <div className="input-with-icon">
                    <span className="input-icon">📧</span>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={errors.email ? "error" : ""}
                    />
                  </div>
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label>
                    <span className="label-text">Phone</span>
                    <span className="required">*</span>
                  </label>
                  <div className="phone-input">
                    <span className="country-code">🇮🇳 +91</span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="98765 43210"
                      maxLength="10"
                      className={errors.phone ? "error" : ""}
                    />
                  </div>
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>

                <div className="form-group full-width">
                  <label>
                    <span className="label-text">Complete Address</span>
                    <span className="required">*</span>
                  </label>
                  <div className="input-with-icon">
                    <span className="input-icon">🏠</span>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="House no., Building, Street, Area, Landmark"
                      rows="3"
                      className={errors.address ? "error" : ""}
                    />
                  </div>
                  {errors.address && <span className="error-message">{errors.address}</span>}
                </div>

                <div className="form-group">
                  <label>
                    <span className="label-text">City</span>
                    <span className="required">*</span>
                  </label>
                  <div className="input-with-icon">
                    <span className="input-icon">🏙️</span>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter city"
                      className={errors.city ? "error" : ""}
                    />
                  </div>
                  {errors.city && <span className="error-message">{errors.city}</span>}
                </div>

                <div className="form-group">
                  <label>
                    <span className="label-text">State</span>
                  </label>
                  <div className="input-with-icon">
                    <span className="input-icon">🗺️</span>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Enter state"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>
                    <span className="label-text">Pincode</span>
                    <span className="required">*</span>
                  </label>
                  <div className="input-with-icon">
                    <span className="input-icon">📮</span>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="6-digit pincode"
                      maxLength="6"
                      className={errors.pincode ? "error" : ""}
                    />
                  </div>
                  {errors.pincode && <span className="error-message">{errors.pincode}</span>}
                </div>
              </div>

              <div className="address-options">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="saveAddress"
                    checked={formData.saveAddress}
                    onChange={handleChange}
                  />
                  <span className="custom-checkbox"></span>
                  <span className="checkbox-text">Save this address for future orders</span>
                </label>
              </div>
            </div>
          </div>

          {/* Delivery Options */}
          <div className="form-section">
            <div className="section-header">
              <div className="section-icon">🚚</div>
              <div>
                <h2>Delivery Options</h2>
                <p className="section-subtitle">Choose your preferred delivery time</p>
              </div>
            </div>

            <div className="delivery-options">
              <div className="delivery-date">
                <label>Preferred Delivery Date</label>
                <select
                  name="deliveryDate"
                  value={formData.deliveryDate}
                  onChange={handleChange}
                  className="date-select"
                >
                  <option value="">Select a date</option>
                  {getDeliveryDates().map(date => (
                    <option key={date.value} value={date.value}>
                      {date.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="delivery-slots">
                <label>Preferred Time Slot</label>
                <div className="slot-options">
                  {deliverySlots.map(slot => (
                    <label key={slot.id} className="slot-option">
                      <input
                        type="radio"
                        name="deliverySlot"
                        value={slot.id}
                        checked={formData.deliverySlot === slot.id}
                        onChange={handleChange}
                      />
                      <div className="slot-content">
                        <span className="slot-icon">{slot.icon}</span>
                        <div>
                          <h4>{slot.id.charAt(0).toUpperCase() + slot.id.slice(1)}</h4>
                          <p>{slot.time}</p>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Gift Options */}
          <div className="form-section">
            <div className="section-header">
              <div className="section-icon">🎁</div>
              <div>
                <h2>Gift Options</h2>
                <p className="section-subtitle">Make your gift extra special</p>
              </div>
            </div>

            <div className="gift-options">
              <label className="gift-option">
                <input
                  type="checkbox"
                  name="giftWrap"
                  checked={formData.giftWrap}
                  onChange={handleChange}
                />
                <div className="gift-content">
                  <span className="gift-icon">🎀</span>
                  <div>
                    <h3>Premium Gift Wrapping</h3>
                    <p>Beautiful gift box with ribbon and personalized card</p>
                    <span className="gift-price">+ ₹299</span>
                  </div>
                </div>
              </label>

              {formData.giftWrap && (
                <div className="gift-message">
                  <label>Personalized Gift Message (Optional)</label>
                  <textarea
                    name="giftMessage"
                    value={formData.giftMessage}
                    onChange={handleChange}
                    placeholder="Write your heartfelt message here..."
                    rows="3"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Payment Method */}
          <div className="form-section">
            <div className="section-header">
              <div className="section-icon">💳</div>
              <div>
                <h2>Payment Method</h2>
                <p className="section-subtitle">Choose how you want to pay</p>
              </div>
            </div>

            <div className="payment-options">
              <label className={`payment-option ${formData.paymentMethod === 'cod' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === "cod"}
                  onChange={handleChange}
                />
                <div className="payment-content">
                  <span className="payment-icon">💰</span>
                  <div>
                    <h3>Cash on Delivery</h3>
                    <p>Pay when you receive your order</p>
                    <small>Available for all orders</small>
                  </div>
                </div>
              </label>

              <label className={`payment-option ${formData.paymentMethod === 'card' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === "card"}
                  onChange={handleChange}
                />
                <div className="payment-content">
                  <span className="payment-icon">💳</span>
                  <div>
                    <h3>Credit/Debit Card</h3>
                    <p>Pay securely with your card</p>
                    <small>Visa, Mastercard, RuPay</small>
                  </div>
                </div>
              </label>

              <label className={`payment-option ${formData.paymentMethod === 'upi' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={formData.paymentMethod === "upi"}
                  onChange={handleChange}
                />
                <div className="payment-content">
                  <span className="payment-icon">📱</span>
                  <div>
                    <h3>UPI Payment</h3>
                    <p>Pay using UPI apps</p>
                    <small>GPay, PhonePe, Paytm</small>
                  </div>
                </div>
              </label>

              <label className={`payment-option ${formData.paymentMethod === 'netbanking' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="netbanking"
                  checked={formData.paymentMethod === "netbanking"}
                  onChange={handleChange}
                />
                <div className="payment-content">
                  <span className="payment-icon">🏦</span>
                  <div>
                    <h3>Net Banking</h3>
                    <p>Pay using your bank account</p>
                    <small>All major banks</small>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Side - Order Summary */}
        <div className="checkout-right">
          <div className="order-summary-card">
            <div className="summary-header">
              <h2>Order Summary</h2>
              <span className="item-count">{cart.length} items</span>
            </div>

            {/* Cart Items */}
            <div className="cart-items">
              {cart.map((item, index) => (
                <div key={index} className="cart-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p className="item-price">₹{item.price.toLocaleString()}</p>
                    {item.giftWrapped && (
                      <span className="gift-tag">🎁 Gift Wrapped</span>
                    )}
                    <div className="item-actions">
                      <div className="quantity-control">
                        <button
                          onClick={() => handleQuantityChange(index, (item.quantity || 1) - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span>{item.quantity || 1}</span>
                        <button onClick={() => handleQuantityChange(index, (item.quantity || 1) + 1)}>
                          +
                        </button>
                      </div>
                      <button
                        className="remove-btn"
                        onClick={() => handleRemoveItem(index)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="item-total">
                    ₹{(item.price * (item.quantity || 1)).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon Section */}
            <div className="coupon-section">
              <div className="coupon-input">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  disabled={couponApplied}
                />
                {couponApplied ? (
                  <button className="remove-coupon-btn" onClick={handleCouponRemove}>
                    Remove
                  </button>
                ) : (
                  <button className="apply-coupon-btn" onClick={handleCouponApply}>
                    Apply
                  </button>
                )}
              </div>
              {couponError && <span className="coupon-error">{couponError}</span>}
              {couponApplied && (
                <div className="coupon-success">
                  🎉 Coupon applied! You saved ₹{discount.toLocaleString()}
                </div>
              )}
            </div>

            {/* Available Coupons */}
            <div className="available-coupons">
              <h4>Available Coupons</h4>
              <div className="coupon-list">
                {availableCoupons.map(coupon => (
                  <div key={coupon.code} className="coupon-item">
                    <span className="coupon-code">{coupon.code}</span>
                    <span className="coupon-desc">
                      {coupon.discount}% off on orders above ₹{coupon.minAmount.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="price-breakdown">
              <div className="price-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>

              {discount > 0 && (
                <div className="price-row discount">
                  <span>
                    Discount <span className="coupon-code-badge">{couponCode}</span>
                  </span>
                  <span className="discount-amount">- ₹{discount.toLocaleString()}</span>
                </div>
              )}

              <div className="price-row">
                <span>Delivery Charge</span>
                <span className={deliveryCharge === 0 ? "free" : ""}>
                  {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
                </span>
              </div>

              {formData.giftWrap && (
                <div className="price-row">
                  <span>Gift Wrapping</span>
                  <span>₹{giftWrapCharge}</span>
                </div>
              )}

              <div className="price-row">
                <span>Tax (3%)</span>
                <span>₹{tax.toLocaleString()}</span>
              </div>

              <div className="price-row total">
                <span>Total Amount</span>
                <span className="final-total">₹{finalTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Order Notes */}
            <div className="order-notes">
              <div className="note-item">
                <span className="note-icon">📦</span>
                <p>Free delivery on orders above ₹10,000</p>
              </div>
              <div className="note-item">
                <span className="note-icon">🔒</span>
                <p>100% secure payment & SSL encrypted</p>
              </div>
              <div className="note-item">
                <span className="note-icon">📞</span>
                <p>Need help? Call us at +91 81601 36653</p>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              className="place-order-btn"
              onClick={placeOrder}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <span className="spinner"></span>
                  Processing Your Order...
                </>
              ) : (
                <>
                  <span className="btn-icon">💎</span>
                  Place Order - ₹{finalTotal.toLocaleString()}
                </>
              )}
            </button>

            {/* Security Badges */}
            <div className="security-badges">
              <div className="security-badge">
                <span>🔒</span>
                <span>Secure Payment</span>
              </div>
              <div className="security-badge">
                <span>✅</span>
                <span>SSL Encrypted</span>
              </div>
              <div className="security-badge">
                <span>💳</span>
                <span>PCI DSS Compliant</span>
              </div>
            </div>

            {/* Terms */}
            <div className="terms-agreement">
              <p className="terms-text">
                By placing your order, you agree to our{" "}
                <a href="/terms" className="terms-link">Terms of Service</a> and{" "}
                <a href="/privacy" className="terms-link">Privacy Policy</a>
              </p>
            </div>
          </div>

          {/* Need Help */}
          <div className="help-section">
            <h3>Need Help?</h3>
            <div className="help-options">
              <button className="help-btn">
                <span>📞</span>
                Call Us
              </button>
              <button className="help-btn">
                <span>💬</span>
                WhatsApp
              </button>
              <button className="help-btn">
                <span>📧</span>
                Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;