import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { IncidentRow } from '../components/IncidentRow';
import { CampusLiveWidget } from '../components/CampusLiveWidget';
import { 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  PlusCircle, 
  Filter, 
  Wifi, 
  Zap, 
  Monitor, 
  Building, 
  Server,
  ArrowRight,
  Search
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { incidents, navigate, backendConnected } = useApp();
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const activeCount = incidents.filter(i => i.status !== 'RESOLVED' && i.status !== 'VERIFIED').length;
  const inProgressCount = incidents.filter(i => i.status === 'INVESTIGATING' || i.status === 'IN_PROGRESS' || i.status === 'ASSIGNED').length;
  const resolvedCount = incidents.filter(i => i.status === 'RESOLVED' || i.status === 'VERIFIED').length;
  const totalAffected = incidents.reduce((acc, curr) => acc + (curr.status !== 'RESOLVED' ? curr.affectedUsersCount : 0), 0);

  const filteredIncidents = incidents.filter(inc => {
    const matchesCat = categoryFilter === 'ALL' || inc.category === categoryFilter;
    const matchesSearch = inc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          inc.locationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          inc.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Hero Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                Live Operations
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {backendConnected ? 'Java Spring Backend: Online (Port 8080)' : 'Backend Sync Active'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Campus Incident & Maintenance Hub
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Report campus infrastructure issues, track live maintenance workflows, and inspect impact zones across academic blocks.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate('/report')}
              className="px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm flex items-center gap-2 transition-all shadow-lg shadow-rose-600/30 active:scale-95"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Report an Issue</span>
            </button>
            <button
              onClick={() => navigate('/explorer')}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-medium text-sm flex items-center gap-2 transition-colors"
            >
              <span>Browse All</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Issues</span>
            <AlertCircle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-3xl font-extrabold text-white">
            {activeCount}
          </div>
          <p className="text-xs text-rose-400/90 font-medium">Pending technician resolution</p>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">In Progress</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">
            {inProgressCount}
          </div>
          <p className="text-xs text-amber-400/90 font-medium">Technicians dispatched</p>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Resolved</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">
            {resolvedCount}
          </div>
          <p className="text-xs text-emerald-400/90 font-medium">Verified & restored</p>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Affected Students</span>
            <Server className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">
            {totalAffected}
          </div>
          <p className="text-xs text-indigo-400/90 font-medium">In current incident zones</p>
        </div>

      </div>

      {/* Quick Category Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-xs font-semibold text-slate-400 mr-2 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" /> Category:
        </span>
        {[
          { id: 'ALL', label: 'All Issues', icon: null },
          { id: 'NETWORK', label: 'Wi-Fi & Network', icon: Wifi },
          { id: 'HARDWARE', label: 'Lab & AV Systems', icon: Monitor },
          { id: 'UTILITY', label: 'Power & Water', icon: Zap },
          { id: 'INFRASTRUCTURE', label: 'Facilities', icon: Building }
        ].map((cat) => {
          const Icon = cat.icon;
          const isSelected = categoryFilter === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              {Icon && <Icon className="w-3.5 h-3.5" />}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Incidents Feed */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white">
                Live Incidents Feed
              </h2>
              <span className="px-2 py-0.5 rounded-md bg-slate-800 text-xs font-medium text-slate-300 border border-slate-700">
                {filteredIncidents.length} shown
              </span>
            </div>

            {/* Quick search input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search issues or room..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 focus:border-rose-500 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 outline-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredIncidents.length > 0 ? (
              filteredIncidents.map((incident) => (
                <IncidentRow key={incident.id} incident={incident} />
              ))
            ) : (
              <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <p className="text-slate-200 font-semibold text-sm">No incidents match this filter</p>
                <p className="text-slate-500 text-xs">All campus services in this category are operating smoothly.</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar: Campus Live & Quick How-It-Works */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Building className="w-4 h-4 text-rose-500" />
                <span>How CampusCare Works</span>
              </h3>
            </div>
            
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-rose-600/20 text-rose-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <strong className="text-slate-200 block">Report Problem</strong>
                  <span className="text-slate-400">Notice a Wi-Fi drop or faulty lab hardware? Submit a 30-second report.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-amber-600/20 text-amber-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <strong className="text-slate-200 block">Admin Dispatch</strong>
                  <span className="text-slate-400">NetOps assigns an on-duty technician to inspect the location.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <strong className="text-slate-200 block">Resolution & Reset</strong>
                  <span className="text-slate-400">Issue is verified, repaired, and marked resolved in real-time.</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('/report')}
              className="w-full py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-rose-400 hover:text-rose-300 font-semibold text-xs border border-slate-700 transition-colors"
            >
              Start New Report →
            </button>
          </div>

          {/* Campus Live Map / Activity Widget */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Campus Live Status</h3>
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Map
              </span>
            </div>
            <CampusLiveWidget />
          </div>

        </div>

      </div>

    </div>
  );
};
