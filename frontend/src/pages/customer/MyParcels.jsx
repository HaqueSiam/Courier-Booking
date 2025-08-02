// === File: client/src/pages/customer/MyParcels.jsx ===
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MyParcels() {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchParcels = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/parcels/my', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setParcels(res.data);
    } catch (err) {
      setError('Failed to fetch parcels.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParcels();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">📋 My Bookings</h2>

      {loading && <p className="text-gray-600">Loading parcels...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && parcels.length === 0 && (
        <p className="text-gray-500">You haven't booked any parcels yet.</p>
      )}

      {!loading && parcels.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 shadow-sm">
            <thead className="bg-blue-100 text-sm text-gray-700">
              <tr>
                <th className="p-2 border">#</th>
                <th className="p-2 border">Pickup</th>
                <th className="p-2 border">Delivery</th>
                <th className="p-2 border">Type</th>
                <th className="p-2 border">Size</th>
                <th className="p-2 border">COD</th>
                <th className="p-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, index) => (
                <tr key={parcel._id} className="text-center">
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{parcel.pickupAddress}</td>
                  <td className="p-2 border">{parcel.deliveryAddress}</td>
                  <td className="p-2 border">{parcel.type}</td>
                  <td className="p-2 border">{parcel.size}</td>
                  <td className="p-2 border">{parcel.cod ? 'Yes' : 'No'}</td>
                  <td className="p-2 border">{parcel.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
