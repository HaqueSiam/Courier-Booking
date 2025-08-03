// frontend/src/pages/Dashboard/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const STATUS_OPTIONS = ["All", "Picked Up", "In Transit", "Delivered", "Failed"];

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBookings = async () => {
    setLoading(true);
    setError("");
    
  
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/api/admin/dashboard`, { // Remove the "?ALL" from URL
      headers: { Authorization: `Bearer ${token}` },
      params: { status: 'All' } // Send as query parameter instead
    }); 
      setBookings(res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Filter bookings by status
  const filteredBookings =
    filterStatus === "All"
      ? bookings
      : bookings.filter(
          (b) => b.status?.toLowerCase() === filterStatus.toLowerCase()
        );

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Admin Dashboard</h1>

      {/* Filter */}
      <div className="mb-6 flex items-center space-x-4">
        <label
          htmlFor="statusFilter"
          className="font-medium text-gray-700"
        >
          Filter by Status:
        </label>
        <select
          id="statusFilter"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {loading && (
        <p className="text-center text-gray-500">Loading bookings...</p>
      )}
      {error && (
        <p className="text-center text-red-600 font-medium">{error}</p>
      )}

      {!loading && !error && (
        <div className="overflow-x-auto border border-gray-200 rounded shadow-sm">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-3 text-left text-gray-700 font-semibold">
                  Parcel Name
                </th>
                <th className="border px-4 py-3 text-left text-gray-700 font-semibold">
                  Booking ID (Customer ID)
                </th>
                <th className="border px-4 py-3 text-left text-gray-700 font-semibold">
                  Status
                </th>
                <th className="border px-4 py-3 text-left text-gray-700 font-semibold">
                  Agent ID
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-6 text-gray-500 italic"
                  >
                    No bookings found.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="border px-4 py-3">{booking.parcelName}</td>
                    <td className="border px-4 py-3">{booking.customerId}</td>
                    <td className="border px-4 py-3 capitalize">{booking.status || "Not Assigned"}</td>
                    <td className="border px-4 py-3">{booking.agentId || "N/A"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
