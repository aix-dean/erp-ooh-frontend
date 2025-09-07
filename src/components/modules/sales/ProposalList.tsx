"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import campaignsData from '@/data/campaigns.json'; // Using campaigns as proposals for now

interface Proposal {
  id: string;
  client_id: string;
  name: string;
  start_date: string;
  end_date: string;
  status: string; // e.g., 'Draft', 'Sent', 'Approved', 'Rejected'
}

const ProposalList: React.FC = () => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    // Simulate fetching data
    setProposals(campaignsData.map(campaign => ({
      id: `PROP-${campaign.id}`, // Create a mock proposal ID
      client_id: campaign.client_id,
      name: `Proposal for ${campaign.name}`,
      start_date: campaign.start_date,
      end_date: campaign.end_date,
      status: 'Sent', // Default status for mock proposals
    })) as Proposal[]);
  }, []);

  const filteredProposals = proposals.filter((proposal) => {
    const matchesSearch = proposal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          proposal.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || proposal.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Proposals</h2>

      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search by proposal name or ID..."
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
          <option value="Draft">Draft</option>
          <option value="Sent">Sent</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProposals.map((proposal) => (
          <div key={proposal.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">{proposal.name}</h3>
            <p className="text-gray-600">ID: {proposal.id}</p>
            <p className="text-gray-600">Client ID: {proposal.client_id}</p>
            <p className="text-gray-600">Status: {proposal.status}</p>
            <Link href={`/sales/proposals/${proposal.id}`} className="text-blue-500 hover:underline mt-2 block">
              View Details
            </Link>
          </div>
        ))}
      </div>

      {filteredProposals.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No proposals found.</p>
      )}
    </div>
  );
};

export default ProposalList;