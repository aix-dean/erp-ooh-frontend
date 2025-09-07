import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import UserList from '@/components/modules/users/UserList';

const UsersPage: React.FC = () => {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">User & Access Management</h1>
      <UserList />
    </DashboardLayout>
  );
};

export default UsersPage;