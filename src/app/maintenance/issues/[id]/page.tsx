import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import IssueDetail from '@/components/modules/maintenance/IssueDetail';

interface IssueDetailsPageProps {
  params: {
    id: string;
  };
}

const IssueDetailsPage: React.FC<IssueDetailsPageProps> = ({ params }) => {
  const { id } = params;

  return (
    <DashboardLayout>
      <IssueDetail issueId={id} />
    </DashboardLayout>
  );
};

export default IssueDetailsPage;