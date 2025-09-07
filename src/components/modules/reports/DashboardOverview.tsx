"use client";

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import RevenueWidget from '@/components/ui/widgets/RevenueWidget';
import ActiveCampaignsWidget from '@/components/ui/widgets/ActiveCampaignsWidget';
import AvailableBillboardsWidget from '@/components/ui/widgets/AvailableBillboardsWidget';
import PendingMaintenanceWidget from '@/components/ui/widgets/PendingMaintenanceWidget';
import SalesChartWidget from '@/components/ui/widgets/SalesChartWidget';
import OccupancyChartWidget from '@/components/ui/widgets/OccupancyChartWidget';
import BillboardMapWidget from '@/components/ui/widgets/BillboardMapWidget';

const DashboardOverview: React.FC = () => {
  const { user } = useAuth();
  const [selectedWidgets, setSelectedWidgets] = useState<string[]>([
    'revenue', 'activeCampaigns', 'availableBillboards', 'pendingMaintenance', 'salesChart', 'occupancyChart', 'billboardMap'
  ]);

  // Define widgets available for each role
  const roleWidgets: { [key: string]: string[] } = {
    Admin: ['revenue', 'activeCampaigns', 'availableBillboards', 'pendingMaintenance', 'salesChart', 'occupancyChart', 'billboardMap'],
    Sales: ['revenue', 'activeCampaigns', 'salesChart', 'billboardMap'],
    Operations: ['availableBillboards', 'pendingMaintenance', 'occupancyChart', 'billboardMap'],
    Logistics: ['availableBillboards', 'pendingMaintenance', 'billboardMap'],
    Finance: ['revenue', 'salesChart'],
    Client: ['activeCampaigns', 'revenue', 'billboardMap']
  };

  const userRole = user?.role || 'Client';
  const allowedWidgets = roleWidgets[userRole] || [];
  const visibleWidgets = selectedWidgets.filter(widget => allowedWidgets.includes(widget));

  const widgetComponents: { [key: string]: React.ComponentType } = {
    revenue: RevenueWidget,
    activeCampaigns: ActiveCampaignsWidget,
    availableBillboards: AvailableBillboardsWidget,
    pendingMaintenance: PendingMaintenanceWidget,
    salesChart: SalesChartWidget,
    occupancyChart: OccupancyChartWidget,
    billboardMap: BillboardMapWidget
  };

  const toggleWidget = (widgetId: string) => {
    setSelectedWidgets(prev =>
      prev.includes(widgetId)
        ? prev.filter(id => id !== widgetId)
        : [...prev, widgetId]
    );
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
        <div className="flex flex-wrap gap-2">
          {allowedWidgets.map(widgetId => {
            const WidgetComponent = widgetComponents[widgetId];
            const isSelected = selectedWidgets.includes(widgetId);
            return (
              <button
                key={widgetId}
                onClick={() => toggleWidget(widgetId)}
                className={`px-3 py-1 rounded ${isSelected ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                {widgetId.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleWidgets.map(widgetId => {
          const WidgetComponent = widgetComponents[widgetId];
          return <WidgetComponent key={widgetId} />;
        })}
      </div>
    </div>
  );
};

export default DashboardOverview;
