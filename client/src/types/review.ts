export interface Iteration {
  iteration: number;
  junior_code: string;
  auditor_report: string;
  tech_lead_verdict: string;
  approved: boolean;
}

export interface RunStats {
  total_iterations: number;
  approved: boolean;
}

export interface RunResult {
  feature: string;
  iterations: Iteration[];
  stats: RunStats;
  language: string;
  timestamp: Date;
}

export interface ReviewRequest {
  feature: string;
  maxIterations: number;
  language: string;
}
