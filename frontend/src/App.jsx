// === File: client/src/App.jsx ===
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/admin/Dashboard';
import BookParcel from './pages/customer/BookParcel';
import MyParcels from './pages/customer/MyParcels';
import AssignedParcels from './pages/agent/AssignedParcels';
import TrackParcel from './pages/TrackParcel';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <ProtectedRoute roles={['admin']}>
            <Dashboard />
          </ProtectedRoute>
        } />
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
        <Route path="/assigned" element={
          <ProtectedRoute roles={['agent']}>
            <AssignedParcels />
          </ProtectedRoute>
        } />
        <Route path="/track/:id" element={<TrackParcel />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;