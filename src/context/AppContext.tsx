import React, { createContext, useContext, useState, useEffect } from 'react';
import { Incident, IncidentStatus, NotificationItem, UserRole, CursorState, AuthUser } from '../types';
import { INITIAL_INCIDENTS, INITIAL_NOTIFICATIONS } from '../data/mockData';

interface AppContextType {
  currentPath: string;
  navigate: (path: string, options?: { ripplePos?: { x: number; y: number } }) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  currentUser: AuthUser | null;
  loginUser: (user: AuthUser) => void;
  logoutUser: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  incidents: Incident[];
  notifications: NotificationItem[];
  selectedIncident: Incident | null;
  setSelectedIncident: (incident: Incident | null) => void;
  addIncident: (newIncident: Partial<Incident>) => Incident;
  updateIncidentStatus: (id: string, status: IncidentStatus, summary?: string) => void;
  assignTechnician: (id: string, technicianName: string, technicianId: string) => void;
  mergeIncidents: (primaryId: string, secondaryId: string) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  cursorState: CursorState;
  setCursorState: (state: CursorState) => void;
  cursorLabel: string;
  setCursorLabel: (label: string) => void;
  rippleActive: boolean;
  rippleCoords: { x: number; y: number } | null;
  triggerRipple: (x?: number, y?: number) => void;
  impactMode: boolean;
  setImpactMode: (mode: boolean) => void;
  backendConnected: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [backendConnected, setBackendConnected] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Authentication State
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem('campuscare_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [userRole, setUserRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem('campuscare_user');
    if (saved) {
      try {
        const u = JSON.parse(saved);
        return u.role || 'STUDENT';
      } catch (e) {}
    }
    return 'STUDENT';
  });

  const [incidents, setIncidents] = useState<Incident[]>(() => {
    const local = localStorage.getItem('campus_ripple_incidents');
    return local ? JSON.parse(local) : INITIAL_INCIDENTS;
  });
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const local = localStorage.getItem('campus_ripple_notifications');
    return local ? JSON.parse(local) : INITIAL_NOTIFICATIONS;
  });
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(INITIAL_INCIDENTS[0]);
  const [cursorState, setCursorState] = useState<CursorState>('DEFAULT');
  const [cursorLabel, setCursorLabel] = useState<string>('');
  const [rippleActive, setRippleActive] = useState<boolean>(false);
  const [rippleCoords, setRippleCoords] = useState<{ x: number; y: number } | null>(null);
  const [impactMode, setImpactMode] = useState<boolean>(false);

  // Save session
  const loginUser = (user: AuthUser) => {
    setCurrentUser(user);
    setUserRole(user.role);
    localStorage.setItem('campuscare_user', JSON.stringify(user));
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setUserRole('STUDENT');
    localStorage.removeItem('campuscare_user');
  };

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('campus_ripple_incidents', JSON.stringify(incidents));
  }, [incidents]);

  useEffect(() => {
    localStorage.setItem('campus_ripple_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Connect to Java Spring Boot Backend (backed by MySQL campuscare_db)
  useEffect(() => {
    fetch('/api/incidents')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then((data: any[]) => {
        setBackendConnected(true);
        if (Array.isArray(data) && data.length > 0) {
          const backendMapped: Incident[] = data.map(b => ({
            id: b.incidentCode || `INC-2026-${b.id}`,
            title: b.title || 'Campus Incident',
            category: b.category || 'NETWORK',
            description: b.description || 'Reported via CampusCare portal',
            locationId: 'loc-1',
            locationName: b.locationName || 'Academic Wing',
            building: b.building || 'Block A',
            room: b.room || 'General Area',
            severity: b.severity || 'HIGH',
            status: b.status || 'INVESTIGATING',
            reportedBy: b.reportedBy || 'Student',
            reportedById: b.reportedById || 'usr-101',
            reportedAt: b.reportedAt || new Date().toISOString(),
            updatedAt: b.updatedAt || new Date().toISOString(),
            affectedUsersCount: b.affectedUsersCount || 50,
            affectedLocationsCount: b.affectedLocationsCount || 2,
            impactLevelPercentage: b.impactLevelPercentage || 65,
            relatedIncidentIds: [],
            imageUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=1200',
            dependencyTree: {
              nodes: [
                { id: 'n1', label: `${b.building || 'Campus'} Hub`, type: 'INFRASTRUCTURE', status: 'CRITICAL', details: 'Core telemetry' },
                { id: 'n2', label: b.locationName || 'Location', type: 'LOCATION', status: 'AFFECTED' },
                { id: 'n3', label: 'Campus Students', type: 'STUDENT_GROUP', status: 'AFFECTED', affectedCount: b.affectedUsersCount || 50 }
              ],
              edges: [
                { source: 'n1', target: 'n2' },
                { source: 'n2', target: 'n3' }
              ]
            }
          }));

          const existingIds = new Set(backendMapped.map(b => b.id));
          setIncidents(prev => {
            const nonDuplicates = prev.filter(p => !existingIds.has(p.id));
            return [...backendMapped, ...nonDuplicates];
          });
        }
      })
      .catch(err => {
        console.warn('Backend server note:', err.message);
      });
  }, []);

  const triggerRipple = (x?: number, y?: number) => {
    // Lightweight compatibility
  };

  const navigate = (path: string) => {
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addIncident = (data: Partial<Incident>): Incident => {
    const generatedCode = `INC-2026-${Math.floor(100 + Math.random() * 900)}`;
    const reporterName = currentUser ? currentUser.name : 'Pravin D.';
    const reporterId = currentUser ? `usr-${currentUser.id}` : 'usr-101';

    const fullIncident: Incident = {
      id: generatedCode,
      title: data.title || 'Reported Incident',
      category: data.category || 'NETWORK',
      description: data.description || '',
      locationId: data.locationId || 'loc-1',
      locationName: data.locationName || 'Academic Wing',
      building: data.building || 'Block A',
      room: data.room || 'Room 101',
      severity: data.severity || 'MEDIUM',
      status: 'REPORTED',
      reportedBy: reporterName,
      reportedById: reporterId,
      reportedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      affectedUsersCount: Math.floor(20 + Math.random() * 60),
      affectedLocationsCount: Math.floor(1 + Math.random() * 3),
      impactLevelPercentage: Math.floor(45 + Math.random() * 40),
      relatedIncidentIds: [],
      imageUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=1200',
      dependencyTree: {
        nodes: [
          { id: 'usr-node-1', label: `${data.building} Core Hub`, type: 'INFRASTRUCTURE', status: 'CRITICAL', details: 'Root malfunction' },
          { id: 'usr-node-2', label: `${data.locationName}`, type: 'LOCATION', status: 'AFFECTED' },
          { id: 'usr-node-3', label: `Affected Students`, type: 'STUDENT_GROUP', status: 'AFFECTED', affectedCount: 45 }
        ],
        edges: [
          { source: 'usr-node-1', target: 'usr-node-2' },
          { source: 'usr-node-2', target: 'usr-node-3' }
        ]
      }
    };

    setIncidents(prev => [fullIncident, ...prev]);

    // Send to Java Spring Boot Backend (Saved to MySQL `campuscare_db`)
    fetch('/api/incidents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        incidentCode: fullIncident.id,
        title: fullIncident.title,
        category: fullIncident.category,
        description: fullIncident.description,
        locationName: fullIncident.locationName,
        building: fullIncident.building,
        room: fullIncident.room,
        severity: fullIncident.severity,
        status: fullIncident.status,
        reportedBy: fullIncident.reportedBy,
        reportedById: fullIncident.reportedById,
        affectedUsersCount: fullIncident.affectedUsersCount,
        affectedLocationsCount: fullIncident.affectedLocationsCount,
        impactLevelPercentage: fullIncident.impactLevelPercentage
      })
    }).catch(e => console.warn('MySQL backend sync error:', e));

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `New Incident Reported: ${fullIncident.title}`,
      message: `Issue reported at ${fullIncident.locationName} (${fullIncident.building}) by ${reporterName}. Ticket: ${fullIncident.id}`,
      timestamp: 'Just now',
      read: false,
      severity: fullIncident.severity,
      incidentId: fullIncident.id,
      type: 'NEW'
    };
    setNotifications(prev => [newNotif, ...prev]);

    return fullIncident;
  };

  const updateIncidentStatus = (id: string, status: IncidentStatus, summary?: string) => {
    setIncidents(prev => prev.map(inc => {
      if (inc.id === id) {
        return {
          ...inc,
          status,
          resolutionSummary: summary ?? inc.resolutionSummary,
          updatedAt: new Date().toISOString()
        };
      }
      return inc;
    }));

    if (status === 'RESOLVED' || status === 'VERIFIED') {
      const target = incidents.find(i => i.id === id);
      const notif: NotificationItem = {
        id: `notif-${Date.now()}`,
        title: `Incident Resolved: ${target?.title || id}`,
        message: summary || `Issue at ${target?.locationName || 'campus'} has been fixed and verified.`,
        timestamp: 'Just now',
        read: false,
        severity: 'LOW',
        incidentId: id,
        type: 'RESOLVED'
      };
      setNotifications(prev => [notif, ...prev]);
    }
  };

  const assignTechnician = (id: string, name: string, techId: string) => {
    setIncidents(prev => prev.map(inc => {
      if (inc.id === id) {
        return {
          ...inc,
          assignedTechnician: name,
          assignedTechnicianId: techId,
          status: inc.status === 'REPORTED' ? 'ASSIGNED' : inc.status,
          updatedAt: new Date().toISOString()
        };
      }
      return inc;
    }));
  };

  const mergeIncidents = (primaryId: string, secondaryId: string) => {
    setIncidents(prev => prev.map(inc => {
      if (inc.id === primaryId) {
        return {
          ...inc,
          relatedIncidentIds: Array.from(new Set([...inc.relatedIncidentIds, secondaryId]))
        };
      }
      return inc;
    }));
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <AppContext.Provider
      value={{
        currentPath,
        navigate,
        userRole,
        setUserRole,
        currentUser,
        loginUser,
        logoutUser,
        isAuthModalOpen,
        setIsAuthModalOpen,
        incidents,
        notifications,
        selectedIncident,
        setSelectedIncident,
        addIncident,
        updateIncidentStatus,
        assignTechnician,
        mergeIncidents,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        cursorState,
        setCursorState,
        cursorLabel,
        setCursorLabel,
        rippleActive,
        rippleCoords,
        triggerRipple,
        impactMode,
        setImpactMode,
        backendConnected
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
