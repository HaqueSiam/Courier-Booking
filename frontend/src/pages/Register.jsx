// === File: client/src/pages/Register.jsx ===
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Customer',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle input changes with trimming start whitespace
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.replace(/^\s+/, ''), // trim leading spaces while typing
    }));
  };

  // Simple email validation regex
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Trim all inputs fully before validation
    const trimmedData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password.trim(),
      role: formData.role,
    };

    // Basic validation
    if (!trimmedData.name || !trimmedData.email || !trimmedData.password) {
      setError('Please fill in all fields.');
      return;
    }
    if (!validateEmail(trimmedData.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (trimmedData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, trimmedData);
      if (response.status === 201) {
        setSuccess('Registration successful! Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-md shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
        Register for Courier & Parcel System
      </h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4" role="alert">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 text-green-700 p-3 rounded mb-4" role="alert">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block font-semibold mb-1">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Full name"
            required
            autoComplete="name"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block font-semibold mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="you@example.com"
            required
            autoComplete="email"
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block font-semibold mb-1">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="At least 6 characters"
            required
            minLength={6}
            autoComplete="new-password"
          />
        </div>

        {/* Role */}
        <div>
          <label htmlFor="role" className="block font-semibold mb-1">
            Select Role
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="Customer">Customer</option>
            <option value="Agent">Agent</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-colors"
        >
          Register
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login here
        </Link>
      </p>
    </div>
  );
}
