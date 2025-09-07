import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const FinancialsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Financials</h1>
      <p>This page will display financial overview, invoices, and expenses.</p>
      {/* Placeholder for FinancialDashboard, InvoiceList, and ExpenseList components */}
    </DashboardLayout>
  );
};

export default FinancialsPage;