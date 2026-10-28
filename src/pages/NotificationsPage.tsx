import React from 'react';
import { useApp } from '../context/AppContext';
import { Bell, CheckCheck, AlertCircle, CheckCircle2, UserCheck, Radio } from 'lucide-react';
import { SeverityBadge } from '../components/StatusBadge';

export const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead, navigate, setSelectedIncident, incidents } = useApp();

  const handleNotificationClick = (notif: any) => {
    markNotificationAsRead(notif.id);
    if (notif.incidentId) {
      const found = incidents.find(i => i.id === notif.incidentId);
      if (found) {
        setSelectedIncident(found);
        navigate(`/incident/${found.id}`);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#D9383A]">
            REAL-TIME DISPATCH LOG
          </span>
          <h1 className="font-serif-headline text-5xl font-bold text-white mt-1">
            Notification Center
          </h1>
        </div>

        <button
          onClick={markAllNotificationsAsRead}
          className="text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-1.5 px-3 py-1.5 bg-[#161920] rounded-full border border-white/10"
        >
          <CheckCheck className="w-4 h-4 text-[#D9383A]" />
          <span>Mark All Read</span>
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3 font-mono text-xs">
        {notifications.map((notif) => {
          return (
            <div
              key={notif.id}
              onClick={() => handleNotificationClick(notif)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                notif.read
                  ? 'bg-[#161920]/60 border-white/5 opacity-70 hover:opacity-100'
                  : 'bg-[#161920] border-[#D9383A]/50 shadow-lg shadow-[#D9383A]/10'
              }`}
            >
              <div className="p-2.5 rounded-full bg-[#D9383A]/15 border border-[#D9383A]/30 text-[#D9383A] mt-0.5">
                <Bell className="w-4 h-4" />
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-sans text-base font-bold text-white">
                    {notif.title}
                  </h4>
                  <span className="text-[11px] text-neutral-400">{notif.timestamp}</span>
                </div>

                <p className="text-neutral-300 font-sans text-xs leading-relaxed">
                  {notif.message}
                </p>

                <div className="pt-2 flex items-center gap-3">
                  <SeverityBadge severity={notif.severity} />
                  {notif.incidentId && (
                    <span className="text-neutral-500 underline text-[11px]">
                      View Incident Telemetry →
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
