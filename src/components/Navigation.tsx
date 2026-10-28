import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Bell, 
  Map, 
  AlertCircle, 
  PlusCircle, 
  BarChart3, 
  ShieldCheck, 
  User, 
  LayoutDashboard,
  Building2,
  Menu,
  X,
  LogIn,
  LogOut
} from 'lucide-react';

export const Navigation: React.FC = () => {
  const { 
    currentPath, 
    navigate, 
    notifications, 
    userRole, 
    setUserRole, 
    currentUser, 
    logoutUser, 
    setIsAuthModalOpen 
  } = useApp();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const navLinks = [
    { label: 'Dashboard', path: '/', icon: LayoutDashboard },
    { label: 'Incidents', path: '/explorer', icon: AlertCircle },
    { label: 'Campus Map', path: '/map', icon: Map },
    { label: 'Analytics', path: '/analytics', icon: BarChart3 },
    ...(userRole === 'ADMIN' ? [{ label: 'Admin Ops', path: '/admin', icon: ShieldCheck }] : []),
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0f172a]/95 backdrop-blur border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => navigate('/')}
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-indigo-600 text-white shadow-md shadow-rose-900/30">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                Campus<span className="text-rose-500">Care</span>
              </span>
              <span className="hidden sm:block text-[11px] font-medium text-slate-400">
                Incident & Maintenance System
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path || (link.path === '/' && currentPath === '/dashboard');
              const Icon = link.icon;
              return (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                    isActive
                      ? 'text-white bg-slate-800 font-semibold shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4 text-slate-400" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Report Button & User / Role */}
          <div className="flex items-center gap-2.5">
            
            {/* Primary Report Button */}
            <button
              onClick={() => navigate('/report')}
              className="px-3.5 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-medium text-sm flex items-center gap-2 transition-all shadow-md shadow-rose-600/30 active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Report Issue</span>
            </button>

            {/* Notifications Button */}
            <button
              onClick={() => navigate('/notifications')}
              className="relative p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              )}
            </button>

            {/* User Login / Profile Section */}
            {currentUser ? (
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 pl-3 pr-1.5 py-1 rounded-xl">
                <div className="flex flex-col text-left">
                  <span className="text-xs font-semibold text-white leading-tight max-w-[100px] truncate">
                    {currentUser.name}
                  </span>
                  <span className={`text-[10px] font-medium ${currentUser.role === 'ADMIN' ? 'text-indigo-400 font-bold' : 'text-slate-400'}`}>
                    {currentUser.role}
                  </span>
                </div>
                <button
                  onClick={logoutUser}
                  title="Logout"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white font-medium text-xs flex items-center gap-1.5 transition-colors"
              >
                <LogIn className="w-3.5 h-3.5 text-rose-500" />
                <span>Log In / Register</span>
              </button>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-800 space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.path}
                  onClick={() => {
                    navigate(link.path);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-2.5 rounded-lg text-left text-sm font-medium flex items-center gap-3 text-slate-200 hover:bg-slate-800"
                >
                  <Icon className="w-4 h-4 text-slate-400" />
                  <span>{link.label}</span>
                </button>
              );
            })}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between px-4 text-xs">
              {currentUser ? (
                <>
                  <span className="text-slate-400">Signed in as <strong className="text-white">{currentUser.name}</strong></span>
                  <button onClick={logoutUser} className="text-rose-400 font-semibold">Logout</button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setIsAuthModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="text-rose-400 font-semibold flex items-center gap-1"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Log In or Register</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
