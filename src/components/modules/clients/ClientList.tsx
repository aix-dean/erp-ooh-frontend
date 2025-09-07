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

const ClientList: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterIndustry, setFilterIndustry] = useState('All');

  useEffect(() => {
    // Simulate fetching data
    setClients(clientsData as Client[]);
  }, []);

  const filteredClients = clients.filter((client) => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          client.contact_person.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = filterIndustry === 'All' || client.industry === filterIndustry;
    return matchesSearch && matchesIndustry;
  });

  const uniqueIndustries = Array.from(new Set(clients.map(client => client.industry)));

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Client Database</h2>

      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search by name, contact, or email..."
          className="border rounded-md px-3 py-2 flex-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border rounded-md px-3 py-2"
          value={filterIndustry}
          onChange={(e) => setFilterIndustry(e.target.value)}
        >
          <option value="All">All Industries</option>
          {uniqueIndustries.map(industry => (
            <option key={industry} value={industry}>{industry}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClients.map((client) => (
          <div key={client.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">{client.name}</h3>
            <p className="text-gray-600">Contact: {client.contact_person}</p>
            <p className="text-gray-600">Email: {client.email}</p>
            <p className="text-gray-600">Industry: {client.industry}</p>
            <Link href={`/clients/${client.id}`} className="text-blue-500 hover:underline mt-2 block">
              View Details
            </Link>
          </div>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No clients found matching your criteria.</p>
      )}
    </div>
  );
};

export default ClientList;