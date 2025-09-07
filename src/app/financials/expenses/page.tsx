import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ExpenseList from '@/components/modules/financials/ExpenseList';

const ExpensesPage: React.FC = () => {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Expenses</h1>
      <ExpenseList />
    </DashboardLayout>
  );
};

export default ExpensesPage;