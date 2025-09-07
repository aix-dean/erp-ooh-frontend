import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import BillboardDetail from '@/components/modules/inventory/BillboardDetail';

interface BillboardDetailsPageProps {
  params: {
    id: string;
  };
}

const BillboardDetailsPage: React.FC<BillboardDetailsPageProps> = ({ params }) => {
  const { id } = params;

  return (
    <DashboardLayout>
      <BillboardDetail billboardId={id} />
    </DashboardLayout>
  );
};

export default BillboardDetailsPage;