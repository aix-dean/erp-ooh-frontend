import React from 'react';
import campaignsData from '@/data/campaigns.json';

const ActiveCampaignsWidget: React.FC = () => {
  const activeCampaigns = campaignsData.filter(campaign => campaign.status === 'Active').length;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-2">Active Campaigns</h3>
      <p className="text-3xl font-bold text-blue-600">{activeCampaigns}</p>
    </div>
  );
};

export default ActiveCampaignsWidget;