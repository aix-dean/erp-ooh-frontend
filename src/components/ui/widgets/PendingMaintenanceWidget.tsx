import React from 'react';
import jobOrdersData from '@/data/jobOrders.json';

const PendingMaintenanceWidget: React.FC = () => {
  const pendingMaintenance = jobOrdersData.filter(job =>
    (job.type === 'Maintenance' || job.type === 'Repair') && job.status !== 'Completed'
  ).length;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-2">Pending Maintenance</h3>
      <p className="text-3xl font-bold text-red-600">{pendingMaintenance}</p>
    </div>
  );
};

export default PendingMaintenanceWidget;