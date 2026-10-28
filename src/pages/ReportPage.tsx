import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_LOCATIONS } from '../data/mockData';
import { IncidentCategory, SeverityLevel } from '../types';
import { 
  PlusCircle, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  Wifi, 
  Monitor, 
  Building, 
  Zap, 
  Shield, 
  GraduationCap,
  ArrowLeft,
  Send
} from 'lucide-react';

export const ReportPage: React.FC = () => {
  const { addIncident, navigate } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<IncidentCategory>('NETWORK');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<SeverityLevel>('HIGH');
  const [selectedLocId, setSelectedLocId] = useState('loc-1');
  const [roomNumber, setRoomNumber] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedId, setSubmittedId] = useState('');

  const selectedLoc = INITIAL_LOCATIONS.find(l => l.id === selectedLocId) || INITIAL_LOCATIONS[0];

  const categories: { type: IncidentCategory; label: string; icon: any }[] = [
    { type: 'NETWORK', label: 'Wi-Fi & Network', icon: Wifi },
    { type: 'HARDWARE', label: 'Hardware & AV', icon: Monitor },
    { type: 'UTILITY', label: 'Power & Water', icon: Zap },
    { type: 'INFRASTRUCTURE', label: 'Building Facilities', icon: Building },
    { type: 'SECURITY', label: 'Security & Access', icon: Shield },
    { type: 'ACADEMIC', label: 'Lab & Classroom', icon: GraduationCap },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const created = addIncident({
      title: title.trim(),
      category,
      description: description.trim() || 'Reported via student quick form.',
      locationId: selectedLoc.id,
      locationName: selectedLoc.name,
      building: selectedLoc.building,
      room: roomNumber.trim() || selectedLoc.room || 'General Area',
      severity,
    });

    setSubmittedId(created.id);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">Incident Successfully Reported!</h2>
          <p className="text-slate-400 text-sm">
            Your ticket <span className="font-mono text-rose-400 font-semibold">{submittedId}</span> has been broadcast to Campus NetOps and saved in the system.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-left text-xs space-y-2 max-w-md mx-auto">
          <div className="flex justify-between text-slate-400">
            <span>Issue:</span>
            <strong className="text-slate-200">{title}</strong>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Location:</span>
            <strong className="text-slate-200">{selectedLoc.building} — {roomNumber || selectedLoc.name}</strong>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Initial Priority:</span>
            <strong className="text-rose-400 font-semibold">{severity}</strong>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Status:</span>
            <span className="text-emerald-400 font-medium">REPORTED (Technician dispatching)</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 pt-4">
          <button
            onClick={() => navigate(`/incident/${submittedId}`)}
            className="px-5 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs transition-colors"
          >
            View Ticket & Impact Graph
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/')}
          className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Report an Issue</h1>
          <p className="text-slate-400 text-xs sm:text-sm">Submit campus facility, Wi-Fi, or hardware breakdowns for immediate technician dispatch.</p>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        
        {/* 1. What's the problem? */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
            1. Issue Title <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Wi-Fi router offline in Computer Lab 3"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 focus:border-rose-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors"
          />
        </div>

        {/* 2. Category Selection */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
            2. Category <span className="text-rose-500">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = category === cat.type;
              return (
                <button
                  type="button"
                  key={cat.type}
                  onClick={() => setCategory(cat.type)}
                  className={`p-3 rounded-xl border text-left flex items-center gap-2.5 text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-rose-600/10 border-rose-500 text-white font-semibold shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-rose-500' : 'text-slate-500'}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Location & Room */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              3. Building / Zone <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <select
                value={selectedLocId}
                onChange={(e) => setSelectedLocId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-rose-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white outline-none appearance-none transition-colors"
              >
                {INITIAL_LOCATIONS.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.building} — {loc.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Room / Wing Number
            </label>
            <input
              type="text"
              placeholder="e.g. Room 204 / Lab 3"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-rose-500 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition-colors"
            />
          </div>
        </div>

        {/* 4. Severity Level */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
            4. Priority / Severity <span className="text-rose-500">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { level: 'LOW', label: 'Low', desc: 'Minor inconvenience', color: 'border-slate-700 text-slate-300' },
              { level: 'MEDIUM', label: 'Medium', desc: 'Affects single room', color: 'border-amber-500/50 text-amber-400' },
              { level: 'HIGH', label: 'High', desc: 'Class / Lab halted', color: 'border-orange-500/50 text-orange-400' },
              { level: 'CRITICAL', label: 'Critical', desc: 'Entire wing impacted', color: 'border-rose-500 text-rose-500' },
            ].map((s) => {
              const isSelected = severity === s.level;
              return (
                <button
                  type="button"
                  key={s.level}
                  onClick={() => setSeverity(s.level as SeverityLevel)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-slate-800 border-rose-500 text-white ring-1 ring-rose-500 shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold">{s.label}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{s.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. Details Description */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
            5. Additional Description
          </label>
          <textarea
            rows={3}
            placeholder="Describe what happened, any error messages, or symptoms..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 focus:border-rose-500 rounded-xl p-4 text-xs text-white placeholder-slate-500 outline-none transition-colors"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            * Broadcasts automatically to NetOps
          </span>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm flex items-center gap-2 transition-all shadow-lg shadow-rose-600/30 active:scale-95"
          >
            <Send className="w-4 h-4" />
            <span>Submit Report</span>
          </button>
        </div>

      </form>

    </div>
  );
};
