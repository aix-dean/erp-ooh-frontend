import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DashboardOverview from '@/components/modules/reports/DashboardOverview';

const ReportsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Reporting & Analytics</h1>
      <DashboardOverview />
    </DashboardLayout>
  );
};

export default ReportsPage;