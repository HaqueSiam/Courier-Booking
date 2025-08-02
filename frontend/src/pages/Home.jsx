// === File: client/src/components/ParcelForm.jsx ===
import React, { useState } from 'react';

export default function ParcelForm() {
  const [form, setForm] = useState({
    pickupAddress: '',
    deliveryAddress: '',
    type: '',
    size: '',
    cod: false,
  });

  const handleChange = (e) => {
    const { name, value, type: inputType, checked } = e.target;
    setForm({
      ...form,
      [name]: inputType === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Parcel booked:', form);
    // Add API call here
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-700">
          📦 Book a Parcel
        </h2>

        <input
          type="text"
          name="pickupAddress"
          placeholder="Pickup Address"
          value={form.pickupAddress}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="text"
          name="deliveryAddress"
          placeholder="Delivery Address"
          value={form.deliveryAddress}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="text"
          name="type"
          placeholder="Parcel Type (e.g., Documents, Electronics)"
          value={form.type}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="text"
          name="size"
          placeholder="Parcel Size (e.g., Small, Medium, Large)"
          value={form.size}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <label className="flex items-center space-x-2 text-gray-700">
          <input
            type="checkbox"
            name="cod"
            checked={form.cod}
            onChange={handleChange}
            className="h-4 w-4 accent-indigo-600"
          />
          <span>Cash On Delivery (COD)</span>
        </label>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
