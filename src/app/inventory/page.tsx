import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import BillboardList from '@/components/modules/inventory/BillboardList';

const InventoryPage: React.FC = () => {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Inventory Management</h1>
      <BillboardList />
    </DashboardLayout>
  );
};

export default InventoryPage;