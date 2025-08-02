// === File: client/src/components/ParcelCard.jsx ===
import React from 'react';

export default function ParcelCard({ parcel }) {
  return (
    <div className="border p-4 rounded shadow bg-white">
      <h3 className="font-bold text-lg">📦 {parcel.trackingId}</h3>
      <p>Status: {parcel.status}</p>
      <p>From: {parcel.pickup}</p>
      <p>To: {parcel.delivery}</p>
    </div>
  );
}