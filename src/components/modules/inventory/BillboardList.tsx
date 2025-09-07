"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/forms';
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

const BillboardList: React.FC = () => {
  const [billboards, setBillboards] = useState<Billboard[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    // Simulate fetching data
    setBillboards(billboardsData as Billboard[]);
  }, []);

  const filteredBillboards = billboards.filter((billboard) => {
    const matchesSearch = billboard.location.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          billboard.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || billboard.type === filterType;
    const matchesStatus = filterStatus === 'All' || billboard.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this billboard?')) {
      setBillboards(billboards.filter(b => b.id !== id));
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Billboard Inventory</h2>
        <Button>
          Add New Billboard
        </Button>
      </div>

      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search by ID or location..."
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
          <option value="Digital">Digital</option>
          <option value="Static">Static</option>
        </select>
        <select
          className="border rounded-md px-3 py-2"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Under Maintenance">Under Maintenance</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBillboards.map((billboard) => (
          <div key={billboard.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">{billboard.id}</h3>
            <p className="text-gray-600">{billboard.location.address}</p>
            <p className="text-gray-600">Type: {billboard.type}</p>
            <p className="text-gray-600">Status: {billboard.status}</p>

            <div className="flex space-x-2 mt-4">
              <Link href={`/inventory/${billboard.id}`}>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </Link>
              <Button variant="outline" size="sm">
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDelete(billboard.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredBillboards.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No billboards found matching your criteria.</p>
      )}
    </div>
  );
};

export default BillboardList;