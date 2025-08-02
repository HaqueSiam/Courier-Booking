// frontend/src/App.jsx
import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Customer Pages
import CustomerHome from "./pages/Dashboard/CustomerDashboard"; // renamed for clarity
import BookParcel from "./pages/BookParcel";

// Admin Pages
import Dashboard from "./pages/Dashboard/AdminDashboard";
import AssignParcel from "./pages/AssignParcel";
import Users from "./pages/Users";

// Agent Page
import UpdateParcel from "./pages/UpdateParcel";

import NotFound from "./pages/NotFound";

import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);

  // Redirect logged-in users trying to access login/register back to their role-based home
  const RedirectIfLoggedIn = ({ children }) => {
    if (user) {
      if (user.role === "admin") return <Navigate to="/dashboard" replace />;
      if (user.role === "agent") return <Navigate to="/update-parcel" replace />;
      if (user.role === "customer") return <Navigate to="/customer-home" replace />;
    }
    return children;
  };

  return (
    <div
      className="app-container"
      style={{
        padding: "1.5rem 2rem",
        margin: "0 auto",
        maxWidth: "1200px",
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />
      <main style={{ flexGrow: 1 }}>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <RedirectIfLoggedIn>
                <Login />
              </RedirectIfLoggedIn>
            }
          />
          <Route
            path="/register"
            element={
              <RedirectIfLoggedIn>
                <Register />
              </RedirectIfLoggedIn>
            }
          />

          {/* Customer */}
          <Route
            path="/customer-home"
            element={
              <ProtectedRoute roles={["customer"]}>
                <CustomerHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/book-parcel"
            element={
              <ProtectedRoute roles={["customer"]}>
                <BookParcel />
              </ProtectedRoute>
            }
          />

          {/* Admin */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute roles={["admin"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/assign-parcel"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AssignParcel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute roles={["admin"]}>
                <Users />
              </ProtectedRoute>
            }
          />

          {/* Agent */}
          <Route
            path="/update-parcel"
            element={
              <ProtectedRoute roles={["agent"]}>
                <UpdateParcel />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
