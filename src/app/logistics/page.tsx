import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import JobOrderList from '@/components/modules/logistics/JobOrderList';

const LogisticsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Logistics</h1>
      <JobOrderList />
    </DashboardLayout>
  );
};

export default LogisticsPage;