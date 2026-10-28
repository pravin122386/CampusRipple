import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_LOCATIONS } from '../data/mockData';
import { Location } from '../types';
import { MapPin, Radio, AlertTriangle, Layers, Filter, Compass } from 'lucide-react';

export const CampusMapPage: React.FC = () => {
  const { incidents, navigate, setSelectedIncident, setCursorState, setCursorLabel } = useApp();

  const [selectedLoc, setSelectedLoc] = useState<Location | null>(INITIAL_LOCATIONS[0]);
  const [filterType, setFilterType] = useState<string>('ALL');

  const filteredLocations = INITIAL_LOCATIONS.filter(l => filterType === 'ALL' || l.type === filterType);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#D9383A]">
            SPATIAL TOPOLOGY VISUALIZER
          </span>
          <h1 className="font-serif-headline text-5xl sm:text-7xl font-bold text-white mt-1">
            Campus Dependency Map
          </h1>
          <p className="text-neutral-400 font-light text-base mt-2">
            Interactive map of buildings, labs, network routers, hostels, and active incident propagation paths.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto text-xs font-mono">
          {['ALL', 'BUILDING', 'LAB', 'LIBRARY', 'HOSTEL', 'ROUTER'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-full border transition-all ${
                filterType === t
                  ? 'bg-[#D9383A] text-white border-[#D9383A] font-bold'
                  : 'bg-[#161920] border-white/10 text-neutral-400 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Visual Map Canvas Block */}
        <div 
          className="lg:col-span-8 relative h-[580px] bg-[#0D0F12] rounded-3xl overflow-hidden hairline-border group cursor-crosshair select-none"
          onMouseEnter={() => { setCursorState('TRACE'); setCursorLabel('TRACE'); }}
          onMouseLeave={() => { setCursorState('DEFAULT'); setCursorLabel(''); }}
        >
          {/* Background Aerial Map Graphic */}
          <img
            src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=1600"
            alt="Campus Map Grid"
            className="w-full h-full object-cover object-center grayscale contrast-125 brightness-[0.25]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F12] via-transparent to-transparent opacity-80" />

          {/* Render SVG Connection Mesh between Locations */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <line x1="25%" y1="35%" x2="50%" y2="45%" stroke="#D9383A" strokeWidth="2" strokeDasharray="4 4" className="animate-pulse" />
            <line x1="30%" y1="40%" x2="50%" y2="45%" stroke="#F59E0B" strokeWidth="2" />
            <line x1="60%" y1="25%" x2="50%" y2="45%" stroke="#3B82F6" strokeWidth="1.5" />
            <line x1="75%" y1="65%" x2="50%" y2="45%" stroke="#10B981" strokeWidth="1.5" />
          </svg>

          {/* Interactive Location Nodes */}
          {filteredLocations.map((loc) => {
            const hasIncident = incidents.some(i => i.locationId === loc.id && i.status !== 'RESOLVED');
            const isSelected = selectedLoc?.id === loc.id;

            return (
              <div
                key={loc.id}
                onClick={() => setSelectedLoc(loc)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 transition-transform hover:scale-125"
                style={{ left: `${loc.coordinates.x}%`, top: `${loc.coordinates.y}%` }}
              >
                {/* Ripple ring if active incident */}
                {hasIncident && (
                  <span className="absolute -inset-3 rounded-full bg-[#D9383A]/30 animate-ping" />
                )}

                <div className={`relative p-2.5 rounded-full border shadow-xl flex items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-[#D9383A] text-white border-white scale-125 z-20'
                    : hasIncident
                    ? 'bg-[#D9383A]/20 border-[#D9383A] text-[#D9383A]'
                    : 'bg-[#161920] border-white/20 text-white'
                }`}>
                  <MapPin className="w-4 h-4" />
                </div>

                <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-[#0D0F12]/90 backdrop-blur-sm border border-white/10 px-2 py-0.5 rounded text-[10px] font-mono text-white whitespace-nowrap shadow-md">
                  {loc.building}
                </div>
              </div>
            );
          })}

          {/* Map Overlay Badge */}
          <div className="absolute top-4 left-4 bg-[#161920]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 font-mono text-xs text-white flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#D9383A]" />
            <span>Interactive Campus Grid // Live Telemetry</span>
          </div>

        </div>

        {/* Selected Node Details Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {selectedLoc ? (
            <div className="p-8 bg-[#161920] rounded-3xl hairline-border space-y-6">
              
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#D9383A]">
                  LOCATION DETAILS // {selectedLoc.type}
                </span>
                <h3 className="font-serif-headline text-3xl font-bold text-white mt-1">
                  {selectedLoc.name}
                </h3>
                <p className="text-xs font-mono text-neutral-400 mt-1">
                  Building: {selectedLoc.building} {selectedLoc.room ? `• ${selectedLoc.room}` : ''}
                </p>
              </div>

              {/* Incidents tied to this location */}
              <div className="space-y-3 pt-2">
                <h4 className="font-mono text-xs uppercase text-white font-bold">
                  Active Incidents at Location
                </h4>
                {incidents.filter(i => i.locationId === selectedLoc.id).map(inc => (
                  <div
                    key={inc.id}
                    onClick={() => {
                      setSelectedIncident(inc);
                      navigate(`/incident/${inc.id}`);
                    }}
                    className="p-4 bg-[#0D0F12] rounded-xl border border-white/10 hover:border-[#D9383A] transition-colors cursor-pointer space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#D9383A] font-bold">{inc.id}</span>
                      <span className="text-amber-400">{inc.severity}</span>
                    </div>
                    <div className="font-serif-headline text-lg font-bold text-white">{inc.title}</div>
                    <div className="text-xs font-mono text-neutral-400">{inc.affectedUsersCount} Students Affected</div>
                  </div>
                ))}

                {incidents.filter(i => i.locationId === selectedLoc.id).length === 0 && (
                  <p className="text-xs font-mono text-emerald-400">
                    ✓ No active incidents reported at this location.
                  </p>
                )}
              </div>

            </div>
          ) : (
            <div className="p-12 text-center bg-[#161920] rounded-3xl hairline-border text-neutral-400 font-mono text-xs">
              Click any campus map node to inspect structural telemetry.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
