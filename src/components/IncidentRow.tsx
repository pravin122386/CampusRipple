import React from 'react';
import { Incident } from '../types';
import { StatusBadge, SeverityBadge } from './StatusBadge';
import { MapPin, Users, ArrowUpRight, Activity } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const IncidentRow: React.FC<{ incident: Incident }> = ({ incident }) => {
  const { navigate, setSelectedIncident } = useApp();

  const handleSelect = () => {
    setSelectedIncident(incident);
    navigate(`/incident/${incident.id}`);
  };

  return (
    <div
      onClick={handleSelect}
      className="group relative bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 p-5 rounded-xl transition-all duration-150 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm"
    >
      {/* Indicator bar for impact severity */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l bg-rose-500"
        style={{ opacity: Math.max(0.4, incident.impactLevelPercentage / 100) }}
      />

      {/* Main content info */}
      <div className="flex-1 space-y-2 pl-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono text-xs text-rose-400 font-semibold">{incident.id}</span>
          <StatusBadge status={incident.status} />
          <SeverityBadge severity={incident.severity} />
        </div>

        <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-rose-400 transition-colors leading-tight">
          {incident.title}
        </h3>

        <div className="flex items-center gap-4 text-xs text-slate-400 flex-wrap">
          <span className="flex items-center gap-1 text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-rose-500" />
            {incident.locationName}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <strong className="text-slate-200 font-mono">{incident.affectedUsersCount}</strong> Students Affected
          </span>
          <span>•</span>
          <span className="text-slate-400">
            Reported by {incident.reportedBy}
          </span>
        </div>
      </div>

      {/* Impact Score & Action trigger */}
      <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 border-slate-800 pt-3 md:pt-0">
        <div className="text-left md:text-right">
          <div className="flex items-center gap-1.5 md:justify-end text-xs text-slate-400">
            <Activity className="w-3.5 h-3.5 text-rose-500" />
            <span>Impact Score</span>
          </div>
          <div className="text-xl font-bold font-mono text-white group-hover:text-rose-400 transition-colors">
            {incident.impactLevelPercentage}%
          </div>
        </div>

        <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center group-hover:bg-rose-600 group-hover:border-rose-600 group-hover:text-white text-slate-300 transition-colors">
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </div>
  );
};
