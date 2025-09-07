import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import MaintenanceSchedule from '@/components/modules/maintenance/MaintenanceSchedule';

const MaintenancePage: React.FC = () => {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Maintenance & Operations</h1>
      <MaintenanceSchedule />
    </DashboardLayout>
  );
};

export default MaintenancePage;