// === File: client/src/pages/agent/AssignedParcels.jsx ===
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AssignedParcels() {
  const [parcels, setParcels] = useState([]);

  useEffect(() => {
    const fetchParcels = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/agents/assigned', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setParcels(res.data);
      } catch (err) {
        console.error('Failed to fetch assigned parcels', err);
      }
    };

    fetchParcels();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">🚚 Assigned Deliveries</h2>

      {parcels.length === 0 ? (
        <p className="text-gray-600">No assigned parcels.</p>
      ) : (
        <div className="space-y-4">
          {parcels.map((parcel) => (
            <div key={parcel._id} className="bg-white shadow rounded p-4 border">
              <p><span className="font-semibold text-gray-700">📦 Parcel ID:</span> {parcel._id}</p>
              <p><span className="font-semibold text-gray-700">Pickup:</span> {parcel.pickupAddress}</p>
              <p><span className="font-semibold text-gray-700">Delivery:</span> {parcel.deliveryAddress}</p>
              <p><span className="font-semibold text-gray-700">Status:</span> <span className="text-blue-600">{parcel.status}</span></p>
              {parcel.location?.lat && parcel.location?.lon && (
                <p>
                  <span className="font-semibold text-gray-700">Location:</span>{' '}
                  {parcel.location.lat.toFixed(4)}, {parcel.location.lon.toFixed(4)}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
