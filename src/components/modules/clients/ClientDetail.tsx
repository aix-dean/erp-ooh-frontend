import React from 'react';
import Link from 'next/link';
import clientsData from '@/data/clients.json'; // Mock data
import campaignsData from '@/data/campaigns.json'; // To show client's campaigns
import invoicesData from '@/data/invoices.json'; // To show client's invoices

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

interface ClientDetailProps {
  clientId: string;
}

const ClientDetail: React.FC<ClientDetailProps> = ({ clientId }) => {
  const client = (clientsData as Client[]).find(c => c.id === clientId);

  if (!client) {
    return <p className="text-red-500">Client not found.</p>;
  }

  const clientCampaigns = campaignsData.filter(campaign => campaign.client_id === clientId);
  const clientInvoices = invoicesData.filter(invoice => invoice.client_id === clientId);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Client: {client.name}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <p><strong>Client ID:</strong> {client.id}</p>
          <p><strong>Contact Person:</strong> {client.contact_person}</p>
          <p><strong>Email:</strong> {client.email}</p>
          <p><strong>Phone:</strong> {client.phone}</p>
          <p><strong>Company Info:</strong> {client.company_info}</p>
          <p><strong>Industry:</strong> {client.industry}</p>
          <p><strong>Address:</strong> {client.address}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Communication Log</h3>
          {client.communication_log && client.communication_log.length > 0 ? (
            <ul>
              {client.communication_log.map((log, index) => (
                <li key={index} className="mb-1">
                  <strong>{log.date} ({log.type}):</strong> {log.subject} - {log.notes}
                </li>
              ))}
            </ul>
          ) : (
            <p>No communication history.</p>
          )}

          <h3 className="text-xl font-semibold mt-4 mb-2">Tasks</h3>
          {client.tasks && client.tasks.length > 0 ? (
            <ul>
              {client.tasks.map((task, index) => (
                <li key={index} className="mb-1">
                  <strong>{task.due_date}:</strong> {task.description} (Status: {task.status})
                </li>
              ))}
            </ul>
          ) : (
            <p>No tasks for this client.</p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Past Campaigns</h3>
        {clientCampaigns.length > 0 ? (
          <ul>
            {clientCampaigns.map(campaign => (
              <li key={campaign.id}>
                <Link href={`/campaigns/${campaign.id}`} className="text-blue-500 hover:underline">
                  {campaign.name} ({campaign.start_date} - {campaign.end_date})
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No past campaigns for this client.</p>
        )}
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Invoices</h3>
        {clientInvoices.length > 0 ? (
          <ul>
            {clientInvoices.map(invoice => (
              <li key={invoice.id}>
                <Link href={`/financials/invoices/${invoice.id}`} className="text-blue-500 hover:underline">
                  Invoice {invoice.id} - ${invoice.amount} ({invoice.status})
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No invoices for this client.</p>
        )}
      </div>

      <div className="mt-6 flex space-x-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Edit Client
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
          Create New Proposal
        </button>
      </div>
    </div>
  );
};

export default ClientDetail;