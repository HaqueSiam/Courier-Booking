import React from 'react';

function AlertList({ packages }) {
  const alerts = packages.flatMap(pkg => pkg.alerts || []);
  if (alerts.length === 0) return null;

  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6 max-w-4xl mx-auto">
      <h2 className="font-bold mb-2 text-yellow-800">⚠️ Alerts</h2>
      <ul className="list-disc pl-5 text-sm text-yellow-700">
        {alerts.map((alert, idx) => (
          <li key={idx}>
            {alert.triggered_at}: {alert.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AlertList;
