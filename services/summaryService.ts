import { DashboardData, RiskStatus } from '../types';

/**
 * Simulates fetching daily supply chain summary data.
 * In a real application, this would make an API call to a backend
 * that retrieves the output from the Kestra workflow.
 *
 * For this hackathon demo, it returns mock data.
 */
export const fetchDailySupplyChainSummary = async (): Promise<DashboardData> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Mock data for demonstration purposes
  const mockSummaries = [
    {
      riskSummary: "Inventory levels are stable across most product lines. A few items are approaching reorder points but are not critical. Overall supply chain health is good with no immediate concerns.",
      timestamp: new Date().toISOString(),
      riskStatus: 'Green' as RiskStatus,
    },
    {
      riskSummary: "Several key products, including 'Laptop Pro' and 'Smartwatch X', have stock levels below 50 units. This indicates a high risk of stockouts in the coming weeks. Urgent action is required to replenish these critical items and avoid potential sales loss.",
      timestamp: new Date().toISOString(),
      riskStatus: 'Red' as RiskStatus,
    },
  ];

  // Randomly return a green or red scenario
  const randomIndex = Math.floor(Math.random() * mockSummaries.length);
  return {
    riskStatus: mockSummaries[randomIndex].riskStatus,
    dailySummary: {
      riskSummary: mockSummaries[randomIndex].riskSummary,
      timestamp: mockSummaries[randomIndex].timestamp,
    },
  };
};
