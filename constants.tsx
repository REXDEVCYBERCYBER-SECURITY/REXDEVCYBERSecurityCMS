
import React from 'react';

export const COLORS = {
  primary: '#3b82f6',
  secondary: '#10b981',
  danger: '#ef4444',
  warning: '#f59e0b',
  bg: '#020617',
  surface: '#0f172a'
};

export const MOCK_TASKS = [
  { id: '1', title: 'Implement TLS 1.3', description: 'Upgrade all endpoints to support the latest TLS standard.', priority: 'high', status: 'IN_PROGRESS' },
  { id: '2', title: 'Database Encryption', description: 'Ensure all PII data is encrypted at rest using AES-256.', priority: 'high', status: 'BACKLOG' },
  { id: '3', title: 'Audit API Tokens', description: 'Review and rotate expired or unused API keys.', priority: 'medium', status: 'DONE' },
  { id: '4', title: 'XSS Vulnerability Patch', description: 'Fix the sanitization issue in the comments section.', priority: 'high', status: 'REVIEW' },
];
