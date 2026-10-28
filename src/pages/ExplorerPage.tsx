import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { IncidentRow } from '../components/IncidentRow';
import { IncidentCategory, SeverityLevel, IncidentStatus } from '../types';
import { Search, Filter, RefreshCcw } from 'lucide-react';

export const ExplorerPage: React.FC = () => {
  const { incidents } = useApp();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedBuilding, setSelectedBuilding] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('ALL');

  const filtered = incidents.filter(inc => {
    const matchesSearch = inc.title.toLowerCase().includes(search.toLowerCase()) ||
                          inc.description.toLowerCase().includes(search.toLowerCase()) ||
                          inc.locationName.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || inc.category === selectedCategory;
    const matchesBuilding = selectedBuilding === 'ALL' || inc.building === selectedBuilding;
    const matchesStatus = selectedStatus === 'ALL' || inc.status === selectedStatus;
    const matchesSeverity = selectedSeverity === 'ALL' || inc.severity === selectedSeverity;

    return matchesSearch && matchesCategory && matchesBuilding && matchesStatus && matchesSeverity;
  });

  const resetFilters = () => {
    setSearch('');
    setSelectedCategory('ALL');
    setSelectedBuilding('ALL');
    setSelectedStatus('ALL');
    setSelectedSeverity('ALL');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-rose-500">
            Campus Issues Directory
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
            All Incidents
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Filter, search, and track campus maintenance and infrastructure reports.
          </p>
        </div>

        <div className="text-xs text-slate-300 bg-slate-900 px-4 py-2 rounded-lg border border-slate-800 self-start md:self-auto">
          Showing <strong className="text-white font-bold">{filtered.length}</strong> of {incidents.length} Records
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-[#161920] p-6 rounded-2xl hairline-border space-y-4">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by incident title, keyword, or room location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0D0F12] border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-neutral-500 focus:outline-none focus:border-[#D9383A] transition-colors"
          />
        </div>

        {/* Filter Dropdowns Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
          
          {/* Category */}
          <div>
            <label className="block text-neutral-400 uppercase mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-[#0D0F12] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#D9383A]"
            >
              <option value="ALL">All Categories</option>
              <option value="NETWORK">Network & Wi-Fi</option>
              <option value="HARDWARE">Hardware & AV</option>
              <option value="INFRASTRUCTURE">Infrastructure</option>
              <option value="UTILITY">Water & Power</option>
              <option value="SECURITY">Security</option>
              <option value="ACADEMIC">Academic</option>
            </select>
          </div>

          {/* Building */}
          <div>
            <label className="block text-neutral-400 uppercase mb-1">Building</label>
            <select
              value={selectedBuilding}
              onChange={(e) => setSelectedBuilding(e.target.value)}
              className="w-full bg-[#0D0F12] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#D9383A]"
            >
              <option value="ALL">All Buildings</option>
              <option value="Block A">Block A</option>
              <option value="Block B">Block B</option>
              <option value="Library Complex">Library Complex</option>
              <option value="Hostel B">Hostel B</option>
              <option value="Media Block">Media Block</option>
              <option value="Data Centre">Data Centre</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-neutral-400 uppercase mb-1">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-[#0D0F12] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#D9383A]"
            >
              <option value="ALL">All Statuses</option>
              <option value="REPORTED">Reported</option>
              <option value="INVESTIGATING">Investigating</option>
              <option value="ASSIGNED">Assigned</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
              <option value="VERIFIED">Verified</option>
            </select>
          </div>

          {/* Severity */}
          <div>
            <label className="block text-neutral-400 uppercase mb-1">Severity</label>
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="w-full bg-[#0D0F12] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#D9383A]"
            >
              <option value="ALL">All Severities</option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="CRITICAL">Critical</option>
            </select>
          </div>

        </div>

        {/* Clear Filters CTA */}
        <div className="flex justify-end pt-2">
          <button
            onClick={resetFilters}
            className="text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-1.5"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>

      </div>

      {/* Incident List */}
      <div className="space-y-4">
        {filtered.length > 0 ? (
          filtered.map(inc => (
            <IncidentRow key={inc.id} incident={inc} />
          ))
        ) : (
          <div className="p-16 text-center bg-[#161920] rounded-2xl hairline-border space-y-3">
            <Filter className="w-8 h-8 text-neutral-600 mx-auto" />
            <h3 className="font-serif-headline text-2xl font-bold text-white">No incidents match your filter</h3>
            <p className="text-xs font-mono text-neutral-400">Try adjusting your search terms or clearing selected dropdown filters.</p>
            <button
              onClick={resetFilters}
              className="mt-4 px-4 py-2 bg-[#D9383A] text-white text-xs font-mono rounded-full font-bold uppercase"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
