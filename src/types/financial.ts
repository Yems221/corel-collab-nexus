
export interface FundraisingTransaction {
  id: string;
  date: Date;
  amount: number;
  source: string;
  description: string;
  status: 'completed' | 'pending' | 'cancelled';
  type: 'donation' | 'grant' | 'event' | 'membership' | 'other';
}

export interface FundraisingCampaign {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  startDate: Date;
  endDate: Date | null;
  status: 'active' | 'completed' | 'planned';
}

export interface FinancialStats {
  totalRaised: number;
  totalExpenses: number;
  balance: number;
  campaignsCount: number;
}

export interface FinancialSummary {
  stats: FinancialStats;
  recentTransactions: FundraisingTransaction[];
  activeCampaigns: FundraisingCampaign[];
}
