// === File: client/src/components/StatusStepper.jsx ===
import React from 'react';

const steps = ['Booked', 'Picked Up', 'In Transit', 'Delivered', 'Failed'];

export default function StatusStepper({ currentStatus }) {
  return (
    <div className="flex space-x-4 py-4">
      {steps.map((step, i) => (
        <div key={i} className={`flex-1 text-center py-2 rounded ${
          step === currentStatus ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
        }`}>
          {step}
        </div>
      ))}
    </div>
  );
}