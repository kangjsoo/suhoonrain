import React from 'react';

export interface DiagnosisResult {
  diagnosis: string;
  severity: '경미' | '보통' | '긴급';
  action_tips: string;
  estimated_time: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}