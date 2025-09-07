import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import BookingDetail from '@/components/modules/sales/BookingDetail';

interface BookingDetailsPageProps {
  params: {
    id: string;
  };
}

const BookingDetailsPage: React.FC<BookingDetailsPageProps> = ({ params }) => {
  const { id } = params;

  return (
    <DashboardLayout>
      <BookingDetail bookingId={id} />
    </DashboardLayout>
  );
};

export default BookingDetailsPage;