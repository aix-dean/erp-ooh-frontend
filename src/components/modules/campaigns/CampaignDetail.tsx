import React from 'react';
import Link from 'next/link';
import campaignsData from '@/data/campaigns.json'; // Mock data
import clientsData from '@/data/clients.json'; // To get client names
import billboardsData from '@/data/billboards.json'; // To get billboard details

interface Campaign {
  id: string;
  client_id: string;
  name: string;
  start_date: string;
  end_date: string;
  objectives: string;
  billboards: Array<{ billboard_id: string; creative_asset_id: string }>;
  status: string;
  creative_assets: Array<{ id: string; name: string; url: string; version: number }>;
}

interface CampaignDetailProps {
  campaignId: string;
}

const CampaignDetail: React.FC<CampaignDetailProps> = ({ campaignId }) => {
  const campaign = campaignsData.find(c => c.id === campaignId);

  if (!campaign) {
    return <p className="text-red-500">Campaign not found.</p>;
  }

  const client = clientsData.find(c => c.id === campaign.client_id);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Campaign: {campaign.name}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <p><strong>Campaign ID:</strong> {campaign.id}</p>
          <p><strong>Client:</strong> {client ? client.name : 'N/A'} (<Link href={`/clients/${campaign.client_id}`} className="text-blue-500 hover:underline">{campaign.client_id}</Link>)</p>
          <p><strong>Duration:</strong> {campaign.start_date} to {campaign.end_date}</p>
          <p><strong>Objectives:</strong> {campaign.objectives}</p>
          <p><strong>Status:</strong> <span className={`font-semibold ${campaign.status === 'Active' ? 'text-green-600' : 'text-yellow-600'}`}>{campaign.status}</span></p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Assigned Billboards</h3>
          {campaign.billboards && campaign.billboards.length > 0 ? (
            <ul>
              {campaign.billboards.map((bb, index) => {
                const billboard = billboardsData.find(b => b.id === bb.billboard_id);
                return (
                  <li key={index}>
                    <Link href={`/inventory/${bb.billboard_id}`} className="text-blue-500 hover:underline">
                      {billboard ? billboard.location.address : bb.billboard_id}
                    </Link>
                    {bb.creative_asset_id && ` (Asset: ${bb.creative_asset_id})`}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>No billboards assigned to this campaign.</p>
          )}
        </div>
      </div>

      {campaign.creative_assets && campaign.creative_assets.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Creative Assets</h3>
          <div className="grid grid-cols-2 gap-4">
            {campaign.creative_assets.map((asset, index) => (
              <div key={index} className="border p-2 rounded-md">
                <p><strong>Name:</strong> {asset.name}</p>
                <p><strong>Version:</strong> {asset.version}</p>
                {asset.url && (
                  <img src={asset.url} alt={asset.name} className="mt-2 max-w-full h-auto rounded-md" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 flex space-x-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Edit Campaign
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
          End Campaign
        </button>
      </div>
    </div>
  );
};

export default CampaignDetail;