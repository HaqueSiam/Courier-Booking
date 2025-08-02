import React from 'react';
import { MapPin } from 'lucide-react';

const statusColors = {
  CREATED: 'bg-gray-300 text-gray-800',
  PICKED_UP: 'bg-blue-200 text-blue-800',
  IN_TRANSIT: 'bg-yellow-200 text-yellow-800',
  OUT_FOR_DELIVERY: 'bg-orange-200 text-orange-800',
  DELIVERED: 'bg-green-200 text-green-800',
  CANCELLED: 'bg-red-200 text-red-800',
};

export default function PackageDetail({ pkg, onClick, isSelected }) {
  const {
    tracking_id,
    current_status,
    lat,
    lon,
    timestamp,
    agent_name,
  } = pkg;

  return (
    <div
      className={`cursor-pointer border rounded-xl p-4 shadow-sm hover:shadow-md transition duration-200 ${
        isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
      }`}
      onClick={onClick}
    >
      {/* Tracking ID */}
      <h3 className="text-lg font-bold text-blue-700 mb-2">
        Tracking ID: {tracking_id}
      </h3>

      {/* Status */}
      <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-2 ${statusColors[current_status] || 'bg-gray-100'}`}>
        {current_status}
      </div>

      {/* Location */}
      <div className="flex items-center text-sm text-gray-600 mb-1">
        <MapPin className="w-4 h-4 mr-1" />
        Last Location: {lat}, {lon}
      </div>

      {/* Timestamp */}
      <div className="text-sm text-gray-500 mb-1">
        Last Updated: {new Date(timestamp).toLocaleString()}
      </div>

      {/* Assigned Courier */}
      {agent_name && (
        <div className="text-sm text-gray-700">
          Courier: <span className="font-medium">{agent_name}</span>
        </div>
      )}
    </div>
  );
}
