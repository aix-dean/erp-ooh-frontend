import React from 'react';
import Image from 'next/image';
import billboardsData from '@/data/billboards.json'; // Mock data

interface Billboard {
  id: string;
  location: {
    address: string;
    latitude: number;
    longitude: number;
  };
  type: string;
  size: string;
  illumination: string;
  status: string;
  photos: string[];
  technical_specs: {
    resolution?: string;
    refresh_rate?: string;
  };
  pricing_tiers: Array<{ duration: string; price: number }>;
  availability: Array<{ start_date: string; end_date: string; booked: boolean }>;
  maintenance_history: Array<{ date: string; description: string; team: string }>;
}

interface BillboardDetailProps {
  billboardId: string;
}

const BillboardDetail: React.FC<BillboardDetailProps> = ({ billboardId }) => {
  const billboard = (billboardsData as Billboard[]).find(b => b.id === billboardId);

  if (!billboard) {
    return <p className="text-red-500">Billboard not found.</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Billboard ID: {billboard.id}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <p><strong>Location:</strong> {billboard.location.address}</p>
          <p><strong>Type:</strong> {billboard.type}</p>
          <p><strong>Size:</strong> {billboard.size}</p>
          <p><strong>Illumination:</strong> {billboard.illumination}</p>
          <p><strong>Status:</strong> {billboard.status}</p>
        </div>
        <div>
          {billboard.technical_specs.resolution && (
            <p><strong>Resolution:</strong> {billboard.technical_specs.resolution}</p>
          )}
          {billboard.technical_specs.refresh_rate && (
            <p><strong>Refresh Rate:</strong> {billboard.technical_specs.refresh_rate}</p>
          )}
          {/* Add more technical specs as needed */}
        </div>
      </div>

      {billboard.photos && billboard.photos.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Photos</h3>
          <div className="grid grid-cols-2 gap-4">
            {billboard.photos.map((photo, index) => (
              <Image
                key={index}
                src={photo}
                alt={`Billboard ${billboard.id} - Photo ${index + 1}`}
                width={300}
                height={200}
                className="rounded-md object-cover"
              />
            ))}
          </div>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Pricing Tiers</h3>
        <ul>
          {billboard.pricing_tiers.map((tier, index) => (
            <li key={index}>{tier.duration}: ${tier.price}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Availability</h3>
        {/* Placeholder for AvailabilityCalendar component */}
        <ul>
          {billboard.availability.map((slot, index) => (
            <li key={index}>
              {slot.start_date} to {slot.end_date} - {slot.booked ? 'Booked' : 'Available'}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Maintenance History</h3>
        {/* Placeholder for MaintenanceHistory component */}
        {billboard.maintenance_history && billboard.maintenance_history.length > 0 ? (
          <ul>
            {billboard.maintenance_history.map((entry, index) => (
              <li key={index}>
                {entry.date}: {entry.description} (Team: {entry.team})
              </li>
            ))}
          </ul>
        ) : (
          <p>No maintenance history available.</p>
        )}
      </div>
    </div>
  );
};

export default BillboardDetail;