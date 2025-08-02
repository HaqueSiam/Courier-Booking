// frontend/src/routes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

// Customer
import BookParcel from './pages/customer/BookParcel';
import MyParcels from './pages/customer/MyParcels';

// Admin
import Dashboard from './pages/admin/Dashboard';
import AssignParcel from './pages/admin/AssignParcel';
import Users from './pages/admin/Users';

// Agent
import UpdateParcel from './pages/agent/UpdateParcel';

import NotFound from './pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Customer Routes */}
      <Route path="/book" element={
        <ProtectedRoute roles={['customer']}>
          <BookParcel />
        </ProtectedRoute>
      } />
      <Route path="/my-parcels" element={
        <ProtectedRoute roles={['customer']}>
          <MyParcels />
        </ProtectedRoute>
      } />

      {/* Admin Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute roles={['admin']}>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/assign-parcel" element={
        <ProtectedRoute roles={['admin']}>
          <AssignParcel />
        </ProtectedRoute>
      } />
      <Route path="/users" element={
        <ProtectedRoute roles={['admin']}>
          <Users />
        </ProtectedRoute>
      } />

      {/* Agent Routes */}
      <Route path="/update-parcel" element={
        <ProtectedRoute roles={['agent']}>
          <UpdateParcel />
        </ProtectedRoute>
      } />

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
