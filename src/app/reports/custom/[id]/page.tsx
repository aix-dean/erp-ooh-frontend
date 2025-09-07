import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import CustomReportViewer from '@/components/modules/reports/CustomReportViewer';

interface CustomReportDetailsPageProps {
  params: {
    id: string;
  };
}

const CustomReportDetailsPage: React.FC<CustomReportDetailsPageProps> = ({ params }) => {
  const { id } = params;

  return (
    <DashboardLayout>
      <CustomReportViewer reportId={id} />
    </DashboardLayout>
  );
};

export default CustomReportDetailsPage;