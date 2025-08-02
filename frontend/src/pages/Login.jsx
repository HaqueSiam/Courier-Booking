import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.replace(/^\s+/, ''), // trim leading whitespace
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { email, password } = {
      email: formData.email.trim(),
      password: formData.password.trim(),
    };

    if (!email || !password) {
      setError('Email and password are required.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });

      const { token, role } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ email, role }));

      // Redirect based on role
      if (role === 'Admin') navigate('/dashboard');
      else if (role === 'Customer') navigate('/my-parcels');
      else if (role === 'Agent') navigate('/assigned');
      else navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-md shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Login</h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
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
            placeholder="Enter your password"
            required
            autoComplete="current-password"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-colors ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Don’t have an account?{' '}
        <Link to="/register" className="text-blue-600 hover:underline">
          Register here
        </Link>
      </p>
    </div>
  );
}
