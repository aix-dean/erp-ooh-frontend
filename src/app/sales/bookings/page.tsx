import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import BookingList from '@/components/modules/sales/BookingList';

const BookingsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Bookings</h1>
      <BookingList />
    </DashboardLayout>
  );
};

export default BookingsPage;