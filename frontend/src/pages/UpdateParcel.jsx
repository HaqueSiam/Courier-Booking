// frontend/src/pages/UpdateParcel.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
const API_URL = import.meta.env.VITE_API_URL;

const UpdateParcel = () => {
  const { token, user } = useContext(AuthContext);

  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [updateData, setUpdateData] = useState({
    parcelId: "",
    location: "",
    status: "",
  });

  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  const fetchParcels = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${API_URL}/api/agent/assigned-parcels`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setParcels(res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load parcels.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParcels();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setSubmitError("");
    setSubmitSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess("");

    if (!updateData.parcelId || !updateData.status) {
      setSubmitError("Parcel and Status are required.");
      return;
    }

    try {
      await axios.put(
        `${API_URL}/api/agent/update-status`,
        updateData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSubmitSuccess("Status updated successfully.");
      setUpdateData({ parcelId: "", location: "", status: "" });
      fetchParcels();
    } catch (err) {
      setSubmitError(err.response?.data?.message || "Failed to update status.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 bg-white rounded shadow border border-gray-200">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Update Parcel Status
      </h1>

      {loading && (
        <p className="text-center text-gray-600">Loading parcels...</p>
      )}

      {error && (
        <div className="bg-red-100 text-red-700 p-3 mb-4 rounded text-center font-medium">
          {error}
        </div>
      )}

      {!loading && parcels.length === 0 && (
        <p className="text-center text-gray-600">No parcels assigned.</p>
      )}

      {!loading && parcels.length > 0 && (
        <div className="mb-10">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Assigned Parcels
          </h2>
          <div className="overflow-x-auto border border-gray-300 rounded">
            <table className="min-w-full text-left border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border border-gray-300">Parcel Name</th>
                  <th className="px-4 py-2 border border-gray-300">Customer Name</th>
                  <th className="px-4 py-2 border border-gray-300">Customer Phone</th>
                  <th className="px-4 py-2 border border-gray-300">Pickup Address</th>
                  <th className="px-4 py-2 border border-gray-300">Delivery Address</th>
                  <th className="px-4 py-2 border border-gray-300">Current Status</th>
                </tr>
              </thead>
              <tbody>
                {parcels.map((parcel) => (
                  <tr
                    key={parcel._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="border border-gray-300 px-4 py-2">{parcel.parcelName}</td>
                    <td className="border border-gray-300 px-4 py-2">{parcel.bookedBy.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{parcel.bookedBy.phone}</td>
                    <td className="border border-gray-300 px-4 py-2">{parcel.pickupAddress}</td>
                    <td className="border border-gray-300 px-4 py-2">{parcel.deliveryAddress}</td>
                    <td className="border border-gray-300 px-4 py-2 capitalize">
                      {parcel.status || "Not Picked"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Update Status Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-gray-50 p-6 rounded shadow-md border border-gray-200"
      >
        <h3 className="text-xl font-semibold mb-4 text-gray-800 text-center">
          Update Parcel Status
        </h3>

        {submitError && (
          <div className="bg-red-100 text-red-700 p-3 mb-4 rounded text-center font-medium">
            {submitError}
          </div>
        )}
        {submitSuccess && (
          <div className="bg-green-100 text-green-700 p-3 mb-4 rounded text-center font-medium">
            {submitSuccess}
          </div>
        )}

        <label className="block mb-2 font-medium text-gray-700" htmlFor="parcelId">
          Select Parcel
        </label>
        <select
          id="parcelId"
          name="parcelId"
          value={updateData.parcelId}
          onChange={handleChange}
          className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        >
          <option value="" disabled>
            Select parcel
          </option>
          {parcels.map((parcel) => (
            <option key={parcel._id} value={parcel._id}>
              {parcel.parcelName}
            </option>
          ))}
        </select>

        <label className="block mb-2 font-medium text-gray-700" htmlFor="location">
          Location (optional)
        </label>
        <input
          id="location"
          name="location"
          type="text"
          value={updateData.location}
          onChange={handleChange}
          placeholder="Enter current location"
          className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <label className="block mb-2 font-medium text-gray-700" htmlFor="status">
          Update Status
        </label>
        <select
          id="status"
          name="status"
          value={updateData.status}
          onChange={handleChange}
          className="w-full mb-6 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        >
          <option value="" disabled>
            Select status
          </option>
          <option value="Picked Up">Picked Up</option>
          <option value="In Transit">In Transit</option>
          <option value="Delivered">Delivered</option>
          <option value="Failed">Failed</option>
        </select>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded transition-colors"
        >
          Update Status
        </button>
      </form>
    </div>
  );
};

export default UpdateParcel;