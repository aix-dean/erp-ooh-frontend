"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import jobOrdersData from '@/data/jobOrders.json'; // Mock data
import billboardsData from '@/data/billboards.json'; // To get billboard locations

interface JobOrder {
  id: string;
  billboard_id: string;
  type: string; // e.g., 'Installation', 'Removal', 'Maintenance', 'Creative Change'
  description: string;
  assigned_team: string;
  priority: string;
  status: string; // e.g., 'Pending', 'In Progress', 'Completed'
  created_date: string;
  due_date: string;
  materials?: Array<{ item: string; quantity: number }>;
  proof_of_performance?: Array<{ date: string; photo_url: string; notes: string }>;
}

const JobOrderList: React.FC = () => {
  const [jobOrders, setJobOrders] = useState<JobOrder[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterTeam, setFilterTeam] = useState('All');

  useEffect(() => {
    // Simulate fetching data
    setJobOrders(jobOrdersData as JobOrder[]);
  }, []);

  const filteredJobOrders = jobOrders.filter((jobOrder) => {
    const billboard = billboardsData.find(b => b.id === jobOrder.billboard_id);
    const matchesSearch = jobOrder.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          jobOrder.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (billboard && billboard.location.address.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'All' || jobOrder.type === filterType;
    const matchesStatus = filterStatus === 'All' || jobOrder.status === filterStatus;
    const matchesTeam = filterTeam === 'All' || jobOrder.assigned_team === filterTeam;
    return matchesSearch && matchesType && matchesStatus && matchesTeam;
  });

  const uniqueTypes = Array.from(new Set(jobOrders.map(job => job.type)));
  const uniqueTeams = Array.from(new Set(jobOrders.map(job => job.assigned_team)));

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Job Order Management</h2>

      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search by description, ID, or location..."
          className="border rounded-md px-3 py-2 flex-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border rounded-md px-3 py-2"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="All">All Types</option>
          {uniqueTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <select
          className="border rounded-md px-3 py-2"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <select
          className="border rounded-md px-3 py-2"
          value={filterTeam}
          onChange={(e) => setFilterTeam(e.target.value)}
        >
          <option value="All">All Teams</option>
          {uniqueTeams.map(team => (
            <option key={team} value={team}>{team}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredJobOrders.map((jobOrder) => {
          const billboard = billboardsData.find(b => b.id === jobOrder.billboard_id);
          return (
            <div key={jobOrder.id} className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">Job: {jobOrder.description}</h3>
              <p className="text-gray-600">ID: {jobOrder.id}</p>
              <p className="text-gray-600">Billboard: {billboard ? billboard.location.address : jobOrder.billboard_id}</p>
              <p className="text-gray-600">Type: {jobOrder.type}</p>
              <p className="text-gray-600">Assigned Team: {jobOrder.assigned_team}</p>
              <p className="text-gray-600">Status: {jobOrder.status}</p>
              <p className="text-gray-600">Due Date: {jobOrder.due_date}</p>
              <Link href={`/logistics/${jobOrder.id}`} className="text-blue-500 hover:underline mt-2 block">
                View Details
              </Link>
            </div>
          );
        })}
      </div>

      {filteredJobOrders.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No job orders found matching your criteria.</p>
      )}
    </div>
  );
};

export default JobOrderList;