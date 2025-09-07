import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import UserDetail from '@/components/modules/users/UserDetail';

interface UserDetailsPageProps {
  params: {
    id: string;
  };
}

const UserDetailsPage: React.FC<UserDetailsPageProps> = ({ params }) => {
  const { id } = params;

  return (
    <DashboardLayout>
      <UserDetail userId={id} />
    </DashboardLayout>
  );
};

export default UserDetailsPage;