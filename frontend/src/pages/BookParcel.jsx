// frontend/src/pages/BookParcel.jsx
import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const parcelTypes = ["Fragile", "Solid", "Liquid"];
const parcelSizes = ["Small", "Medium", "Big"];
const paymentTypes = ["Cash on Delivery", "Prepaid"];

const BookParcel = () => {
  const { user, token } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    parcelName: "",
    pickupAddress: "",
    deliveryAddress: "",
    parcelType: parcelTypes[0],
    parcelSize: parcelSizes[0],
    paymentType: paymentTypes[0],
  });

  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
    setSuccessMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.parcelName.trim() ||
      !formData.pickupAddress.trim() ||
      !formData.deliveryAddress.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      const payload = {
        parcelName: formData.parcelName.trim(),
        pickupAddress: formData.pickupAddress.trim(),
        deliveryAddress: formData.deliveryAddress.trim(),
        parcelType: formData.parcelType,
        parcelSize: formData.parcelSize,
        paymentType: formData.paymentType,
        timestamp: new Date().toISOString(),
        assignedTo: null, // initially null
        status: "", // initially empty
        customerId: user.id,
      };

      await axios.post("/api/bookings", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccessMsg("Parcel booked successfully.");
      setFormData({
        parcelName: "",
        pickupAddress: "",
        deliveryAddress: "",
        parcelType: parcelTypes[0],
        parcelSize: parcelSizes[0],
        paymentType: paymentTypes[0],
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to book parcel.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow-md border border-gray-200 mt-10">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
        Book a Parcel
      </h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 mb-4 rounded text-center font-medium">
          {error}
        </div>
      )}

      {successMsg && (
        <div className="bg-green-100 text-green-700 p-3 mb-4 rounded text-center font-medium">
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="parcelName"
            className="block mb-1 font-medium text-gray-700"
          >
            Parcel Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="parcelName"
            name="parcelName"
            value={formData.parcelName}
            onChange={handleChange}
            placeholder="Unique parcel name"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label
            htmlFor="pickupAddress"
            className="block mb-1 font-medium text-gray-700"
          >
            Pickup Address <span className="text-red-500">*</span>
          </label>
          <textarea
            id="pickupAddress"
            name="pickupAddress"
            value={formData.pickupAddress}
            onChange={handleChange}
            placeholder="Enter pickup address"
            rows={2}
            className="w-full border border-gray-300 rounded px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          ></textarea>
        </div>

        <div>
          <label
            htmlFor="deliveryAddress"
            className="block mb-1 font-medium text-gray-700"
          >
            Delivery Address <span className="text-red-500">*</span>
          </label>
          <textarea
            id="deliveryAddress"
            name="deliveryAddress"
            value={formData.deliveryAddress}
            onChange={handleChange}
            placeholder="Enter delivery address"
            rows={2}
            className="w-full border border-gray-300 rounded px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          ></textarea>
        </div>

        <div>
          <label
            htmlFor="parcelType"
            className="block mb-1 font-medium text-gray-700"
          >
            Parcel Type
          </label>
          <select
            id="parcelType"
            name="parcelType"
            value={formData.parcelType}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {parcelTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="parcelSize"
            className="block mb-1 font-medium text-gray-700"
          >
            Parcel Size
          </label>
          <select
            id="parcelSize"
            name="parcelSize"
            value={formData.parcelSize}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {parcelSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="paymentType"
            className="block mb-1 font-medium text-gray-700"
          >
            Payment Type
          </label>
          <select
            id="paymentType"
            name="paymentType"
            value={formData.paymentType}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {paymentTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded text-white font-semibold ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          } transition-colors`}
        >
          {loading ? "Booking..." : "Book Parcel"}
        </button>
      </form>
    </div>
  );
};

export default BookParcel;