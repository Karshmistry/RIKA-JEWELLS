// // OrderSuccess.js
// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate, Link } from "react-router-dom";
// import "./OrderSuccess.css";

// function OrderSuccess() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [orderDetails, setOrderDetails] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Check if coming from checkout with state
//     if (location.state) {
//       setOrderDetails(location.state);
//       setIsLoading(false);
//     } else {
//       // Try to get from localStorage
//       setTimeout(() => {
//         const orders = JSON.parse(localStorage.getItem("orders") || "[]");
//         if (orders.length > 0) {
//           const latestOrder = orders[orders.length - 1];
//           setOrderDetails({
//             orderId: latestOrder.orderId,
//             total: latestOrder.total,
//             deliveryDate: latestOrder.deliveryDate,
//             deliverySlot: latestOrder.deliverySlot
//           });
//         }
//         setIsLoading(false);
//       }, 1000);
//     }
//   }, [location.state]);

//   if (isLoading) {
//     return (
//       <div className="order-success-page">
//         <div className="loading-container">
//           <div className="loading-spinner">
//             <div className="spinner"></div>
//             <h2>Loading your order details...</h2>
//             <p>Please wait while we confirm your order</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!orderDetails) {
//     return (
//       <div className="order-success-page">
//         <div className="no-order-container">
//           <h1>No Order Found</h1>
//           <p>It seems you haven't placed any order yet.</p>
//           <button onClick={() => navigate("/")}>Continue Shopping</button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="order-success-page">
//       <div className="success-container">
//         {/* Success Animation */}
//         <div className="success-animation">
//           <div className="success-checkmark">
//             <div className="check-icon">
//               <span className="icon-line line-tip"></span>
//               <span className="icon-line line-long"></span>
//               <div className="icon-circle"></div>
//               <div className="icon-fix"></div>
//             </div>
//           </div>
//           <div className="confetti">
//             {[...Array(20)].map((_, i) => (
//               <div key={i} className="confetti-piece"></div>
//             ))}
//           </div>
//         </div>

//         {/* Success Message */}
//         <div className="success-message">
//           <h1>🎉 Order Confirmed!</h1>
//           <p>Thank you for shopping with Rika Jewellery</p>
//           <div className="order-id">
//             Order ID: <strong>{orderDetails.orderId}</strong>
//           </div>
//         </div>

//         {/* Order Summary */}
//         <div className="order-summary">
//           <h2>Order Summary</h2>
//           <div className="summary-details">
//             <div className="detail-row">
//               <span>Order Total:</span>
//               <span className="total-amount">₹{orderDetails.total.toLocaleString()}</span>
//             </div>
//             <div className="detail-row">
//               <span>Payment Method:</span>
//               <span>Cash on Delivery</span>
//             </div>
//             <div className="detail-row">
//               <span>Estimated Delivery:</span>
//               <span>
//                 {orderDetails.deliveryDate && new Date(orderDetails.deliveryDate).toLocaleDateString('en-US', {
//                   weekday: 'long',
//                   month: 'long',
//                   day: 'numeric'
//                 })}
//                 <br />
//                 <small>{orderDetails.deliverySlot}</small>
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="action-buttons">
//           <button className="btn-primary" onClick={() => navigate("/orders")}>
//             Track Order
//           </button>
//           <button className="btn-secondary" onClick={() => navigate("/")}>
//             Continue Shopping
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default OrderSuccess;

// OrderSuccess.js
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./OrderSuccess.css";

function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    if (location.state) {
      setOrderDetails(location.state);
    } else {
      // Try to get order from localStorage
      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      if (orders.length > 0) {
        const latestOrder = orders[orders.length - 1];
        setOrderDetails({
          orderId: latestOrder.orderId,
          total: latestOrder.total,
          deliveryDate: latestOrder.deliveryDate,
          deliverySlot: latestOrder.deliverySlot
        });
      }
    }
  }, [location.state]);

  const handleContinueShopping = () => {
    navigate("/");
  };

  const handleTrackOrder = () => {
    navigate("/orders");
  };

  if (!orderDetails) {
    return (
      <div className="order-success-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <h2>Loading your order details...</h2>
          <p>Please wait while we confirm your order</p>
        </div>
      </div>
    );
  }

  return (
    <div className="order-success-page">
      <div className="success-container">
        <div className="success-icon">✅</div>
        <h1>Order Confirmed!</h1>
        <p className="order-id">Order ID: {orderDetails.orderId}</p>
        
        <div className="order-summary">
          <div className="summary-item">
            <span>Total Amount:</span>
            <span className="amount">₹{orderDetails.total?.toLocaleString()}</span>
          </div>
          <div className="summary-item">
            <span>Estimated Delivery:</span>
            <span>{orderDetails.deliveryDate || "Within 3-5 days"}</span>
          </div>
          <div className="summary-item">
            <span>Delivery Slot:</span>
            <span>{orderDetails.deliverySlot || "9 AM - 8 PM"}</span>
          </div>
        </div>

        <div className="action-buttons">
          <button className="btn-primary" onClick={handleTrackOrder}>
            Track Order
          </button>
          <button className="btn-secondary" onClick={handleContinueShopping}>
            Continue Shopping
          </button>
        </div>

        <div className="customer-support">
          <p>Need help? Call us at +91 81601 36653</p>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;