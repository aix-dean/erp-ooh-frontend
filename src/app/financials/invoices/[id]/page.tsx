import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import InvoiceDetail from '@/components/modules/financials/InvoiceDetail';

interface InvoiceDetailsPageProps {
  params: {
    id: string;
  };
}

const InvoiceDetailsPage: React.FC<InvoiceDetailsPageProps> = ({ params }) => {
  const { id } = params;

  return (
    <DashboardLayout>
      <InvoiceDetail invoiceId={id} />
    </DashboardLayout>
  );
};

export default InvoiceDetailsPage;