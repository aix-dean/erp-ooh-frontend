import React from 'react';
import ChartComponent from '@/components/ui/ChartComponent';

const SalesChartWidget: React.FC = () => {
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 19000, 3000, 5000, 2000, 3000],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md col-span-full">
      <ChartComponent type="bar" data={salesData} title="Sales Pipeline" />
    </div>
  );
};

export default SalesChartWidget;