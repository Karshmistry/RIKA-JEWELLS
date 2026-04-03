// // import Navbar from "./components/Navbar";
// // import Home from "./pages/Home";
// // import Cart from "./pages/Cart";
// // import Login from "./pages/Login";
// // import Signup from "./pages/Signup";
// // import Gold from "./pages/Gold";
// // import Gift from "./pages/Gift";
// // import Contact from "./pages/Contact";
// // import Collections from "./pages/Collections";
// // import Profile from "./pages/Profile";

// // import { CartProvider } from "./context/CartContext";
// // import { AuthProvider } from "./context/AuthContext";
// // import ProtectedRoute from "./components/ProtectedRoute";

// // import { Routes, Route } from "react-router-dom";

// // function App() {
// //   return (
// //     <AuthProvider>
// //       <CartProvider>
// //         <Navbar />

// //         <Routes>
// //           {/* PUBLIC ROUTES */}
// //           <Route path="/" element={<Home />} />
// //           <Route path="/gold" element={<Gold />} />
// //           <Route path="/gift" element={<Gift />} />
// //           <Route path="/contact" element={<Contact />} />
// //           <Route path="/collections/:category" element={<Collections />} />
// //           <Route path="/login" element={<Login />} />
// //           <Route path="/signup" element={<Signup />} />

// //           {/* 🔒 PROTECTED ROUTES */}
// //           <Route
// //             path="/cart"
// //             element={
// //               <ProtectedRoute>
// //                 <Cart />
// //               </ProtectedRoute>
// //             }
// //           />

// //           <Route
// //             path="/profile"
// //             element={
// //               <ProtectedRoute>
// //                 <Profile />
// //               </ProtectedRoute>
// //             }
// //           />
// //         </Routes>
// //       </CartProvider>
// //     </AuthProvider>
// //   );
// // }

// // export default App;


// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Cart from "./pages/Cart";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Gold from "./pages/Gold";
// import Gift from "./pages/Gift";
// import Contact from "./pages/Contact";
// import Collections from "./pages/Collections";
// import Profile from "./pages/Profile";
// import Wedding from "./pages/Wedding"
// import Diamond from "./pages/Diamond";
// import { CartProvider } from "./context/CartContext";
// import { AuthProvider } from "./context/AuthContext"; // FIXED: Correct path
// import ProtectedRoute from "./components/ProtectedRoute";

// import { Routes, Route } from "react-router-dom";
// import React from "react";

// // Add this Error Boundary component
// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false, errorComponent: null };
//   }

//   static getDerivedStateFromError(error) {
//     return { hasError: true };
//   }

//   componentDidCatch(error, errorInfo) {
//     console.error("Error caught in boundary:", error);
//     console.error("Error component:", this.props.componentName);
//     this.setState({ errorComponent: this.props.componentName });
//   }

//   render() {
//     if (this.state.hasError) {
//       return (
//         <div style={{ padding: '20px', border: '2px solid red', margin: '20px' }}>
//           <h3>⚠️ Error in {this.state.errorComponent || 'component'}</h3>
//           <p>This component has an error and cannot be displayed.</p>
//         </div>
//       );
//     }

//     return this.props.children;
//   }
// }

// function App() {
//   return (
//     <AuthProvider>
//       <CartProvider>
//         <Navbar />

//         <Routes>
//           {/* PUBLIC ROUTES */}
//           <Route path="/" element={
//             <ErrorBoundary componentName="Home">
//               <Home />
//             </ErrorBoundary>
//           } />
//           <Route path="/gold" element={
//             <ErrorBoundary componentName="Gold">
//               <Gold />
//             </ErrorBoundary>
//           } />
//           <Route path="/gift" element={
//             <ErrorBoundary componentName="Gift">
//               <Gift />
//             </ErrorBoundary>
//           } />
//           <Route path="/contact" element={
//             <ErrorBoundary componentName="Contact">
//               <Contact />
//             </ErrorBoundary>
//           } />
//           <Route path="/collections/:category" element={
//             <ErrorBoundary componentName="Collections">
//               <Collections />
//             </ErrorBoundary>
//           } />
//           <Route path="/login" element={
//             <ErrorBoundary componentName="Login">
//               <Login />
//             </ErrorBoundary>
//           } />
//           <Route path="/signup" element={
//             <ErrorBoundary componentName="Signup">
//               <Signup />
//             </ErrorBoundary>
//           } />

//           <Route path="/Wedding" element={
//             <ErrorBoundary componentName="Wedding">
//               <Wedding />
//             </ErrorBoundary>
//           } />

//           <Route path="/Diamond" element={
//             <ErrorBoundary componentName="Diamond">
//               <Diamond />
//             </ErrorBoundary>
//           } />

//           {/* 🔒 PROTECTED ROUTES */}
//           <Route
//             path="/cart"
//             element={
//               <ProtectedRoute>
//                 <ErrorBoundary componentName="Cart">
//                   <Cart />
//                 </ErrorBoundary>
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/profile"
//             element={
// export default App;



import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Gold from "./pages/Gold";
import Gift from "./pages/Gift";
import Contact from "./pages/Contact";
import Collections from "./pages/Collections";
import Profile from "./pages/Profile";
import Wedding from "./pages/Wedding";
import Diamond from "./pages/Diamond";
import Silver from "./pages/Silver";
import OrderSuccess from "./pages/OrderSuccess";
import Checkout from "./pages/Checkout";
import Platinum from "./pages/Platinum";
import Gemstone from "./pages/Gemstone";
import Shop from "./pages/Shop"; // You'll need to create this
import Wishlist from "./pages/Wishlist";
import Search from "./pages/Search";
import MyOrders from "./pages/MyOrders";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import AdminPromos from "./pages/AdminPromos";
import AdminUdari from "./pages/AdminUdari";
import AdminProductEdit from "./pages/AdminProductEdit";
import AdminBanners from "./pages/AdminBanners";
import AdminContacts from "./pages/AdminContacts";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";
import { Routes, Route, useLocation } from "react-router-dom";
import React, { useEffect } from "react";

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorComponent: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught in boundary:", error);
    console.error("Error component:", this.props.componentName);
    this.setState({ errorComponent: this.props.componentName });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', border: '2px solid #ff4444', margin: '20px', borderRadius: '10px', textAlign: 'center' }}>
          <h3 style={{ color: '#ff4444' }}>⚠️ Error Loading {this.state.errorComponent || 'Component'}</h3>
          <p>We're sorry, this component has encountered an error.</p>
          <button
            onClick={() => window.location.reload()}
            style={{ padding: '10px 20px', background: '#0d47a1', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <ScrollToTop />
          {!isAdminRoute && <Navbar />}

          <Routes>
            {/* PUBLIC ROUTES */}
            <Route path="/" element={
              <ErrorBoundary componentName="Home">
                <Home />
              </ErrorBoundary>
            } />

            <Route path="/gold" element={
              <ErrorBoundary componentName="Gold">
                <Gold />
              </ErrorBoundary>
            } />

            <Route path="/gift" element={
              <ErrorBoundary componentName="Gift">
                <Gift />
              </ErrorBoundary>
            } />

            <Route path="/contact" element={
              <ErrorBoundary componentName="Contact">
                <Contact />
              </ErrorBoundary>
            } />
            <Route path="/checkout" element={
              <ErrorBoundary componentName="Checkout">
                <Checkout />
              </ErrorBoundary>
            } />

            <Route path="/order-success" element={
              <ErrorBoundary componentName="OrderSuccess">
                <OrderSuccess />
              </ErrorBoundary>
            } />

            <Route path="/collections" element={
              <ErrorBoundary componentName="Collections">
                <Collections />
              </ErrorBoundary>
            } />

            <Route path="/collections/:category" element={
              <ErrorBoundary componentName="Collections">
                <Collections />
              </ErrorBoundary>
            } />
            <Route path="/shop" element={
              <ErrorBoundary componentName="Shop">
                <Shop />
              </ErrorBoundary>
            } />
            <Route path="/shop/:category" element={
              <ErrorBoundary componentName="Shop">
                <Shop />
              </ErrorBoundary>
            } />

            <Route path="/search" element={
              <ErrorBoundary componentName="Search">
                <Search />
              </ErrorBoundary>
            } />




            <Route path="/gemstone" element={
              <ErrorBoundary componentName="Gemstone">
                <Gemstone />
              </ErrorBoundary>
            } />

            <Route path="/wedding" element={
              <ErrorBoundary componentName="Wedding">
                <Wedding />
              </ErrorBoundary>
            } />

            <Route path="/wedding/:category" element={
              <ErrorBoundary componentName="Wedding">
                <Wedding />
              </ErrorBoundary>
            } />

            <Route path="/diamond" element={
              <ErrorBoundary componentName="Diamond">
                <Diamond />
              </ErrorBoundary>
            } />


            <Route path="/silver" element={
              <ErrorBoundary componentName="Silver">
                <Silver />
              </ErrorBoundary>
            } />
            <Route path="/platinum" element={
              <ErrorBoundary componentName="Platinum">
                <Platinum />
              </ErrorBoundary>
            } />

            <Route path="/diamond/:category" element={
              <ErrorBoundary componentName="Diamond">
                <Diamond />
              </ErrorBoundary>
            } />

            <Route path="/login" element={
              <ErrorBoundary componentName="Login">
                <Login />
              </ErrorBoundary>
            } />

            <Route path="/signup" element={
              <ErrorBoundary componentName="Signup">
                <Signup />
              </ErrorBoundary>
            } />

            {/* PROTECTED ROUTES */}
            <Route path="/cart" element={
              <ProtectedRoute>
                <ErrorBoundary componentName="Cart">
                  <Cart />
                </ErrorBoundary>
              </ProtectedRoute>
            } />

            <Route path="/orders" element={
              <ProtectedRoute>
                <div style={{ marginTop: '30px' }}>
                  <ErrorBoundary componentName="MyOrders">
                    <MyOrders />
                  </ErrorBoundary>
                </div>
              </ProtectedRoute>
            } />

            <Route path="/profile" element={
              <ProtectedRoute>
                <ErrorBoundary componentName="Profile">
                  <Profile />
                </ErrorBoundary>
              </ProtectedRoute>
            } />

            <Route path="/wishlist" element={
              <ProtectedRoute>
                <ErrorBoundary componentName="Wishlist">
                  <Wishlist />
                </ErrorBoundary>
              </ProtectedRoute>
            } />


            {/* ADMIN ROUTES */}
            <Route path="/admin" element={<AdminRoute />}>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="product/:id/edit" element={<AdminProductEdit />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="promos" element={<AdminPromos />} />
              <Route path="banners" element={<AdminBanners />} />
              <Route path="udari" element={<AdminUdari />} />
              <Route path="contacts" element={<AdminContacts />} />
            </Route>

            {/* 404 PAGE */}
            <Route path="*" element={
              <div style={{ padding: '60px 20px', textAlign: 'center', minHeight: '60vh' }}>
                <h1 style={{ fontSize: '4rem', color: '#0d47a1', marginBottom: '20px' }}>404</h1>
                <h2 style={{ marginBottom: '20px' }}>Page Not Found</h2>
                <p style={{ marginBottom: '30px', fontSize: '1.1rem', color: '#666' }}>
                  The page you're looking for doesn't exist or has been moved.
                </p>
                <button
                  onClick={() => window.history.back()}
                  style={{
                    padding: '12px 30px',
                    background: '#0d47a1',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '600'
                  }}
                >
                  Go Back
                </button>
                <div style={{ marginTop: '30px' }}>
                  <a href="/" style={{ color: '#0d47a1', textDecoration: 'underline' }}>
                    Return to Homepage
                  </a>
                </div>
              </div>
            } />
          </Routes>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;