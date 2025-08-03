// frontend/src/pages/Home.jsx
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
const Home = () => {
  const { user, token } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filteredBookings, setFilteredBookings] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchBookings = async () => {
      try {
        let url = "";
        if (user.role === "customer") {
          url = `${API_URL}/api/bookings/my-bookings`;
        } else if (user.role === "admin") {
          url = `${API_URL}/api/admin/dashboard`;
        } else if (user.role === "agent") {
          url = `${API_URL}/api/agent/assigned-parcels`;
        }

        if (!url) return;

        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(response.data);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
    };

    fetchBookings();
  }, [user, token]);

  // For Admin filtering by status
  useEffect(() => {
    if (user?.role !== "admin") {
      setFilteredBookings(bookings);
      return;
    }
    if (filterStatus === "all") {
      setFilteredBookings(bookings);
    } else {
      setFilteredBookings(
        bookings.filter(
          (b) =>
            b.status &&
            b.status.toLowerCase() === filterStatus.toLowerCase()
        )
      );
    }
  }, [filterStatus, bookings, user]);

  // Pre-login view
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <h1 className="text-4xl font-semibold mb-6">Welcome to Courier Express</h1>
        <p className="mb-6 text-lg text-gray-700">
          Your trusted courier and parcel booking service.
        </p>
        <img
          src="home.jpg"
          alt="Courier Delivery"
          className="mx-auto w-[800px]  rounded-lg shadow-lg"
        />
      </div>
    );
  }

  // Customer Home: Show all bookings for customer
  if (user.role === "customer") {
    return (
      <div className="container mx-auto px-6 py-8">
        <h2 className="text-3xl font-semibold mb-6">My Bookings</h2>
        {bookings.length === 0 ? (
          <p className="text-gray-600">You have no bookings yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Parcel Name</th>
                  <th className="py-3 px-4 text-left">Pickup Address</th>
                  <th className="py-3 px-4 text-left">Delivery Address</th>
                  <th className="py-3 px-4 text-left">Assigned To</th>
                  <th className="py-3 px-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr
                    key={b._id}
                    className="border-b even:bg-gray-50 hover:bg-gray-100"
                  >
                    <td className="py-3 px-4">{b.parcelName}</td>
                    <td className="py-3 px-4">{b.pickupAddress}</td>
                    <td className="py-3 px-4">{b.deliveryAddress}</td>
                    <td className="py-3 px-4">
                      {b.assignedTo
                        ? `${b.assignedTo.name} (${b.assignedTo.phone})`
                        : "Not assigned yet"}
                    </td>
                    <td className="py-3 px-4 font-medium">
                      {b.status ? b.status : "Not assigned yet"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  // Admin Home: Dashboard with filter and bookings assigned to any Agent
  if (user.role === "admin") {
    return (
      <div className="container mx-auto px-6 py-8">
        <h2 className="text-3xl font-semibold mb-6">Dashboard</h2>
        <div className="mb-4">
          <label
            htmlFor="statusFilter"
            className="mr-3 font-medium text-gray-700"
          >
            Filter by Status:
          </label>
          <select
            id="statusFilter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All</option>
            <option value="Picked Up">Picked Up</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
            <option value="Failed">Failed</option>
          </select>
        </div>
        {filteredBookings.length === 0 ? (
          <p className="text-center text-gray-600">No bookings found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Parcel Name</th>
                  <th className="py-3 px-4 text-left">Customer ID</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Agent ID</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((b) => (
                  <tr
                    key={b._id}
                    className="border-b even:bg-gray-50 hover:bg-gray-100"
                  >
                    <td className="py-3 px-4">{b.parcelName}</td>
                    <td className="py-3 px-4">{b.bookedBy._id}</td>
                    <td className="py-3 px-4">{b.status || "Not assigned yet"}</td>
                    <td className="py-3 px-4">{b.assignedTo?._id || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  // Agent Home: Show a simple welcome message or link to update parcel page
  if (user.role === "agent") {
    return (
      <div className="container mx-auto px-6 py-10 text-center">
        <h2 className="text-3xl font-semibold mb-6">Welcome, {user.name}</h2>
        <p className="text-gray-700 mb-6">
          Please navigate to <strong>Update Parcel</strong> page to manage your assigned parcels.
        </p>
      </div>
    );
  }

  return null;
};

export default Home;