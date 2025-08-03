// frontend/src/pages/Users.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
const API_URL = import.meta.env.VITE_API_URL;

const Users = () => {
  const { token } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${API_URL}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow-md border border-gray-200 mt-10">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Users & Booking History</h1>

      {loading && (
        <p className="text-center text-gray-600">Loading users...</p>
      )}

      {error && (
        <div className="bg-red-100 text-red-700 p-3 mb-4 rounded text-center font-medium">
          {error}
        </div>
      )}

      {!loading && users.length === 0 && (
        <p className="text-center text-gray-600">No users found.</p>
      )}

      {!loading && users.length > 0 && (
        <div className="space-y-8">
          {users.map((user) => (
            <div
              key={user._id}
              className="border border-gray-300 rounded p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                {user.name} (ID: {user._id})
              </h2>
              <p className="mb-2 text-gray-600">Role: {user.role}</p>

              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Booking History:</h3>
                {user.bookings && user.bookings.length > 0 ? (
                  <table className="w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border border-gray-300 px-3 py-1 text-left">Parcel Name</th>
                        <th className="border border-gray-300 px-3 py-1 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user.bookings.map((booking) => (
                        <tr key={booking._id} className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-3 py-1">{booking.parcelName}</td>
                          <td className="border border-gray-300 px-3 py-1 capitalize">
                            {booking.status || "Not Assigned"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-gray-600 italic">No booking history found.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Users;