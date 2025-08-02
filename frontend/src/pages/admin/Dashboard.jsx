// === File: client/src/pages/admin/Dashboard.jsx ===
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [metrics, setMetrics] = useState({ total: 0, failed: 0, cod: 0 });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/admin/metrics', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMetrics(res.data);
      } catch (err) {
        console.error('Failed to fetch metrics', err);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">📊 Admin Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-5 text-center">
          <h3 className="text-lg font-semibold text-gray-700">Total Parcels</h3>
          <p className="text-3xl text-blue-600 mt-2">{metrics.total}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-5 text-center">
          <h3 className="text-lg font-semibold text-gray-700">Failed Deliveries</h3>
          <p className="text-3xl text-red-500 mt-2">{metrics.failed}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-5 text-center">
          <h3 className="text-lg font-semibold text-gray-700">COD Parcels</h3>
          <p className="text-3xl text-green-600 mt-2">{metrics.cod}</p>
        </div>
      </div>
    </div>
  );
}
