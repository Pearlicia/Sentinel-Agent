export type RiskStatus = 'Green' | 'Red';

export interface DailySummary {
  riskSummary: string;
  timestamp: string;
}

export interface DashboardData {
  riskStatus: RiskStatus;
  dailySummary: DailySummary;
}
