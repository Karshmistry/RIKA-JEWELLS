// // import React, { createContext, useState, useEffect } from "react";

// // export const CartContext = createContext();

// // export const CartProvider = ({ children }) => {
// //   const [cart, setCart] = useState([]);

// //   // Load cart from localStorage
// //   useEffect(() => {
// //     const savedCart = JSON.parse(localStorage.getItem("cart"));
// //     if (savedCart) setCart(savedCart);
// //   }, []);

// //   // Save cart to localStorage
// //   useEffect(() => {
// //     localStorage.setItem("cart", JSON.stringify(cart));
// //   }, [cart]);

// //   const addToCart = (product) => {
// //     setCart((prevCart) => [...prevCart, product]);
// //   };

// //   return (
// //     <CartContext.Provider value={{ cart, setCart, addToCart }}>
// //       {children}
// //     </CartContext.Provider>
// //   );
// // };


// import React, { createContext, useState, useEffect } from "react";

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);

//   // Load from localStorage
//   useEffect(() => {
//     const savedCart = JSON.parse(localStorage.getItem("cart"));
//     if (savedCart) setCart(savedCart);
//   }, []);

//   // Save to localStorage
//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   const addToCart = (product) => {
//     setCart([...cart, product]);
//   };

//   const removeFromCart = (index) => {
//     const newCart = [...cart];
//     newCart.splice(index, 1);
//     setCart(newCart);
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };



import React, { createContext, useState, useEffect, useContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(Array.isArray(parsedCart) ? parsedCart : []);
      } catch (error) {
        console.error("Error parsing cart:", error);
        localStorage.removeItem("cart");
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prevCart => [...prevCart, product]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const updateQuantity = (index, newQuantity) => {
    const newCart = [...cart];
    newCart[index] = {
      ...newCart[index],
      quantity: newQuantity
    };
    setCart(newCart);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      return total + (item.price * (item.quantity || 1));
    }, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => {
      return count + (item.quantity || 1);
    }, 0);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity,
    getCartTotal,
    getCartCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Optional: Create a useCart hook for consistency
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};