// frontend/src/routes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

// Customer Pages
import BookParcel from './pages/BookParcel';

// Admin Pages
import Dashboard from './pages/Dashboard/AdminDashboard';
import AssignParcel from './pages/AssignParcel';
import Users from './pages/Users';

// Agent Page
import UpdateParcel from './pages/UpdateParcel';

import NotFound from './pages/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Customer Routes */}
      <Route path="/book-parcel" element={
        <ProtectedRoute roles={['customer']}>
          <BookParcel />
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
};

export default AppRoutes;