// frontend/src/components/RoleBasedRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// Pages
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';

// Customer Pages
import BookParcel from '../pages/BookParcel';

// Admin Pages
import Dashboard from '../pages/Dashboard/AdminDashboard';
import AssignParcel from '../pages/AssignParcel';
import Users from '../pages/Users';

// Agent Page
import UpdateParcel from '../pages/UpdateParcel';

import NotFound from '../pages/NotFound';

const RoleBasedRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Customer Routes */}
      <Route
        path="/book-parcel"
        element={
          <ProtectedRoute roles={['customer']}>
            <BookParcel />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute roles={['admin']}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/assign-parcel"
        element={
          <ProtectedRoute roles={['admin']}>
            <AssignParcel />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute roles={['admin']}>
            <Users />
          </ProtectedRoute>
        }
      />

      {/* Agent Routes */}
      <Route
        path="/update-parcel"
        element={
          <ProtectedRoute roles={['agent']}>
            <UpdateParcel />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoleBasedRoutes;