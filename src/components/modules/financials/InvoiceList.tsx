"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import invoicesData from '@/data/invoices.json'; // Mock data
import clientsData from '@/data/clients.json'; // To get client names

interface Invoice {
  id: string;
  client_id: string;
  campaign_id: string;
  issue_date: string;
  due_date: string;
  amount: number;
  status: string; // e.g., 'Pending', 'Paid', 'Overdue'
  items: Array<{ description: string; quantity: number; unit_price: number }>;
  payment_history: Array<{ date: string; amount: number; method: string }>;
}

const InvoiceList: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    // Simulate fetching data
    setInvoices(invoicesData as Invoice[]);
  }, []);

  const filteredInvoices = invoices.filter((invoice) => {
    const client = clientsData.find(c => c.id === invoice.client_id);
    const matchesSearch = invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (client && client.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === 'All' || invoice.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Invoices</h2>

      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search by invoice ID or client name..."
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
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
          <option value="Overdue">Overdue</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredInvoices.map((invoice) => {
          const client = clientsData.find(c => c.id === invoice.client_id);
          return (
            <div key={invoice.id} className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">Invoice: {invoice.id}</h3>
              <p className="text-gray-600">Client: {client ? client.name : invoice.client_id}</p>
              <p className="text-gray-600">Amount: ${invoice.amount.toLocaleString()}</p>
              <p className="text-gray-600">Status: {invoice.status}</p>
              <p className="text-gray-600">Due Date: {invoice.due_date}</p>
              <Link href={`/financials/invoices/${invoice.id}`} className="text-blue-500 hover:underline mt-2 block">
                View Details
              </Link>
            </div>
          );
        })}
      </div>

      {filteredInvoices.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No invoices found matching your criteria.</p>
      )}
    </div>
  );
};

export default InvoiceList;