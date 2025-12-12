import React, { useEffect, useState, useCallback } from 'react';
import RiskStatusIndicator from './components/RiskStatusIndicator';
import { fetchDailySupplyChainSummary } from './services/summaryService';
import { DashboardData } from './types';

// Main application component, simulating a Next.js page.tsx
const App: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboardData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchDailySupplyChainSummary();
      setDashboardData(data);
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
      setError("Failed to load daily summary. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array means this function is created once

  useEffect(() => {
    loadDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only initialize data once on mount

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">Loading daily insights...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl text-center">
          <p className="text-red-600 dark:text-red-400 text-lg font-semibold">{error}</p>
          <button
            onClick={loadDashboardData}
            className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const { riskStatus, dailySummary } = dashboardData!; // We know it's not null here

  return (
    <div className="min-h-screen flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="w-full max-w-4xl text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-700 dark:text-indigo-400 leading-tight">
          The Sentinel: Supply Chain Dashboard
        </h1>
        <p className="mt-3 text-lg sm:text-xl text-gray-600 dark:text-gray-400">
          Intelligent Insights for Proactive Inventory Management
        </p>
      </header>

      {/* Dashboard Content */}
      <main className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 sm:p-8 lg:p-10">
        {/* Risk Status Section */}
        <section className="mb-8 flex flex-col sm:flex-row justify-between items-center pb-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 sm:mb-0">Current Risk Overview</h2>
          <RiskStatusIndicator status={riskStatus} />
        </section>

        {/* Daily Summary Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Daily Summary</h2>
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {dailySummary.riskSummary}
            </p>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-right">
              Last updated: {new Date(dailySummary.timestamp).toLocaleString()}
            </p>
          </div>
        </section>
      </main>

      {/* Footer (optional, for enterprise feel) */}
      <footer className="mt-12 text-center text-gray-500 dark:text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} The Sentinel. All rights reserved. Powered by Kestra & Google Gemini.
      </footer>
    </div>
  );
};

export default App;
