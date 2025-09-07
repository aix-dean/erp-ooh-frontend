import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import CampaignDetail from '@/components/modules/campaigns/CampaignDetail';

interface CampaignDetailsPageProps {
  params: {
    id: string;
  };
}

const CampaignDetailsPage: React.FC<CampaignDetailsPageProps> = ({ params }) => {
  const { id } = params;

  return (
    <DashboardLayout>
      <CampaignDetail campaignId={id} />
    </DashboardLayout>
  );
};

export default CampaignDetailsPage;