"use client";

import React, { useState, useEffect } from 'react';
import campaignsData from '@/data/campaigns.json'; // Mock data
import clientsData from '@/data/clients.json'; // To get client names

interface Campaign {
  id: string;
  client_id: string;
  name: string;
  start_date: string;
  end_date: string;
  objectives: string;
  billboards: Array<{ billboard_id: string; creative_asset_id: string }>;
  status: string;
  creative_assets: Array<{ id: string; name: string; url: string; version: number }>;
}

const CampaignCalendar: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    // Simulate fetching data
    setCampaigns(campaignsData as Campaign[]);
  }, []);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay(); // 0 for Sunday, 1 for Monday

  const goToPreviousMonth = () => {
    setCurrentMonth(prevMonth => new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(prevMonth => new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 1));
  };

  const getCampaignsForDay = (day: Date) => {
    return campaigns.filter(campaign => {
      const campaignStart = new Date(campaign.start_date);
      const campaignEnd = new Date(campaign.end_date);
      return day >= campaignStart && day <= campaignEnd;
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Campaign Scheduling Calendar</h2>

      <div className="flex justify-between items-center mb-4">
        <button onClick={goToPreviousMonth} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Previous
        </button>
        <h3 className="text-xl font-semibold">
          {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h3>
        <button onClick={goToNextMonth} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Next
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="font-bold text-gray-700">{day}</div>
        ))}
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className="p-2 bg-gray-200 rounded-md"></div>
        ))}
        {daysInMonth.map((day, index) => (
          <div key={index} className="p-2 bg-white rounded-md border border-gray-200 h-24 overflow-y-auto">
            <p className="font-semibold text-gray-800">{day.getDate()}</p>
            {getCampaignsForDay(day).map(campaign => (
              <div key={campaign.id} className="bg-blue-100 text-blue-800 text-xs rounded-sm p-1 mt-1 truncate">
                {campaign.name}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampaignCalendar;