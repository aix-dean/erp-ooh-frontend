"use client"; // This is a client component

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import DashboardOverview from "@/components/modules/reports/DashboardOverview"; // Reusing the overview component

export default function Home() {
  const { user, isAuthenticated, login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const success = await login(username, password);
      if (!success) {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4">Welcome to ERP OOH</h1>
          <p className="text-gray-600 mb-6">Please log in to access the dashboard.</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-6 text-sm text-gray-500">
            <p><strong>Test Credentials:</strong></p>
            <p>Admin: admin / password</p>
            <p>Sales: salesrep / password</p>
            <p>Operations: operations / password</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        Welcome, {user?.username}! ({user?.role} Dashboard)
      </h1>

      {/* Render different content based on user role */}
      {user?.role === "Admin" && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Admin Overview</h2>
          <DashboardOverview />
        </div>
      )}

      {user?.role === "Sales" && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Sales Performance</h2>
          {/* Specific sales widgets */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold">Proposals Sent</h3>
              <p className="text-2xl">120</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold">Bookings Closed</h3>
              <p className="text-2xl">45</p>
            </div>
          </div>
        </div>
      )}

      {user?.role === "Operations" && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Operations Status</h2>
          {/* Specific operations widgets */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold">Active Maintenance</h3>
              <p className="text-2xl">8</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold">Issues Reported</h3>
              <p className="text-2xl">3</p>
            </div>
          </div>
        </div>
      )}

      {/* Default overview for other roles or if no specific role dashboard */}
      {(!user || (user.role !== "Admin" && user.role !== "Sales" && user.role !== "Operations")) && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">General Overview</h2>
          <DashboardOverview />
        </div>
      )}
    </DashboardLayout>
  );
}
