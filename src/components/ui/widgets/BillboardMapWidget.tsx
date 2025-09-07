"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import billboardsData from '@/data/billboards.json';

// Dynamically import the map component to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

const BillboardMapWidget: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Fix for default markers in react-leaflet
    if (typeof window !== 'undefined') {
      import('leaflet').then((L) => {
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });
      });
    }
  }, []);

  const center: [number, number] = [34.0522, -118.2437]; // Default center

  if (!isClient) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md col-span-full">
        <h3 className="text-xl font-semibold mb-4">Billboard Locations</h3>
        <div style={{ height: '400px', width: '100%' }} className="bg-gray-200 flex items-center justify-center">
          <p className="text-gray-500">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md col-span-full">
      <h3 className="text-xl font-semibold mb-4">Billboard Locations</h3>
      <div style={{ height: '400px', width: '100%' }}>
        <MapContainer center={center} zoom={10} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {billboardsData.map((billboard) => (
            <Marker
              key={billboard.id}
              position={[billboard.location.latitude, billboard.location.longitude]}
            >
              <Popup>
                <div>
                  <h4 className="font-semibold">{billboard.id}</h4>
                  <p>{billboard.location.address}</p>
                  <p>Type: {billboard.type}</p>
                  <p>Size: {billboard.size}</p>
                  <p>Status: {billboard.status}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default BillboardMapWidget;