import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ProposalList from '@/components/modules/sales/ProposalList';

const ProposalsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Proposals</h1>
      <ProposalList />
    </DashboardLayout>
  );
};

export default ProposalsPage;