"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  role: string;
  permissions: string[];
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mock user data (replace with actual API call in a real application)
  const mockUsers: User[] = [
    { id: '1', username: 'admin', role: 'Admin', permissions: ['all'] },
    { id: '2', username: 'salesrep', role: 'Sales', permissions: ['view_sales', 'create_proposal', 'manage_bookings'] },
    { id: '3', username: 'operations', role: 'Operations', permissions: ['view_maintenance', 'schedule_maintenance', 'track_issues'] },
    { id: '4', username: 'logistics', role: 'Logistics', permissions: ['view_job_orders', 'assign_job_orders', 'track_materials'] },
    { id: '5', username: 'finance', role: 'Finance', permissions: ['view_financials', 'generate_invoices', 'track_payments'] },
    { id: '6', username: 'client', role: 'Client', permissions: ['view_campaigns', 'view_invoices'] },
  ];

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = mockUsers.find(u => u.username === username && password === 'password'); // Simple password check
        if (foundUser) {
          setUser(foundUser);
          setIsAuthenticated(true);
          resolve(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
          resolve(false);
        }
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    if (user.role === 'Admin') return true; // Admin has all permissions
    return user.permissions.includes(permission);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};