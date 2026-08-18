export interface Initiative {
  id: string;
  num: string;
  title: string;
  description: string;
  impact: string;
  pillarId: string;
  status: 'planned' | 'in-progress' | 'completed' | 'delayed';
  priority: 'high' | 'medium' | 'low';
  startDate?: string;
  endDate?: string;
  budget?: number;
  team?: string[];
  responsiblePerson?: string;
  kpis?: string[];
  risks?: string[];
  beneficiaries?: string[];
  dependencies?: string[];
  progress?: number;
}

export interface Pillar {
  id: string;
  icon: 'people' | 'gear' | 'star' | 'chart' | 'rocket';
  title: string;
  description: string;
  chips: string[];
  initiatives: Initiative[];
  totalBudget?: number;
  completionPercentage?: number;
}

export interface FilterOptions {
  searchQuery: string;
  status: string[];
  priority: string[];
  pillarId: string[];
}

export interface ExportFormat {
  type: 'pdf' | 'excel' | 'csv';
  includeCharts: boolean;
  includeBudget: boolean;
}

export interface ImpactEffortMatrix {
  initiativeId: string;
  title: string;
  impact: number; // 1-10
  effort: number; // 1-10
  pillarId: string;
}

export interface DashboardMetrics {
  totalInitiatives: number;
  completedInitiatives: number;
  inProgressInitiatives: number;
  delayedInitiatives: number;
  totalBudget: number;
  averageProgress: number;
  highPriorityCount: number;
}
