import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ClientDetail from '@/components/modules/clients/ClientDetail';

interface ClientDetailsPageProps {
  params: {
    id: string;
  };
}

const ClientDetailsPage: React.FC<ClientDetailsPageProps> = ({ params }) => {
  const { id } = params;

  return (
    <DashboardLayout>
      <ClientDetail clientId={id} />
    </DashboardLayout>
  );
};

export default ClientDetailsPage;