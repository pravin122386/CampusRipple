import React from 'react';
import { INITIAL_LOCATIONS } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { Radio, MapPin, ArrowRight } from 'lucide-react';

export const CampusLiveWidget: React.FC = () => {
  const { navigate, setCursorState, setCursorLabel } = useApp();

  return (
    <div 
      className="relative rounded-2xl overflow-hidden hairline-border bg-[#161920] group cursor-pointer"
      onClick={(e) => navigate('/map', { ripplePos: { x: e.clientX, y: e.clientY } })}
      onMouseEnter={() => { setCursorState('TRACE'); setCursorLabel('CAMPUS MAP'); }}
      onMouseLeave={() => { setCursorState('DEFAULT'); setCursorLabel(''); }}
      data-cursor="true"
    >
      {/* Background Campus Visual */}
      <div className="relative h-[260px] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=1400"
          alt="Campus Aerial View"
          className="w-full h-full object-cover object-center grayscale contrast-125 brightness-50 group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115] via-[#0F1115]/60 to-transparent" />

        {/* Live Active Incident Pulse Markers */}
        {INITIAL_LOCATIONS.map((loc, idx) => (
          <div
            key={loc.id}
            className="absolute z-10 flex items-center justify-center"
            style={{ left: `${loc.coordinates.x}%`, top: `${loc.coordinates.y}%` }}
          >
            <span className="absolute w-6 h-6 rounded-full bg-[#D9383A]/40 animate-ping" />
            <span className="relative w-3 h-3 rounded-full bg-[#D9383A] border-2 border-white shadow-lg" />
            <span className="hidden group-hover:block absolute left-4 top-0 px-2 py-0.5 bg-[#0D0F12] text-white text-[10px] font-mono rounded border border-white/20 whitespace-nowrap">
              {loc.building}
            </span>
          </div>
        ))}
      </div>

      {/* Widget Content overlay */}
      <div className="p-6 relative z-10 -mt-12 flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Radio className="w-4 h-4 text-[#D9383A] animate-pulse" />
            <span className="text-xs font-mono tracking-widest text-[#D9383A] uppercase font-bold">
              Campus Live Stream
            </span>
          </div>
          <h3 className="font-serif-headline text-2xl font-bold text-white group-hover:text-[#D9383A] transition-colors">
            Interactive Topology Grid
          </h3>
          <p className="text-xs text-neutral-400 font-mono mt-1">
            7 Active Sub-Systems Monitored • Live Node Propagation
          </p>
        </div>

        <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-[#D9383A] group-hover:border-[#D9383A] transition-all">
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};
