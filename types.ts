
export enum UserRole {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  VIEWER = 'VIEWER'
}

export interface UserProfile {
  name: string;
  role: UserRole;
  avatar?: string;
}

export enum TaskStatus {
  BACKLOG = 'BACKLOG',
  IN_PROGRESS = 'IN_PROGRESS',
  REVIEW = 'REVIEW',
  DONE = 'DONE'
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: TaskStatus;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  tags: string[];
  lastSaved: Date;
  author: string;
}

export interface SecurityScanResult {
  vulnerability: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  remediationExplanation: string;
  remediationCode: string;
  lineNumber?: string;
  codeSnippet?: string;
  cweId?: string;
  mitigationSteps?: string[];
}
