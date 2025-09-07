"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import billboardsData from '@/data/billboards.json'; // Mock data for billboards
import jobOrdersData from '@/data/jobOrders.json'; // Mock data for job orders (maintenance tasks)

interface Billboard {
  id: string;
  location: {
    address: string;
  };
}

interface MaintenanceTask {
  id: string;
  billboard_id: string;
  type: string; // e.g., 'Routine Cleaning', 'Repair', 'Inspection'
  description: string;
  assigned_team: string;
  priority: string;
  status: string; // e.g., 'Pending', 'In Progress', 'Completed'
  created_date: string;
  due_date: string;
}

const MaintenanceSchedule: React.FC = () => {
  const [tasks, setTasks] = useState<MaintenanceTask[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterTeam, setFilterTeam] = useState('All');

  useEffect(() => {
    // Simulate fetching data
    // Filter job orders to only include maintenance-related tasks
    const maintenanceTasks = (jobOrdersData as MaintenanceTask[]).filter(job =>
      job.type === 'Installation' || job.type === 'Repair' || job.type === 'Maintenance' || job.type === 'Creative Change'
    );
    setTasks(maintenanceTasks);
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const billboard = billboardsData.find(b => b.id === task.billboard_id);
    const matchesSearch = task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          task.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (billboard && billboard.location.address.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === 'All' || task.status === filterStatus;
    const matchesTeam = filterTeam === 'All' || task.assigned_team === filterTeam;
    return matchesSearch && matchesStatus && matchesTeam;
  });

  const uniqueTeams = Array.from(new Set(tasks.map(task => task.assigned_team)));

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Maintenance Schedule</h2>

      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search by description, ID, or location..."
          className="border rounded-md px-3 py-2 flex-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border rounded-md px-3 py-2"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <select
          className="border rounded-md px-3 py-2"
          value={filterTeam}
          onChange={(e) => setFilterTeam(e.target.value)}
        >
          <option value="All">All Teams</option>
          {uniqueTeams.map(team => (
            <option key={team} value={team}>{team}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTasks.map((task) => {
          const billboard = billboardsData.find(b => b.id === task.billboard_id);
          return (
            <div key={task.id} className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">Task: {task.description}</h3>
              <p className="text-gray-600">ID: {task.id}</p>
              <p className="text-gray-600">Billboard: {billboard ? billboard.location.address : task.billboard_id}</p>
              <p className="text-gray-600">Assigned Team: {task.assigned_team}</p>
              <p className="text-gray-600">Status: {task.status}</p>
              <p className="text-gray-600">Due Date: {task.due_date}</p>
              <Link href={`/maintenance/issues/${task.id}`} className="text-blue-500 hover:underline mt-2 block">
                View Details
              </Link>
            </div>
          );
        })}
      </div>

      {filteredTasks.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No maintenance tasks found.</p>
      )}
    </div>
  );
};

export default MaintenanceSchedule;