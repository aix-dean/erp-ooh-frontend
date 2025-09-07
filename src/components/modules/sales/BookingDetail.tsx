import React from 'react';
import Link from 'next/link';
import campaignsData from '@/data/campaigns.json'; // Using campaigns as bookings for now
import clientsData from '@/data/clients.json'; // To get client name

interface Booking {
  id: string;
  client_id: string;
  name: string;
  start_date: string;
  end_date: string;
  status: string; // e.g., 'Confirmed', 'Pending Payment', 'Completed'
  billboards: Array<{ billboard_id: string; creative_asset_id: string }>;
}

interface BookingDetailProps {
  bookingId: string;
}

const BookingDetail: React.FC<BookingDetailProps> = ({ bookingId }) => {
  // Find the corresponding campaign data to mock booking details
  const campaign = campaignsData.find(c => `BOOK-${c.id}` === bookingId);

  if (!campaign) {
    return <p className="text-red-500">Booking not found.</p>;
  }

  const client = clientsData.find(c => c.id === campaign.client_id);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Booking: {campaign.name}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <p><strong>Booking ID:</strong> {bookingId}</p>
          <p><strong>Client:</strong> {client ? client.name : 'N/A'} (<Link href={`/clients/${campaign.client_id}`} className="text-blue-500 hover:underline">{campaign.client_id}</Link>)</p>
          <p><strong>Campaign Name:</strong> {campaign.name}</p>
          <p><strong>Duration:</strong> {campaign.start_date} to {campaign.end_date}</p>
          <p><strong>Status:</strong> <span className={`font-semibold ${campaign.status === 'Active' ? 'text-green-600' : 'text-yellow-600'}`}>{campaign.status}</span></p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Assigned Billboards</h3>
          {campaign.billboards && campaign.billboards.length > 0 ? (
            <ul>
              {campaign.billboards.map((bb, index) => (
                <li key={index}>
                  <Link href={`/inventory/${bb.billboard_id}`} className="text-blue-500 hover:underline">
                    {bb.billboard_id}
                  </Link>
                  {bb.creative_asset_id && ` (Asset: ${bb.creative_asset_id})`}
                </li>
              ))}
            </ul>
          ) : (
            <p>No billboards assigned to this booking.</p>
          )}
        </div>
      </div>

      <div className="mt-6 flex space-x-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Generate Contract
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
          Mark as Paid
        </button>
      </div>
    </div>
  );
};

export default BookingDetail;