import React from 'react';
import { useApp } from '../context/AppContext';
import { IncidentRow } from '../components/IncidentRow';
import { Mail, CheckCircle2, LogIn, LogOut, Shield } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { currentUser, logoutUser, setIsAuthModalOpen, incidents } = useApp();

  const myIncidents = incidents.filter(i => 
    currentUser ? i.reportedBy === currentUser.name : i.reportedBy === 'Pravin D.'
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Profile Card */}
      {currentUser ? (
        <div className="p-6 sm:p-8 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-600 to-indigo-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-rose-950/40">
              {currentUser.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-white">{currentUser.name}</h1>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  currentUser.role === 'ADMIN' 
                    ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                }`}>
                  {currentUser.role}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-rose-500" /> {currentUser.email} • Verified Account
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-xs text-slate-400 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <span className="block text-slate-500 text-[10px] uppercase font-bold">Database</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> MySQL `users` Table
              </span>
            </div>

            <button
              onClick={logoutUser}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-400 hover:text-rose-300 font-semibold text-xs border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="p-8 sm:p-12 bg-slate-900 border border-slate-800 rounded-2xl text-center space-y-4 shadow-xl">
          <div className="w-14 h-14 rounded-full bg-rose-600/20 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/30">
            <Shield className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white">Not Signed In</h2>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Please sign in with your credentials or create a new student / admin account saved directly to your local MySQL database.
            </p>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs transition-colors inline-flex items-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In / Register</span>
          </button>
        </div>
      )}

      {/* Submitted Incidents */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">
            My Reported Incidents ({myIncidents.length})
          </h2>
          <span className="text-xs text-slate-400">
            Filtered by author: {currentUser ? currentUser.name : 'Pravin D.'}
          </span>
        </div>

        <div className="space-y-3">
          {myIncidents.length > 0 ? (
            myIncidents.map(inc => (
              <IncidentRow key={inc.id} incident={inc} />
            ))
          ) : (
            <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-400">
              No reports filed yet under this account.
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
