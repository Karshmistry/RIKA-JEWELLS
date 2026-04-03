import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Profile.css";

function Profile() {
  const { user, updateProfile, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "", type: "success" });

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: "", type: "success" }), 3000);
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    anniversary: "",
    preferredJewelryStyle: "Classic",
    metalPreference: "Gold",
    ringSize: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "India"
    }
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || user.name?.split(' ')[0] || "",
        lastName: user.lastName || user.name?.split(' ').slice(1).join(' ') || "",
        email: user.email || "",
        phone: user.phone || "",
        dateOfBirth: user.dateOfBirth || "",
        anniversary: user.anniversary || "",
        preferredJewelryStyle: user.preferredJewelryStyle || "Classic",
        metalPreference: user.metalPreference || "Gold",
        ringSize: user.ringSize || "",
        address: user.address || {
          street: "",
          city: "",
          state: "",
          zipCode: "",
          country: "India"
        }
      });
    }
  }, [user]);

  const jewelryStyles = [
    "Classic", "Modern", "Vintage", "Minimalist",
    "Bohemian", "Art Deco", "Traditional", "Contemporary"
  ];

  const metalPreferences = [
    "Gold", "White Gold", "Rose Gold", "Platinum",
    "Silver", "Palladium", "Titanium"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    const field = name.split('.')[1];
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await updateProfile(formData);
      if (result.success) {
        setIsEditing(false);
        showNotification("Profile updated successfully!");
      } else {
        showNotification(result.message || "Failed to update profile.", "error");
      }
    } catch (error) {
      showNotification("An unexpected error occurred.", "error");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) {
    return (
      <div className="profile-container">
        {notification.show && (
          <div className={`cart-notification ${notification.type}`}>
            {notification.message}
          </div>
        )}
        <div className="login-prompt">
          <h2>Access Your Profile</h2>
          <p>Please log in to view and manage your jewelry preferences, orders, and more.</p>
          <button className="btn-primary" onClick={() => navigate("/login")}>
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      {notification.show && (
        <div className={`cart-notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
      <div className="profile-header">
        <h1>My Jewelry Profile</h1>
        <div className="loyalty-badge">
          <span className="badge-icon">💎</span>
          <div>
            <h3>Loyalty Points</h3>
            <p className="points">1,500</p>
            <small>Gold Member</small>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        {user.role === 'admin' && (
          <div className="stat-card admin-card" onClick={() => navigate("/admin")}>
            <div className="stat-icon">⚡</div>
            <div className="stat-content">
              <h3>Admin Power</h3>
              <p className="stat-number">Dashboard</p>
              <small>Manage Store & Orders</small>
            </div>
          </div>
        )}
        <div className="stat-card">
          <div className="stat-icon">🛍️</div>
          <div className="stat-content">
            <h3>Total Orders</h3>
            <p className="stat-number">12</p>
            <small onClick={() => navigate("/my-orders")} style={{ cursor: 'pointer' }}>View Order History</small>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✨</div>
          <div className="stat-content">
            <h3>Your Wishlist</h3>
            <p className="stat-number">5</p>
            <small>Treasures Saved</small>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💎</div>
          <div className="stat-content">
            <h3>Total Spent</h3>
            <p className="stat-number">₹1.2L</p>
            <small>Exclusive Investment</small>
          </div>
        </div>
      </div>

      <div className="profile-section">
        <div className="section-header">
          <h2>Personal Information</h2>
          {!isEditing && (
            <button className="btn-edit" onClick={() => setIsEditing(true)}>Edit Profile</button>
          )}
        </div>

        {isEditing ? (
          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  readOnly
                  className="readonly-input"
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Anniversary</label>
                <input
                  type="date"
                  name="anniversary"
                  value={formData.anniversary}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="section-divider"></div>
            <h3>Jewelry Preferences</h3>

            <div className="form-row">
              <div className="form-group">
                <label>Preferred Style</label>
                <select
                  name="preferredJewelryStyle"
                  value={formData.preferredJewelryStyle}
                  onChange={handleInputChange}
                >
                  {jewelryStyles.map(style => (
                    <option key={style} value={style}>{style}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Metal Preference</label>
                <select
                  name="metalPreference"
                  value={formData.metalPreference}
                  onChange={handleInputChange}
                >
                  {metalPreferences.map(metal => (
                    <option key={metal} value={metal}>{metal}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Ring Size (US/IN)</label>
                <input
                  type="text"
                  name="ringSize"
                  placeholder="e.g. 7"
                  value={formData.ringSize}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="section-divider"></div>
            <h3>Shipping Address</h3>

            <div className="form-group">
              <label>Street Address</label>
              <input
                type="text"
                name="address.street"
                value={formData.address.street}
                onChange={handleAddressChange}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleAddressChange}
                />
              </div>
              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  name="address.state"
                  value={formData.address.state}
                  onChange={handleAddressChange}
                />
              </div>
              <div className="form-group">
                <label>ZIP Code</label>
                <input
                  type="text"
                  name="address.zipCode"
                  value={formData.address.zipCode}
                  onChange={handleAddressChange}
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">Save Profile</button>
              <button type="button" className="btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </form>
        ) : (
          <div className="profile-info">
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Full Name</span>
                <span className="info-value">{formData.firstName} {formData.lastName}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email</span>
                <span className="info-value">{formData.email}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Phone</span>
                <span className="info-value">{formData.phone || "Not provided"}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Style Preference</span>
                <span className="info-value">{formData.preferredJewelryStyle}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Metal Preference</span>
                <span className="info-value">{formData.metalPreference}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Ring Size</span>
                <span className="info-value">{formData.ringSize || "Unknown"}</span>
              </div>
            </div>

            <div className="address-section">
              <h3>Shipping Address</h3>
              <div className="address-display">
                {formData.address.street ? (
                  <>
                    <p>{formData.address.street}</p>
                    <p>{formData.address.city}, {formData.address.state} {formData.address.zipCode}</p>
                    <p>{formData.address.country}</p>
                  </>
                ) : (
                  <p className="no-data">No address provided yet.</p>
                )}
              </div>
            </div>

            <div className="profile-actions">
              <button className="btn-secondary" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;