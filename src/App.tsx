import React from 'react';
import { useApp } from './context/AppContext';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';

// Pages
import { DashboardPage } from './pages/DashboardPage';
import { ReportPage } from './pages/ReportPage';
import { ExplorerPage } from './pages/ExplorerPage';
import { IncidentDetailPage } from './pages/IncidentDetailPage';
import { CampusMapPage } from './pages/CampusMapPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { ProfilePage } from './pages/ProfilePage';

export const AppContent: React.FC = () => {
  const { currentPath } = useApp();

  const renderPage = () => {
    if (currentPath === '/' || currentPath === '/dashboard') return <DashboardPage />;
    if (currentPath === '/report') return <ReportPage />;
    if (currentPath === '/explorer') return <ExplorerPage />;
    if (currentPath.startsWith('/incident')) return <IncidentDetailPage />;
    if (currentPath === '/map') return <CampusMapPage />;
    if (currentPath === '/admin') return <AdminDashboardPage />;
    if (currentPath === '/analytics') return <AnalyticsPage />;
    if (currentPath === '/notifications') return <NotificationsPage />;
    if (currentPath === '/profile') return <ProfilePage />;

    return <DashboardPage />;
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-[#f1f5f9] flex flex-col justify-between selection:bg-rose-500 selection:text-white">
      <AuthModal />

      <div>
        <Navigation />
        <main className="transition-opacity duration-200">
          {renderPage()}
        </main>
      </div>

      <Footer />
    </div>
  );
};
