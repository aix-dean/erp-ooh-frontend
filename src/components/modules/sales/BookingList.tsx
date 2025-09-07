"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import campaignsData from '@/data/campaigns.json'; // Using campaigns as bookings for now

interface Booking {
  id: string;
  client_id: string;
  name: string;
  start_date: string;
  end_date: string;
  status: string; // e.g., 'Confirmed', 'Pending Payment', 'Completed'
}

const BookingList: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    // Simulate fetching data
    setBookings(campaignsData.map(campaign => ({
      id: `BOOK-${campaign.id}`, // Create a mock booking ID
      client_id: campaign.client_id,
      name: `Booking for ${campaign.name}`,
      start_date: campaign.start_date,
      end_date: campaign.end_date,
      status: 'Confirmed', // Default status for mock bookings
    })) as Booking[]);
  }, []);

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch = booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || booking.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Bookings</h2>

      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search by booking name or ID..."
          className="border rounded-md px-3 py-2 flex-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border rounded-md px-3 py-2"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Pending Payment">Pending Payment</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBookings.map((booking) => (
          <div key={booking.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">{booking.name}</h3>
            <p className="text-gray-600">ID: {booking.id}</p>
            <p className="text-gray-600">Client ID: {booking.client_id}</p>
            <p className="text-gray-600">Status: {booking.status}</p>
            <Link href={`/sales/bookings/${booking.id}`} className="text-blue-500 hover:underline mt-2 block">
              View Details
            </Link>
          </div>
        ))}
      </div>

      {filteredBookings.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No bookings found.</p>
      )}
    </div>
  );
};

export default BookingList;