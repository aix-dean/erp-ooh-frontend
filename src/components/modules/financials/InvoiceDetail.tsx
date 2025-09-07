import React from 'react';
import Link from 'next/link';
import invoicesData from '@/data/invoices.json'; // Mock data
import clientsData from '@/data/clients.json'; // To get client names
import campaignsData from '@/data/campaigns.json'; // To get campaign details

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

interface InvoiceDetailProps {
  invoiceId: string;
}

const InvoiceDetail: React.FC<InvoiceDetailProps> = ({ invoiceId }) => {
  const invoice = (invoicesData as Invoice[]).find(i => i.id === invoiceId);

  if (!invoice) {
    return <p className="text-red-500">Invoice not found.</p>;
  }

  const client = clientsData.find(c => c.id === invoice.client_id);
  const campaign = campaignsData.find(c => c.id === invoice.campaign_id);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Invoice: {invoice.id}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <p><strong>Invoice ID:</strong> {invoice.id}</p>
          <p><strong>Client:</strong> {client ? client.name : 'N/A'} (<Link href={`/clients/${invoice.client_id}`} className="text-blue-500 hover:underline">{invoice.client_id}</Link>)</p>
          <p><strong>Campaign:</strong> {campaign ? campaign.name : 'N/A'} (<Link href={`/campaigns/${invoice.campaign_id}`} className="text-blue-500 hover:underline">{invoice.campaign_id}</Link>)</p>
          <p><strong>Issue Date:</strong> {invoice.issue_date}</p>
          <p><strong>Due Date:</strong> {invoice.due_date}</p>
          <p><strong>Amount:</strong> ${invoice.amount.toLocaleString()}</p>
          <p><strong>Status:</strong> <span className={`font-semibold ${invoice.status === 'Paid' ? 'text-green-600' : invoice.status === 'Overdue' ? 'text-red-600' : 'text-yellow-600'}`}>{invoice.status}</span></p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Items</h3>
          {invoice.items && invoice.items.length > 0 ? (
            <ul>
              {invoice.items.map((item, index) => (
                <li key={index}>{item.description} ({item.quantity} x ${item.unit_price})</li>
              ))}
            </ul>
          ) : (
            <p>No items listed for this invoice.</p>
          )}

          <h3 className="text-xl font-semibold mt-4 mb-2">Payment History</h3>
          {invoice.payment_history && invoice.payment_history.length > 0 ? (
            <ul>
              {invoice.payment_history.map((payment, index) => (
                <li key={index}>
                  {payment.date}: ${payment.amount.toLocaleString()} ({payment.method})
                </li>
              ))}
            </ul>
          ) : (
            <p>No payment history.</p>
          )}
        </div>
      </div>

      <div className="mt-6 flex space-x-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Mark as Paid
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
          Send Reminder
        </button>
      </div>
    </div>
  );
};

export default InvoiceDetail;