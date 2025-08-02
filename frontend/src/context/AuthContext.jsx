// frontend/src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";

// Create the AuthContext
export const AuthContext = createContext();

// Provider component to wrap app and provide auth state
export const AuthProvider = ({ children }) => {
  // State for user info and auth token
  const [user, setUser] = useState(null); // { id, name, role, phone, ... }
  const [token, setToken] = useState(null);

  // Load auth info from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  // Save auth info to localStorage whenever user or token changes
  useEffect(() => {
    if (user && token) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
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
