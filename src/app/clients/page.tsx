import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ClientList from '@/components/modules/clients/ClientList';

const ClientsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Client Management (CRM)</h1>
      <ClientList />
    </DashboardLayout>
  );
};

export default ClientsPage;