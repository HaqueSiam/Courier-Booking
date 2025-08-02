// === File: client/src/components/ProtectedRoute.jsx ===
import React from 'react';
import { Navigate } from 'react-router-dom';

const fakeAuth = {
  user: JSON.parse(localStorage.getItem('user')),
  isAuthenticated: () => !!localStorage.getItem('token'),
  hasRole: (roles) => roles.includes(JSON.parse(localStorage.getItem('user'))?.role),
};

export default function ProtectedRoute({ children, roles }) {
  if (!fakeAuth.isAuthenticated()) return <Navigate to="/login" />;
  if (!fakeAuth.hasRole(roles)) return <Navigate to="/" />;
  return children;
}