"use client";

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import Search from '@/components/ui/Search';
import Breadcrumb from '@/components/ui/Breadcrumb';

interface NavbarProps {
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

const Navbar: React.FC<NavbarProps> = ({ breadcrumbs = [{ label: 'Dashboard' }] }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-white p-4 shadow-md">
      <div className="flex justify-between items-center mb-2">
        <Breadcrumb items={breadcrumbs} />
        <div className="flex items-center space-x-4">
          <Search className="w-64" />

          {/* Notifications Icon */}
          <button className="relative p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
            🔔
            <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
          </button>

          {/* User Profile/Avatar */}
          <div className="relative group">
            <button className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1 hover:bg-gray-200">
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                {user?.username?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span className="text-gray-700 hidden md:block">{user?.username || 'User'}</span>
              <span className="text-xs text-gray-500 hidden lg:block">({user?.role})</span>
            </button>

            {/* Dropdown menu */}
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              <div className="py-1">
                <div className="px-4 py-2 text-sm text-gray-500 border-b">
                  Signed in as <strong>{user?.username}</strong>
                </div>
                <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;