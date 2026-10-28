import React from 'react';
import { IncidentStatus, SeverityLevel } from '../types';

export const StatusBadge: React.FC<{ status: IncidentStatus }> = ({ status }) => {
  const configs: Record<IncidentStatus, { label: string; bg: string; text: string; dot: string }> = {
    REPORTED: { label: 'Reported', bg: 'bg-neutral-800/80', text: 'text-neutral-300', dot: 'bg-neutral-400' },
    INVESTIGATING: { label: 'Investigating', bg: 'bg-amber-950/60 border border-amber-800/40', text: 'text-amber-400', dot: 'bg-amber-500 animate-pulse' },
    ASSIGNED: { label: 'Tech Assigned', bg: 'bg-blue-950/60 border border-blue-800/40', text: 'text-blue-400', dot: 'bg-blue-500' },
    IN_PROGRESS: { label: 'In Progress', bg: 'bg-indigo-950/60 border border-indigo-800/40', text: 'text-indigo-300', dot: 'bg-indigo-400 animate-pulse' },
    RESOLVED: { label: 'Resolved', bg: 'bg-emerald-950/60 border border-emerald-800/40', text: 'text-emerald-400', dot: 'bg-emerald-500' },
    VERIFIED: { label: 'Verified & Closed', bg: 'bg-teal-950/60 border border-teal-800/40', text: 'text-teal-300', dot: 'bg-teal-400' },
  };

  const config = configs[status] || configs.REPORTED;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium ${config.bg} ${config.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      <span>{config.label}</span>
    </span>
  );
};

export const SeverityBadge: React.FC<{ severity: SeverityLevel }> = ({ severity }) => {
  const configs: Record<SeverityLevel, { label: string; color: string }> = {
    LOW: { label: 'LOW SEVERITY', color: 'border-emerald-500/40 text-emerald-400 bg-emerald-950/30' },
    MEDIUM: { label: 'MED SEVERITY', color: 'border-amber-500/40 text-amber-400 bg-amber-950/30' },
    HIGH: { label: 'HIGH SEVERITY', color: 'border-rose-500/40 text-rose-400 bg-rose-950/30' },
    CRITICAL: { label: 'CRITICAL RIPPLE', color: 'border-[#D9383A] text-white bg-[#D9383A]/40 font-bold animate-pulse' },
  };

  const config = configs[severity] || configs.MEDIUM;

  return (
    <span className={`px-2 py-0.5 border text-[10px] font-mono tracking-wider rounded ${config.color}`}>
      {config.label}
    </span>
  );
};
