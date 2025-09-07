import React from 'react';
import invoicesData from '@/data/invoices.json';

const RevenueWidget: React.FC = () => {
  const totalRevenue = invoicesData.reduce((sum, invoice) => sum + invoice.amount, 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-2">Total Revenue (YTD)</h3>
      <p className="text-3xl font-bold text-green-600">${totalRevenue.toLocaleString()}</p>
    </div>
  );
};

export default RevenueWidget;