import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ClientInquiryList from '@/components/modules/sales/ClientInquiryList';

const SalesPage: React.FC = () => {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Sales & Booking</h1>
      <ClientInquiryList />
    </DashboardLayout>
  );
};

export default SalesPage;