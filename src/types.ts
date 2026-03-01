import { Type } from "@google/genai";

export interface ProjectStats {
  progress: number;
  tasksCompleted: number;
  totalTasks: number;
  budgetUsed: number;
  totalBudget: number;
  costVariance: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  workload: number; // 0-100 percentage
}

export interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  category: 'hardware' | 'software' | 'design' | 'testing';
  startDate: string;
  endDate: string;
  progress: number;
  dependencies?: string[];
  assigneeId?: string;
}

export interface TechnicalResource {
  id: string;
  name: string;
  type: 'component' | 'tool' | 'material';
  quantity: number;
  unit: string;
  phaseId: string;
}

export interface ProjectDocument {
  id: string;
  title: string;
  category: 'technical' | 'plan' | 'report' | 'spec';
  version: string;
  lastModified: string;
  history: { version: string; date: string; change: string }[];
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  attendees: string[];
  agreements: string[];
  decisions: string[];
}

export interface ProjectRisk {
  id: string;
  description: string;
  probability: number; // 1-5
  impact: number; // 1-5
  mitigation: string;
  status: 'identified' | 'mitigated' | 'occurred' | 'closed';
}

export interface Stakeholder {
  id: string;
  name: string;
  role: string;
  interest: number; // 1-5
  influence: number; // 1-5
  expectations: string;
  lastInteraction: string;
}

export interface AIReport {
  statusSummary: string;
  potentialDelays: string[];
  emergingRisks: string[];
  recommendations: string[];
}

export interface ScopeChange {
  id: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  status: 'pending' | 'approved' | 'rejected';
  date: string;
  requestedBy: string;
}

export interface PhaseBudget {
  id: string;
  phaseName: string;
  estimatedCost: number;
  actualCost: number;
}

export interface QualityCriterion {
  id: string;
  criterion: string;
  requirement: string;
  status: 'pending' | 'passed' | 'failed';
}

export interface TechnicalTest {
  id: string;
  testName: string;
  date: string;
  result: 'pass' | 'fail' | 'in-progress';
  notes: string;
}

export interface Defect {
  id: string;
  description: string;
  severity: 'low' | 'medium' | 'critical';
  status: 'open' | 'in-fix' | 'resolved' | 'closed';
  reportedDate: string;
}

export interface Milestone {
  id: string;
  title: string;
  date: string;
  completed: boolean;
  description: string;
}

export interface TechnicalSpec {
  id: string;
  category: string;
  item: string;
  status: 'defined' | 'in-development' | 'validated';
}

export interface SuccessMetric {
  label: string;
  target: string;
  current: string;
}

export interface StrategicObjective {
  id: string;
  title: string;
  description: string;
  metrics: SuccessMetric[];
}

export interface ProjectScope {
  productDescription: string;
  inclusions: string[];
  exclusions: string[];
}

export interface Deliverable {
  id: string;
  title: string;
  status: 'pending' | 'in-review' | 'approved';
  dueDate: string;
  owner: string;
}

export interface WBSNode {
  id: string;
  label: string;
  type: 'phase' | 'deliverable' | 'task';
  children?: WBSNode[];
}
