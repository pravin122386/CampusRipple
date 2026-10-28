import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StatusBadge, SeverityBadge } from '../components/StatusBadge';
import { DependencyGraph } from '../components/DependencyGraph';
import { 
  MapPin, 
  Users, 
  Activity, 
  Clock, 
  User, 
  GitMerge, 
  Layers, 
  CheckCircle2, 
  AlertTriangle,
  ArrowLeft,
  Eye,
  Radio
} from 'lucide-react';

export const IncidentDetailPage: React.FC = () => {
  const { selectedIncident, incidents, navigate, mergeIncidents, userRole, impactMode, setImpactMode } = useApp();
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'IMPACT' | 'RELATED' | 'TIMELINE'>('IMPACT');

  if (!selectedIncident) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif-headline text-3xl font-bold text-white">No Incident Selected</h2>
        <button
          onClick={() => navigate('/explorer')}
          className="px-6 py-2.5 bg-[#D9383A] text-white rounded-full font-mono text-xs uppercase"
        >
          Return to Explorer
        </button>
      </div>
    );
  }

  const incident = selectedIncident;
  const relatedIncidents = incidents.filter(i => incident.relatedIncidentIds.includes(i.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Back button */}
      <button
        onClick={() => navigate('/explorer')}
        className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white uppercase transition-colors"
      >
        <ArrowLeft className="w-4 h-4 text-[#D9383A]" />
        <span>Back to Explorer</span>
      </button>

      {/* Hero Header Block with Photograph */}
      <div className="relative rounded-3xl overflow-hidden hairline-border bg-[#161920] min-h-[380px] flex flex-col justify-end p-8 sm:p-12">
        <img
          src={incident.imageUrl}
          alt={incident.title}
          className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 brightness-[0.35]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115] via-[#0F1115]/80 to-transparent" />

        <div className="relative z-10 space-y-4 max-w-4xl">
          
          <div className="flex items-center gap-3 flex-wrap font-mono text-xs">
            <span className="text-[#D9383A] font-bold">{incident.id}</span>
            <StatusBadge status={incident.status} />
            <SeverityBadge severity={incident.severity} />
            <span className="text-neutral-400">Reported {new Date(incident.reportedAt).toLocaleTimeString()}</span>
          </div>

          <h1 className="font-serif-headline text-4xl sm:text-6xl font-bold text-white leading-tight">
            {incident.title}
          </h1>

          <div className="flex items-center gap-6 text-xs font-mono text-neutral-300 flex-wrap">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#D9383A]" />
              {incident.locationName} ({incident.room || incident.building})
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-neutral-400" />
              Reported by {incident.reportedBy}
            </span>
            {incident.assignedTechnician && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1.5 text-blue-400">
                  Tech: {incident.assignedTechnician}
                </span>
              </>
            )}
          </div>

        </div>
      </div>

      {/* Editorial Navigation Tabs */}
      <div className="flex items-center justify-between border-b border-white/10 overflow-x-auto">
        <div className="flex items-center space-x-2 sm:space-x-8 text-xs font-mono uppercase tracking-widest">
          {[
            { id: 'IMPACT', label: 'Impact Analysis' },
            { id: 'OVERVIEW', label: 'Overview' },
            { id: 'RELATED', label: `Related Reports (${incident.relatedIncidentIds.length})` },
            { id: 'TIMELINE', label: 'Resolution Timeline' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-4 px-2 font-bold transition-all relative ${
                activeTab === tab.id
                  ? 'text-white border-b-2 border-[#D9383A]'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'IMPACT' && (
          <button
            onClick={() => setImpactMode(!impactMode)}
            className={`hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono transition-all border ${
              impactMode
                ? 'bg-[#D9383A] text-white border-[#D9383A] font-bold shadow-lg shadow-[#D9383A]/30 animate-pulse'
                : 'bg-[#161920] text-neutral-300 border-white/10 hover:text-white'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Impact Mode: {impactMode ? 'ON (Dim Unaffected)' : 'OFF'}</span>
          </button>
        )}
      </div>

      {/* TAB CONTENT: IMPACT ANALYSIS */}
      {activeTab === 'IMPACT' && (
        <div className="space-y-10 animate-in fade-in">
          
          {/* Key Metric Highlights Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-6 bg-[#161920] rounded-2xl hairline-border space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                <span>IMPACT SCORE</span>
                <Activity className="w-4 h-4 text-[#D9383A]" />
              </div>
              <div className="text-4xl font-serif-headline font-bold text-white">
                {incident.impactLevelPercentage}%
              </div>
              <p className="text-[11px] font-mono text-neutral-500">Cascade Severity Index</p>
            </div>

            <div className="p-6 bg-[#161920] rounded-2xl hairline-border space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                <span>AFFECTED STUDENTS</span>
                <Users className="w-4 h-4 text-[#D9383A]" />
              </div>
              <div className="text-4xl font-serif-headline font-bold text-white">
                {incident.affectedUsersCount}
              </div>
              <p className="text-[11px] font-mono text-neutral-500">In direct radius</p>
            </div>

            <div className="p-6 bg-[#161920] rounded-2xl hairline-border space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                <span>AFFECTED LOCATIONS</span>
                <MapPin className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-4xl font-serif-headline font-bold text-white">
                {incident.affectedLocationsCount}
              </div>
              <p className="text-[11px] font-mono text-neutral-500">Classrooms & Labs</p>
            </div>

            <div className="p-6 bg-[#161920] rounded-2xl hairline-border space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                <span>RELATED REPORTS</span>
                <GitMerge className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-4xl font-serif-headline font-bold text-white">
                {incident.relatedIncidentIds.length}
              </div>
              <p className="text-[11px] font-mono text-neutral-500">Correlated issues</p>
            </div>

          </div>

          {/* Dependency Topology Canvas */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif-headline text-2xl font-bold text-white">
                  Live Dependency Network Matrix
                </h3>
                <p className="text-xs font-mono text-neutral-400">
                  Visual propagation path originating from root infrastructure failure.
                </p>
              </div>

              <button
                onClick={() => setImpactMode(!impactMode)}
                className="sm:hidden px-3 py-1 bg-[#D9383A] text-white rounded text-xs font-mono"
              >
                Toggle Impact Mode ({impactMode ? 'ON' : 'OFF'})
              </button>
            </div>

            <DependencyGraph
              nodes={incident.dependencyTree.nodes}
              edges={incident.dependencyTree.edges}
              impactMode={impactMode}
            />
          </div>

        </div>
      )}

      {/* TAB CONTENT: OVERVIEW */}
      {activeTab === 'OVERVIEW' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-in fade-in">
          
          <div className="lg:col-span-8 space-y-8">
            <div className="p-8 bg-[#161920] rounded-2xl hairline-border space-y-4">
              <h3 className="font-serif-headline text-2xl font-bold text-white">
                Incident Description & Context
              </h3>
              <p className="text-neutral-300 leading-relaxed font-light text-base">
                {incident.description}
              </p>
            </div>

            {incident.resolutionSummary && (
              <div className="p-8 bg-emerald-950/30 border border-emerald-800/40 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verified Technical Resolution Summary</span>
                </div>
                <p className="text-emerald-200 text-sm font-light">
                  {incident.resolutionSummary}
                </p>
              </div>
            )}
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 bg-[#161920] rounded-2xl hairline-border space-y-4 font-mono text-xs">
              <h4 className="text-white font-bold uppercase tracking-wider border-b border-white/10 pb-3">
                Location Metadata
              </h4>
              <div className="flex justify-between">
                <span className="text-neutral-500">BUILDING</span>
                <span className="text-white">{incident.building}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">ROOM / WING</span>
                <span className="text-white">{incident.room || 'Main Area'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">CATEGORY</span>
                <span className="text-white">{incident.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">REPORTED AT</span>
                <span className="text-white">{new Date(incident.reportedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB CONTENT: RELATED REPORTS */}
      {activeTab === 'RELATED' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h3 className="font-serif-headline text-2xl font-bold text-white">
              Correlated Incident Reports
            </h3>
            {userRole === 'ADMIN' && (
              <span className="text-xs font-mono text-blue-400">
                Admin Privilege: Merge duplicates allowed
              </span>
            )}
          </div>

          {relatedIncidents.length > 0 ? (
            <div className="space-y-4">
              {relatedIncidents.map(rel => (
                <div key={rel.id} className="p-6 bg-[#161920] rounded-2xl hairline-border flex items-center justify-between gap-4">
                  <div>
                    <div className="font-mono text-xs text-[#D9383A]">{rel.id}</div>
                    <h4 className="font-serif-headline text-xl font-bold text-white">{rel.title}</h4>
                    <p className="text-xs text-neutral-400 font-mono mt-1">{rel.locationName}</p>
                  </div>
                  <button
                    onClick={() => mergeIncidents(incident.id, rel.id)}
                    className="px-4 py-2 bg-blue-600/30 border border-blue-500 text-blue-300 rounded-full font-mono text-xs uppercase hover:bg-blue-600 hover:text-white"
                  >
                    Merge Impact
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-[#161920] rounded-2xl hairline-border text-neutral-400 font-mono text-xs">
              No secondary duplicate reports currently linked to this incident.
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: TIMELINE */}
      {activeTab === 'TIMELINE' && (
        <div className="max-w-3xl space-y-8 animate-in fade-in font-mono text-xs">
          <div className="border-l-2 border-[#D9383A] pl-6 space-y-8">
            
            <div className="relative">
              <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-[#D9383A] border-2 border-[#0F1115]" />
              <div className="text-[#D9383A] font-bold">REPORT CREATED</div>
              <div className="text-white font-serif-headline text-lg font-bold mt-1">Initial Telemetry Dispatched</div>
              <div className="text-neutral-400 mt-1">Submitted by {incident.reportedBy} at {new Date(incident.reportedAt).toLocaleString()}</div>
            </div>

            {incident.assignedTechnician && (
              <div className="relative">
                <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-blue-500 border-2 border-[#0F1115]" />
                <div className="text-blue-400 font-bold">TECHNICIAN ASSIGNED</div>
                <div className="text-white font-serif-headline text-lg font-bold mt-1">Assigned to {incident.assignedTechnician}</div>
                <div className="text-neutral-400 mt-1">NetOps Cell investigating root cause</div>
              </div>
            )}

            {incident.status === 'RESOLVED' && (
              <div className="relative">
                <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#0F1115]" />
                <div className="text-emerald-400 font-bold">INCIDENT RESOLVED</div>
                <div className="text-white font-serif-headline text-lg font-bold mt-1">System Telemetry Normal</div>
                <div className="text-neutral-400 mt-1">{incident.resolutionSummary || 'Verified by NetOps team'}</div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
