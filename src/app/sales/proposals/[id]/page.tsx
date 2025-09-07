import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ProposalDetail from '@/components/modules/sales/ProposalDetail';

interface ProposalDetailsPageProps {
  params: {
    id: string;
  };
}

const ProposalDetailsPage: React.FC<ProposalDetailsPageProps> = ({ params }) => {
  const { id } = params;

  return (
    <DashboardLayout>
      <ProposalDetail proposalId={id} />
    </DashboardLayout>
  );
};

export default ProposalDetailsPage;