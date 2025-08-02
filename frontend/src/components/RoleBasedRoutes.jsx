import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

// Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

// Customer Pages
import BookParcel from "../pages/customer/BookParcel";
import MyParcels from "../pages/customer/MyParcels";

// Admin Pages
import Dashboard from "../pages/admin/Dashboard";
import AssignParcel from "../pages/admin/AssignParcel";
import Users from "../pages/admin/Users";

// Agent Pages
import UpdateParcel from "../pages/agent/UpdateParcel";

// Common Pages
import TrackParcel from "../pages/TrackParcel";
import NotFound from "../pages/NotFound";

const RoleBasedRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Customer Routes */}
      <Route
        path="/book"
        element={
          <ProtectedRoute roles={["customer"]}>
            <BookParcel />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-parcels"
        element={
          <ProtectedRoute roles={["customer"]}>
            <MyParcels />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute roles={["admin"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/assign"
        element={
          <ProtectedRoute roles={["admin"]}>
            <AssignParcel />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute roles={["admin"]}>
            <Users />
          </ProtectedRoute>
        }
      />

      {/* Agent Routes */}
      <Route
        path="/agent/update"
        element={
          <ProtectedRoute roles={["agent"]}>
            <UpdateParcel />
          </ProtectedRoute>
        }
      />

      {/* Common */}
      <Route path="/track/:id" element={<TrackParcel />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoleBasedRoutes;
