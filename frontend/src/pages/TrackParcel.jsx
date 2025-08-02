// === File: client/src/pages/TrackParcel.jsx ===
import React from 'react';
import StatusStepper from '../components/StatusStepper';

export default function TrackParcel() {
  const parcel = {
    trackingId: 'PKG123456',
    status: 'In Transit',
    pickup: 'Dhaka',
    delivery: 'Chittagong',
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Track Parcel</h2>
      <ParcelCard parcel={parcel} />
      <StatusStepper currentStatus={parcel.status} />
    </div>
  );
}