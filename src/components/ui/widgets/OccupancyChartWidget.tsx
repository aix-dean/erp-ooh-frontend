import React from 'react';
import ChartComponent from '@/components/ui/ChartComponent';
import billboardsData from '@/data/billboards.json';

const OccupancyChartWidget: React.FC = () => {
  const availableBillboards = billboardsData.filter(billboard =>
    billboard.availability.every(slot => !slot.booked || new Date(slot.end_date) < new Date())
  ).length;

  const occupancyData = {
    labels: ['Occupied', 'Available'],
    datasets: [
      {
        data: [billboardsData.length - availableBillboards, availableBillboards],
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md col-span-full">
      <ChartComponent type="pie" data={occupancyData} title="Billboard Occupancy Rate" />
    </div>
  );
};

export default OccupancyChartWidget;