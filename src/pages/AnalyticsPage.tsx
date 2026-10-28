import React from 'react';
import { useApp } from '../context/AppContext';
import { BarChart3, TrendingUp, Clock, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const { incidents } = useApp();

  const total = incidents.length;
  const resolved = incidents.filter(i => i.status === 'RESOLVED' || i.status === 'VERIFIED').length;
  const resolutionRate = Math.round((resolved / (total || 1)) * 100);

  const categoryBreakdown = [
    { name: 'Network & Wi-Fi', count: 2, percentage: 33, color: '#D9383A' },
    { name: 'Hardware & AV', count: 1, percentage: 17, color: '#F59E0B' },
    { name: 'Water & Utilities', count: 2, percentage: 33, color: '#3B82F6' },
    { name: 'Infrastructure', count: 1, percentage: 17, color: '#10B981' },
  ];

  const buildingHeatmap = [
    { building: 'Block A (Academic Wing)', incidents: 2, impactRadius: 'High' },
    { building: 'Central Library', incidents: 1, impactRadius: 'Critical' },
    { building: 'Hostel B Residence', incidents: 1, impactRadius: 'High' },
    { building: 'Media Block Auditorium', incidents: 1, impactRadius: 'Low' },
    { building: 'Computer Centre Sub-Station', incidents: 1, impactRadius: 'Medium' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Editorial Analytics Header */}
      <div className="border-b border-white/10 pb-8 space-y-2">
        <span className="font-mono text-xs uppercase tracking-widest text-[#D9383A]">
          SYSTEM INTELLIGENCE REPORT // Q3 2026
        </span>
        <h1 className="font-serif-headline text-5xl sm:text-7xl font-bold text-white">
          Campus Telemetry Analytics
        </h1>
        <p className="text-neutral-400 font-light text-base max-w-3xl">
          Comprehensive editorial breakdown of campus incident trends, bottleneck resolution speeds, recurring fault radiuses, and infrastructure vulnerabilities.
        </p>
      </div>

      {/* Large Stats Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="p-8 bg-[#161920] rounded-3xl hairline-border space-y-3">
          <span className="font-mono text-xs text-neutral-400 uppercase">AVG RESOLUTION TIME</span>
          <div className="text-6xl font-serif-headline font-bold text-white">
            1.8 <span className="text-2xl font-sans font-normal text-neutral-400">hrs</span>
          </div>
          <p className="text-xs font-mono text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> 14% faster than previous month
          </p>
        </div>

        <div className="p-8 bg-[#161920] rounded-3xl hairline-border space-y-3">
          <span className="font-mono text-xs text-neutral-400 uppercase">RESOLVED EFFICIENCY</span>
          <div className="text-6xl font-serif-headline font-bold text-white">
            {resolutionRate}%
          </div>
          <p className="text-xs font-mono text-neutral-400">
            {resolved} out of {total} incidents verified closed
          </p>
        </div>

        <div className="p-8 bg-[#161920] rounded-3xl hairline-border space-y-3">
          <span className="font-mono text-xs text-neutral-400 uppercase">RECURRING PATTERN INDEX</span>
          <div className="text-6xl font-serif-headline font-bold text-amber-400">
            12%
          </div>
          <p className="text-xs font-mono text-neutral-400">
            Wi-Fi AP hardware degradation identified
          </p>
        </div>

      </div>

      {/* Charts & Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Category Breakdown */}
        <div className="lg:col-span-6 p-8 bg-[#161920] rounded-3xl hairline-border space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="font-serif-headline text-2xl font-bold text-white">
              Incident Category Distribution
            </h3>
            <BarChart3 className="w-5 h-5 text-[#D9383A]" />
          </div>

          <div className="space-y-5 font-mono text-xs">
            {categoryBreakdown.map((cat) => (
              <div key={cat.name} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-300">{cat.name}</span>
                  <span className="text-white font-bold">{cat.count} ({cat.percentage}%)</span>
                </div>
                <div className="w-full h-2 bg-[#0D0F12] rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-1000"
                    style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Affected Buildings */}
        <div className="lg:col-span-6 p-8 bg-[#161920] rounded-3xl hairline-border space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="font-serif-headline text-2xl font-bold text-white">
              Building Impact Frequency
            </h3>
            <Zap className="w-5 h-5 text-amber-400" />
          </div>

          <div className="space-y-4 font-mono text-xs">
            {buildingHeatmap.map((b) => (
              <div key={b.building} className="p-3 bg-[#0D0F12] rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-white font-bold">{b.building}</div>
                  <div className="text-neutral-500 text-[11px]">{b.incidents} Incidents Logged</div>
                </div>
                <span className={`px-2.5 py-1 rounded text-[10px] font-bold ${
                  b.impactRadius === 'Critical' ? 'bg-[#D9383A]/20 text-[#D9383A]' : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {b.impactRadius} Impact
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
