import React, { useState } from 'react';
import axios from 'axios';

export default function BookParcel() {
  const [formData, setFormData] = useState({
    pickupAddress: '',
    deliveryAddress: '',
    type: '',
    size: '',
    cod: false,
  });

  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:5000/api/parcels/book',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage({ type: 'success', text: res.data.message });
      setFormData({
        pickupAddress: '',
        deliveryAddress: '',
        type: '',
        size: '',
        cod: false,
      });
    } catch (err) {
      const error = err.response?.data?.error || 'Booking failed';
      setMessage({ type: 'error', text: error });
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">📦 Book a Parcel</h2>

      {message && (
        <div
          className={`mb-4 p-3 rounded ${
            message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md p-6 rounded-md border">
        <div>
          <label className="block font-medium">Pickup Address</label>
          <input
            type="text"
            name="pickupAddress"
            value={formData.pickupAddress}
            onChange={handleChange}
            required
            className="w-full border rounded p-2 mt-1"
          />
        </div>

        <div>
          <label className="block font-medium">Delivery Address</label>
          <input
            type="text"
            name="deliveryAddress"
            value={formData.deliveryAddress}
            onChange={handleChange}
            required
            className="w-full border rounded p-2 mt-1"
          />
        </div>

        <div>
          <label className="block font-medium">Parcel Type</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            placeholder="e.g., Document, Box"
            className="w-full border rounded p-2 mt-1"
          />
        </div>

        <div>
          <label className="block font-medium">Parcel Size</label>
          <input
            type="text"
            name="size"
            value={formData.size}
            onChange={handleChange}
            required
            placeholder="e.g., Small, Medium, Large"
            className="w-full border rounded p-2 mt-1"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="cod"
            checked={formData.cod}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="font-medium">Cash on Delivery (COD)</label>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Submit Booking
        </button>
      </form>
    </div>
  );
}
