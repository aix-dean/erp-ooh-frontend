import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import JobOrderDetail from '@/components/modules/logistics/JobOrderDetail';

interface JobOrderDetailsPageProps {
  params: {
    id: string;
  };
}

const JobOrderDetailsPage: React.FC<JobOrderDetailsPageProps> = ({ params }) => {
  const { id } = params;

  return (
    <DashboardLayout>
      <JobOrderDetail jobOrderId={id} />
    </DashboardLayout>
  );
};

export default JobOrderDetailsPage;