import React from 'react';
// No mock data for expenses yet, so we'll use the dummy data from ExpenseList
const dummyExpenses = [
  {
    id: 'EXP001',
    description: 'Billboard BB001 Electricity Bill',
    category: 'Utilities',
    amount: 150,
    date: '2025-09-01',
    status: 'Paid',
  },
  {
    id: 'EXP002',
    description: 'Maintenance Team A Supplies',
    category: 'Supplies',
    amount: 300,
    date: '2025-09-05',
    status: 'Pending',
  },
  {
    id: 'EXP003',
    description: 'Office Rent',
    category: 'Rent',
    amount: 2000,
    date: '2025-09-01',
    status: 'Paid',
  },
];

interface Expense {
  id: string;
  description: string;
  category: string;
  amount: number;
  date: string;
  status: string; // e.g., 'Pending', 'Paid'
}

interface ExpenseDetailProps {
  expenseId: string;
}

const ExpenseDetail: React.FC<ExpenseDetailProps> = ({ expenseId }) => {
  const expense = dummyExpenses.find(e => e.id === expenseId);

  if (!expense) {
    return <p className="text-red-500">Expense not found.</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Expense: {expense.description}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <p><strong>Expense ID:</strong> {expense.id}</p>
          <p><strong>Description:</strong> {expense.description}</p>
          <p><strong>Category:</strong> {expense.category}</p>
          <p><strong>Amount:</strong> ${expense.amount.toLocaleString()}</p>
          <p><strong>Date:</strong> {expense.date}</p>
          <p><strong>Status:</strong> <span className={`font-semibold ${expense.status === 'Paid' ? 'text-green-600' : 'text-yellow-600'}`}>{expense.status}</span></p>
        </div>
        {/* Add more details or related information here */}
      </div>

      <div className="mt-6 flex space-x-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Edit Expense
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
          Mark as Paid
        </button>
      </div>
    </div>
  );
};

export default ExpenseDetail;