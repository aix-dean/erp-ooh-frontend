"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
// No mock data for expenses yet, so we'll create some dummy data
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

const ExpenseList: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    // Simulate fetching data
    setExpenses(dummyExpenses as Expense[]);
  }, []);

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          expense.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || expense.category === filterCategory;
    const matchesStatus = filterStatus === 'All' || expense.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const uniqueCategories = Array.from(new Set(expenses.map(expense => expense.category)));

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Expenses</h2>

      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search by description or ID..."
          className="border rounded-md px-3 py-2 flex-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border rounded-md px-3 py-2"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          {uniqueCategories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <select
          className="border rounded-md px-3 py-2"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredExpenses.map((expense) => (
          <div key={expense.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">{expense.description}</h3>
            <p className="text-gray-600">ID: {expense.id}</p>
            <p className="text-gray-600">Category: {expense.category}</p>
            <p className="text-gray-600">Amount: ${expense.amount.toLocaleString()}</p>
            <p className="text-gray-600">Date: {expense.date}</p>
            <p className="text-gray-600">Status: {expense.status}</p>
            <Link href={`/financials/expenses/${expense.id}`} className="text-blue-500 hover:underline mt-2 block">
              View Details
            </Link>
          </div>
        ))}
      </div>

      {filteredExpenses.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No expenses found matching your criteria.</p>
      )}
    </div>
  );
};

export default ExpenseList;