import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* This is the main layout container. Sidebar and Navbar will be rendered here. */}
      {children}
    </div>
  );
};

export default Layout;