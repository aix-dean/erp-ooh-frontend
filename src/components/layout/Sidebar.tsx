"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { user } = useAuth();

  const allNavItems = [
    { name: 'Dashboard', href: '/', icon: '📊', roles: ['all'] },
    { name: 'Inventory', href: '/inventory', icon: '📦', roles: ['Admin', 'Operations', 'Logistics'] },
    { name: 'Sales & Booking', href: '/sales', icon: '💰', roles: ['Admin', 'Sales'] },
    { name: 'Campaigns', href: '/campaigns', icon: '📢', roles: ['Admin', 'Sales', 'Client'] },
    { name: 'Maintenance', href: '/maintenance', icon: '🔧', roles: ['Admin', 'Operations'] },
    { name: 'Logistics', href: '/logistics', icon: '🚚', roles: ['Admin', 'Logistics'] },
    { name: 'Reports', href: '/reports', icon: '📈', roles: ['Admin', 'Finance', 'Operations'] },
    { name: 'Clients', href: '/clients', icon: '👥', roles: ['Admin', 'Sales'] },
    { name: 'Financials', href: '/financials', icon: '💳', roles: ['Admin', 'Finance'] },
    { name: 'Users', href: '/users', icon: '👤', roles: ['Admin'] },
  ];

  const userRole = user?.role || 'Client';
  const navItems = allNavItems.filter(item =>
    item.roles.includes('all') || item.roles.includes(userRole) || userRole === 'Admin'
  );

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <div className="text-2xl font-bold">ERP OOH</div>
        <div className="text-sm text-gray-400 mt-1">Out-of-Home Advertising</div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-700">
        <div className="text-xs text-gray-400">
          Logged in as: <span className="text-white font-medium">{user?.username}</span>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Role: {user?.role}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;