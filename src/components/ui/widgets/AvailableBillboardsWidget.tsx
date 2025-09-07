import React from 'react';
import billboardsData from '@/data/billboards.json';

const AvailableBillboardsWidget: React.FC = () => {
  const availableBillboards = billboardsData.filter(billboard =>
    billboard.availability.every(slot => !slot.booked || new Date(slot.end_date) < new Date())
  ).length;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-2">Available Billboards</h3>
      <p className="text-3xl font-bold text-purple-600">{availableBillboards}</p>
    </div>
  );
};

export default AvailableBillboardsWidget;