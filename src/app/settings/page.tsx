import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const SettingsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <p>This page will contain general application settings.</p>
      {/* Placeholder for various setting components */}
    </DashboardLayout>
  );
};

export default SettingsPage;