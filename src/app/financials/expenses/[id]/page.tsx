import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ExpenseDetail from '@/components/modules/financials/ExpenseDetail';

interface ExpenseDetailsPageProps {
  params: {
    id: string;
  };
}

const ExpenseDetailsPage: React.FC<ExpenseDetailsPageProps> = ({ params }) => {
  const { id } = params;

  return (
    <DashboardLayout>
      <ExpenseDetail expenseId={id} />
    </DashboardLayout>
  );
};

export default ExpenseDetailsPage;