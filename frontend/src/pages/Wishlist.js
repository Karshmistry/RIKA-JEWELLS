import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { CartContext } from '../context/CartContext';
import './Wishlist.css';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  // Using contextual cart integration
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    // Add product with a default quantity of 1 for the cart context
    addToCart({ ...product, quantity: 1 });
    alert(`Luxurious ${product.name} added to your collection cart.`);
  };

  return (
    <div className="wishlist-container">
      <div className="wishlist-header">
        <h1>Your Wishlist</h1>
        <p>Curated masterpieces saved for your consideration.</p>
      </div>

      {wishlist.length === 0 ? (
        <div className="wishlist-empty">
          <h2>Your Wishlist is Empty</h2>
          <p>Discover our exclusive collections and save your favorite pieces here.</p>
          <button className="continue-shopping-btn" onClick={() => navigate('/shop')}>
            Explore The Collection
          </button>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((item) => (
            <div key={item.id} className="wishlist-card">
              <button 
                className="remove-wishlist-btn"
                onClick={() => removeFromWishlist(item.id)}
                title="Remove from Wishlist"
              >
                ✕
              </button>
              
              <div className="wishlist-image-container">
                <img src={item.image} alt={item.name} className="wishlist-image" />
              </div>
              
              <div className="wishlist-info">
                <h3 className="wishlist-title" title={item.name}>{item.name}</h3>
                
                <div className="wishlist-price-container">
                  <span className="wishlist-price">₹{item.price.toLocaleString()}</span>
                  {item.originalPrice && (
                    <span className="wishlist-original-price">₹{item.originalPrice.toLocaleString()}</span>
                  )}
                </div>
                
                <button 
                  className="add-to-cart-full-btn"
                  onClick={() => handleAddToCart(item)}
                >
                  Acquire Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
