"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import clientsData from '@/data/clients.json'; // Mock data

interface Client {
  id: string;
  name: string;
  contact_person: string;
  email: string;
  phone: string;
  company_info: string;
  industry: string;
  address: string;
  communication_log: Array<{ date: string; type: string; subject: string; notes: string }>;
  tasks: Array<{ id: string; description: string; due_date: string; status: string }>;
}

const ClientInquiryList: React.FC = () => {
  const [inquiries, setInquiries] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate fetching data
    setInquiries(clientsData as Client[]); // Using clients data as inquiries for now
  }, []);

  const filteredInquiries = inquiries.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.contact_person.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Client Inquiries</h2>

      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search by client name, contact, or email..."
          className="border rounded-md px-3 py-2 flex-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredInquiries.map((client) => (
          <div key={client.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">{client.name}</h3>
            <p className="text-gray-600">Contact: {client.contact_person}</p>
            <p className="text-gray-600">Email: {client.email}</p>
            <Link href={`/clients/${client.id}`} className="text-blue-500 hover:underline mt-2 block">
              View Client Details
            </Link>
            {/* Link to create a new proposal for this client */}
            <Link href={`/sales/proposals/new?clientId=${client.id}`} className="text-green-500 hover:underline mt-1 block">
              Create Proposal
            </Link>
          </div>
        ))}
      </div>

      {filteredInquiries.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No client inquiries found.</p>
      )}
    </div>
  );
};

export default ClientInquiryList;