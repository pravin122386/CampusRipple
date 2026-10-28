import React from 'react';
import { useApp } from '../context/AppContext';
import { Building2, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate } = useApp();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        
        {/* Brand Information */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-600 text-white">
              <Building2 className="w-4 h-4" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              Campus<span className="text-rose-500">Care</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            Campus Incident & Maintenance Management System. Connecting student break-fix reports to campus facilities and technician teams.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
            Quick Navigation
          </h4>
          <ul className="space-y-2 text-xs">
            {[
              { path: '/', label: 'Dashboard' },
              { path: '/explorer', label: 'All Incidents' },
              { path: '/report', label: 'Report Issue' },
              { path: '/map', label: 'Campus Map' },
              { path: '/admin', label: 'Admin Ops' }
            ].map((link) => (
              <li key={link.path}>
                <button
                  onClick={() => navigate(link.path)}
                  className="hover:text-rose-400 transition-colors flex items-center gap-1"
                >
                  <ArrowUpRight className="w-3 h-3 text-slate-600" />
                  <span>{link.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* System Status Pill */}
        <div className="space-y-3 text-xs">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
            System Telemetry
          </h4>
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Spring Boot Backend:</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Port 8080 Active
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400">React Frontend:</span>
              <span className="text-slate-200 font-bold">Port 3000 Active</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Database:</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                MySQL (Port 3306)
              </span>
            </div>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>
          © 2026 CampusCare Portal. Web Programming Final Project.
        </div>
        <div className="flex items-center gap-4">
          <span>Java 21 Spring Boot</span>
          <span>•</span>
          <span>MySQL Server</span>
          <span>•</span>
          <span>React + Vite</span>
        </div>
      </div>
    </footer>
  );
};
