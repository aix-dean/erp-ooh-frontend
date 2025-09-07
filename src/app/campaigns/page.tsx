import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import CampaignCalendar from '@/components/modules/campaigns/CampaignCalendar';

const CampaignsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Campaign Scheduling</h1>
      <CampaignCalendar />
    </DashboardLayout>
  );
};

export default CampaignsPage;