// frontend/src/pages/Dashboard/CustomerDashboard.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const CustomerDashboard = () => {
  const { user, token } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBookings = async () => {
    if (!user) return;
    setLoading(true);
    setError("");
    try {
      // Assuming API to fetch bookings of logged-in customer
      const res = await axios.get(`/api/customer/bookings/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data.bookings || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        My Bookings
      </h1>

      {loading && (
        <p className="text-center text-gray-500">Loading your bookings...</p>
      )}
      {error && (
        <p className="text-center text-red-600 font-medium">{error}</p>
      )}

      {!loading && !error && bookings.length === 0 && (
        <p className="text-center text-gray-600 italic">No bookings found.</p>
      )}

      {!loading && !error && bookings.length > 0 && (
        <div className="overflow-x-auto border border-gray-200 rounded shadow-sm">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-3 text-left text-gray-700 font-semibold">
                  Parcel Name
                </th>
                <th className="border px-4 py-3 text-left text-gray-700 font-semibold">
                  Pickup Address
                </th>
                <th className="border px-4 py-3 text-left text-gray-700 font-semibold">
                  Delivery Address
                </th>
                <th className="border px-4 py-3 text-left text-gray-700 font-semibold">
                  Assigned To
                </th>
                <th className="border px-4 py-3 text-left text-gray-700 font-semibold">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => {
                const assignedTo = booking.agent
                  ? `${booking.agent.name} (${booking.agent.phone})`
                  : "Not assigned yet";

                const status = booking.status
                  ? booking.status
                  : "Not assigned yet";

                return (
                  <tr
                    key={booking._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="border px-4 py-3">{booking.parcelName}</td>
                    <td className="border px-4 py-3">{booking.pickupAddress}</td>
                    <td className="border px-4 py-3">{booking.deliveryAddress}</td>
                    <td className="border px-4 py-3">{assignedTo}</td>
                    <td className="border px-4 py-3 capitalize">{status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;
