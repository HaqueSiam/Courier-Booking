// frontend/src/App.jsx
import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookParcel from "./pages/BookParcel";
import Dashboard from "./pages/Dashboard/AdminDashboard";
import AssignParcel from "./pages/AssignParcel";
import Users from "./pages/Users";
import UpdateParcel from "./pages/UpdateParcel";
import NotFound from "./pages/NotFound";

import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);

  const RedirectIfLoggedIn = ({ children }) => {
    if (user) {
      if (user.role === "admin") return <Navigate to="/dashboard" replace />;
      if (user.role === "agent") return <Navigate to="/update-parcel" replace />;
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row">
          {user && <Sidebar />}
          <main className="flex-1">
            <Routes>
              {/* Public Routes */}
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

              {/* Customer Routes */}
              <Route
                path="/book-parcel"
                element={
                  <ProtectedRoute roles={["customer"]}>
                    <BookParcel />
                  </ProtectedRoute>
                }
              />

              {/* Admin Routes */}
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

              {/* Agent Routes */}
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
      </div>
    </div>
  );
}

export default App;