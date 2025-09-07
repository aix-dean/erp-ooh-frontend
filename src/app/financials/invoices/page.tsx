import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import InvoiceList from '@/components/modules/financials/InvoiceList';

const InvoicesPage: React.FC = () => {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Invoices</h1>
      <InvoiceList />
    </DashboardLayout>
  );
};

export default InvoicesPage;