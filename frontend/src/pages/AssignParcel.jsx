// frontend/src/pages/AssignParcel.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const AssignParcel = () => {
  const { token } = useContext(AuthContext);

  const [unassignedParcels, setUnassignedParcels] = useState([]);
  const [availableAgents, setAvailableAgents] = useState([]);
  const [assignments, setAssignments] = useState({}); // { parcelId: agentId }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Fetch unassigned parcels and available agents
  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const parcelsRes = await axios.get("/api/admin/unassigned-parcels", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const agentsRes = await axios.get("/api/admin/available-agents", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUnassignedParcels(parcelsRes.data || []);
      setAvailableAgents(agentsRes.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load unassigned parcels or agents."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle agent selection for a parcel
  const handleSelectAgent = (parcelId, agentId) => {
    setAssignments((prev) => ({
      ...prev,
      [parcelId]: agentId,
    }));
    setSuccessMsg("");
    setError("");
  };

  // Submit assignment for a parcel
  const handleSubmit = async (parcelId) => {
    const agentId = assignments[parcelId];
    if (!agentId) {
      setError("Please select an agent before submitting.");
      return;
    }

    try {
      await axios.post(
        "/api/admin/assign-parcel",
        { parcelId, agentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccessMsg(`Parcel ${parcelId} assigned to agent ${agentId} successfully.`);

      // Remove assigned parcel from unassignedParcels
      setUnassignedParcels((prev) => prev.filter((p) => p._id !== parcelId));

      // Remove assigned agent from availableAgents
      setAvailableAgents((prev) => prev.filter((a) => a._id !== agentId));

      // Remove assignment state for that parcel
      setAssignments((prev) => {
        const copy = { ...prev };
        delete copy[parcelId];
        return copy;
      });

      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to assign parcel to agent."
      );
      setSuccessMsg("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md border border-gray-200 mt-10">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
        Assign Parcels to Agents
      </h1>

      {loading && (
        <p className="text-center text-gray-600">Loading unassigned parcels...</p>
      )}

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

      {!loading && unassignedParcels.length === 0 && (
        <p className="text-center text-gray-600">No unassigned parcels available.</p>
      )}

      {!loading && unassignedParcels.length > 0 && (
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Parcel ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Customer ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Parcel Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Assign To</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {unassignedParcels.map(({ _id, parcelName, customerId }) => (
              <tr key={_id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{_id}</td>
                <td className="border border-gray-300 px-4 py-2">{customerId}</td>
                <td className="border border-gray-300 px-4 py-2">{parcelName}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <select
                    className="w-full border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={assignments[_id] || ""}
                    onChange={(e) => handleSelectAgent(_id, e.target.value)}
                  >
                    <option value="">Select Agent</option>
                    {availableAgents.map((agent) => (
                      <option key={agent._id} value={agent._id}>
                        {agent.name} ({agent._id})
                      </option>
                    ))}
                  </select>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() => handleSubmit(_id)}
                    className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
                    disabled={!assignments[_id]}
                  >
                    Assign
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AssignParcel;
