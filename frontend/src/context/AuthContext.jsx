// frontend/src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

// Create the AuthContext
export const AuthContext = createContext();

// Provider component to wrap app and provide auth state
export const AuthProvider = ({ children }) => {
  // State for user info and auth token
  const [user, setUser] = useState(null); // { id, name, role, phone, ... }
  const [token, setToken] = useState(null);

  // Load auth info from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      }
    } catch (error) {
      console.error("Failed to load auth data from localStorage", error);
    }
  }, []);

  // Save auth info to localStorage whenever user or token changes
  useEffect(() => {
    try {
      if (user && token) {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("Failed to save auth data to localStorage", error);
    }
  }, [user, token]);

  // Login function to set user and token
  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
  };

  // Logout function clears state and localStorage
  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
