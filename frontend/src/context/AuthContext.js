import React, { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const login = async ({ email, password }) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        const userData = { ...data.user, token: data.token }; // proper user data from backend
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: error.message };
    }
  };

  const signup = async ({ email, password, name, phone }) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name, phone }),
      });

      const data = await response.json();

      if (data.success) {
        const userData = { ...data.user, token: data.token };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Signup error:", error);
      return { success: false, message: error.message };
    }
  };

  const updateProfile = async (updatedData) => {
    try {
      // If we have a token, we could call the backend here
      // const response = await fetch('/api/users/profile', {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${user.token}`
      //   },
      //   body: JSON.stringify(updatedData),
      // });
      // const data = await response.json();

      // For now, update local state and storage
      const updatedUser = { ...user, ...updatedData };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return { success: true };
    } catch (error) {
      console.error("Update profile error:", error);
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = {
    user,
    login,
    signup,
    logout,
    updateProfile,
    loading,
    isAuthenticated: !!user,
    isAdmin: user && (user.role === 'admin' || user.isAdmin === true || user.isAdmin === "true")
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};