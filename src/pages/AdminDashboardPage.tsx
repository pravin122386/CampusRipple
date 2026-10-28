import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TECHNICIANS_LIST } from '../data/mockData';
import { IncidentStatus, SeverityLevel } from '../types';
import { StatusBadge, SeverityBadge } from '../components/StatusBadge';
import { ShieldCheck, UserCheck, Activity, CheckCircle2, Wrench, AlertTriangle, ArrowUpRight } from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { incidents, updateIncidentStatus, assignTechnician, navigate, setSelectedIncident } = useApp();
  const [selectedTech, setSelectedTech] = useState<Record<string, string>>({});
  const [resolutionNote, setResolutionNote] = useState<Record<string, string>>({});

  const criticalCount = incidents.filter(i => i.severity === 'CRITICAL' && i.status !== 'RESOLVED').length;
  const unassignedCount = incidents.filter(i => !i.assignedTechnician && i.status !== 'RESOLVED').length;
  const inProgressCount = incidents.filter(i => i.status === 'IN_PROGRESS' || i.status === 'INVESTIGATING').length;

  const handleStatusChange = (id: string, status: IncidentStatus) => {
    const summary = resolutionNote[id] || 'Technician resolved hardware & network nodes.';
    updateIncidentStatus(id, status, summary);
  };

  const handleAssignTech = (incidentId: string, techId: string) => {
    const techObj = TECHNICIANS_LIST.find(t => t.id === techId);
    if (techObj) {
      assignTechnician(incidentId, techObj.name, techObj.id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
            Staff & Technician Console
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
            Admin Operations Panel
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Assign technicians, update ticket status, review resolutions, and manage campus facilities.
          </p>
        </div>

        <div className="px-4 py-2 bg-blue-950/40 border border-blue-800/40 rounded-full font-mono text-xs text-blue-300 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-400" />
          <span>ADMIN PRIVILEGES ACTIVE</span>
        </div>
      </div>

      {/* Admin Operations Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
        <div className="p-6 bg-[#161920] rounded-2xl hairline-border space-y-2">
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span>CRITICAL ESCALATIONS</span>
            <AlertTriangle className="w-4 h-4 text-[#D9383A]" />
          </div>
          <div className="text-4xl font-serif-headline font-bold text-white">{criticalCount}</div>
          <p className="text-[11px] text-neutral-500">Immediate dispatch required</p>
        </div>

        <div className="p-6 bg-[#161920] rounded-2xl hairline-border space-y-2">
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span>UNASSIGNED REPORTS</span>
            <Wrench className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-4xl font-serif-headline font-bold text-white">{unassignedCount}</div>
          <p className="text-[11px] text-neutral-500">Pending technician allocation</p>
        </div>

        <div className="p-6 bg-[#161920] rounded-2xl hairline-border space-y-2">
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span>ACTIVE INVESTIGATIONS</span>
            <Activity className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-4xl font-serif-headline font-bold text-white">{inProgressCount}</div>
          <p className="text-[11px] text-neutral-500">Field work in progress</p>
        </div>
      </div>

      {/* Incidents Command Table */}
      <div className="bg-[#161920] rounded-3xl hairline-border overflow-hidden space-y-4 p-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <h2 className="font-serif-headline text-2xl font-bold text-white">
            Incident Telemetry Queue
          </h2>
          <span className="font-mono text-xs text-neutral-400">
            {incidents.length} Total Registered Records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-mono text-xs">
            <thead>
              <tr className="border-b border-white/10 text-neutral-400 uppercase tracking-wider">
                <th className="py-3 px-4">Incident ID & Title</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Technician</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {incidents.map((inc) => (
                <tr key={inc.id} className="hover:bg-white/5 transition-colors">
                  
                  {/* Incident Info */}
                  <td className="py-4 px-4 space-y-1 max-w-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-[#D9383A] font-bold">{inc.id}</span>
                      <SeverityBadge severity={inc.severity} />
                    </div>
                    <div 
                      className="font-serif-headline text-base font-bold text-white hover:text-[#D9383A] cursor-pointer"
                      onClick={() => {
                        setSelectedIncident(inc);
                        navigate(`/incident/${inc.id}`);
                      }}
                    >
                      {inc.title}
                    </div>
                  </td>

                  {/* Location */}
                  <td className="py-4 px-4 text-neutral-300">
                    <div>{inc.building}</div>
                    <div className="text-neutral-500 text-[11px]">{inc.locationName}</div>
                  </td>

                  {/* Status */}
                  <td className="py-4 px-4">
                    <StatusBadge status={inc.status} />
                  </td>

                  {/* Technician Assign */}
                  <td className="py-4 px-4">
                    {inc.assignedTechnician ? (
                      <span className="text-blue-300 font-bold flex items-center gap-1">
                        <UserCheck className="w-3.5 h-3.5 text-blue-400" />
                        {inc.assignedTechnician}
                      </span>
                    ) : (
                      <select
                        onChange={(e) => handleAssignTech(inc.id, e.target.value)}
                        className="bg-[#0D0F12] border border-white/20 rounded px-2 py-1 text-white text-[11px]"
                      >
                        <option value="">Assign Tech...</option>
                        {TECHNICIANS_LIST.map(t => (
                          <option key={t.id} value={t.id}>{t.name}</option>
                        ))}
                      </select>
                    )}
                  </td>

                  {/* Quick Action Controls */}
                  <td className="py-4 px-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <select
                        value={inc.status}
                        onChange={(e) => handleStatusChange(inc.id, e.target.value as IncidentStatus)}
                        className="bg-[#0D0F12] border border-white/20 rounded px-2 py-1 text-white text-[11px]"
                      >
                        <option value="REPORTED">Reported</option>
                        <option value="INVESTIGATING">Investigating</option>
                        <option value="ASSIGNED">Assigned</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="RESOLVED">Resolved</option>
                        <option value="VERIFIED">Verified</option>
                      </select>

                      <button
                        onClick={() => {
                          setSelectedIncident(inc);
                          navigate(`/incident/${inc.id}`);
                        }}
                        className="p-1 rounded bg-white/10 hover:bg-white/20 text-white"
                        title="View Full Telemetry"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
