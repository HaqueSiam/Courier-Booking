// frontend/src/pages/Dashboard/AgentDashboard.jsx
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const statusOptions = [
  "Picked Up",
  "In Transit",
  "Delivered",
  "Failed"
];

const AgentDashboard = () => {
  const { user, token } = useContext(AuthContext);
  const [parcels, setParcels] = useState([]);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [location, setLocation] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Fetch parcels assigned to this agent
  const fetchParcels = async () => {
    if (!user) return;
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`/api/agent/parcels/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setParcels(res.data.parcels || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch parcels.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParcels();
  }, [user]);

  // Determine allowed next statuses based on current status
  const getAllowedStatusUpdates = (currentStatus) => {
    switch (currentStatus) {
      case "":
      case "Not Picked":
        return ["Picked Up", "Failed"];
      case "Picked Up":
        return ["In Transit", "Failed"];
      case "In Transit":
        return ["Delivered", "Failed"];
      case "Delivered":
      case "Failed":
        return []; // no further updates allowed
      default:
        return [];
    }
  };

  // Current parcel's status or "Not Picked"
  const currentStatus = selectedParcel?.status || "Not Picked";
  const allowedStatuses = getAllowedStatusUpdates(currentStatus);

  // Handle form submit to update status
  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    if (!selectedParcel) return;

    // Validate selected status is allowed
    if (!allowedStatuses.includes(updateStatus)) {
      setError(
        `Invalid status update. Allowed statuses from "${currentStatus}": ${allowedStatuses.join(
          ", "
        )}`
      );
      return;
    }

    try {
      setError("");
      setSuccessMsg("");
      await axios.put(
        `/api/agent/parcels/update/${selectedParcel._id}`,
        {
          location,
          status: updateStatus,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuccessMsg("Parcel status updated successfully.");
      setLocation("");
      setUpdateStatus("");
      setSelectedParcel(null);
      fetchParcels();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update parcel status.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        Update Parcel Status
      </h1>

      {loading && (
        <p className="text-center text-gray-500">Loading assigned parcels...</p>
      )}
      {error && (
        <p className="text-center text-red-600 font-medium mb-4">{error}</p>
      )}
      {successMsg && (
        <p className="text-center text-green-600 font-medium mb-4">{successMsg}</p>
      )}

      {!loading && parcels.length === 0 && (
        <p className="text-center text-gray-600 italic">No parcels assigned yet.</p>
      )}

      {!loading && parcels.length > 0 && (
        <div className="overflow-x-auto border border-gray-200 rounded shadow-sm mb-8">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-3 text-left text-gray-700 font-semibold">
                  Customer Name
                </th>
                <th className="border px-4 py-3 text-left text-gray-700 font-semibold">
                  Customer Phone
                </th>
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
                  Status
                </th>
                <th className="border px-4 py-3 text-left text-gray-700 font-semibold">
                  Select
                </th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel) => (
                <tr
                  key={parcel._id}
                  className={`hover:bg-gray-50 transition-colors ${
                    selectedParcel?._id === parcel._id ? "bg-blue-50" : ""
                  }`}
                >
                  <td className="border px-4 py-3">{parcel.customer.name}</td>
                  <td className="border px-4 py-3">{parcel.customer.phone}</td>
                  <td className="border px-4 py-3">{parcel.parcelName}</td>
                  <td className="border px-4 py-3">{parcel.pickupAddress}</td>
                  <td className="border px-4 py-3">{parcel.deliveryAddress}</td>
                  <td className="border px-4 py-3 capitalize">
                    {parcel.status || "Not Picked"}
                  </td>
                  <td className="border px-4 py-3">
                    <input
                      type="radio"
                      name="selectedParcel"
                      checked={selectedParcel?._id === parcel._id}
                      onChange={() => {
                        setSelectedParcel(parcel);
                        setError("");
                        setSuccessMsg("");
                        setUpdateStatus("");
                        setLocation("");
                      }}
                      className="cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedParcel && (
        <form
          onSubmit={handleUpdateStatus}
          className="max-w-md mx-auto bg-white p-6 rounded shadow-md border border-gray-200"
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Update Status for: <span className="font-mono">{selectedParcel.parcelName}</span>
          </h2>

          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-gray-700 font-medium mb-1"
            >
              Location (optional)
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter current location"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="updateStatus"
              className="block text-gray-700 font-medium mb-1"
            >
              Update Status <span className="text-red-500">*</span>
            </label>
            <select
              id="updateStatus"
              required
              value={updateStatus}
              onChange={(e) => setUpdateStatus(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">-- Select status --</option>
              {allowedStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Update Status
          </button>
        </form>
      )}
    </div>
  );
};

export default AgentDashboard;
