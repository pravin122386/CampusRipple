export type IncidentStatus = 
  | 'REPORTED' 
  | 'INVESTIGATING' 
  | 'ASSIGNED' 
  | 'IN_PROGRESS' 
  | 'RESOLVED' 
  | 'VERIFIED';

export type IncidentCategory = 
  | 'NETWORK' 
  | 'HARDWARE' 
  | 'INFRASTRUCTURE' 
  | 'UTILITY' 
  | 'SECURITY' 
  | 'ACADEMIC';

export type SeverityLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type UserRole = 'STUDENT' | 'FACULTY' | 'TECHNICIAN' | 'ADMIN';

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: 'STUDENT' | 'ADMIN';
}

export interface Location {
  id: string;
  name: string;
  building: string;
  floor?: string;
  room?: string;
  coordinates: { x: number; y: number }; // percentage position on canvas map
  type: 'BUILDING' | 'LAB' | 'HALL' | 'HOSTEL' | 'LIBRARY' | 'ROUTER' | 'FACILITY';
}

export interface ResourceDependency {
  id: string;
  sourceId: string;
  targetId: string;
  relationship: string; // e.g. "provides network to", "supplies power to", "hosts class for"
  impactWeight: number; // 0 to 1
}

export interface DependencyNode {
  id: string;
  label: string;
  type: 'INFRASTRUCTURE' | 'LOCATION' | 'LAB' | 'EVENT' | 'STUDENT_GROUP';
  status: 'OPERATIONAL' | 'AFFECTED' | 'DEGRADED' | 'CRITICAL';
  affectedCount?: number;
  details?: string;
  x?: number;
  y?: number;
}

export interface Incident {
  id: string;
  title: string;
  category: IncidentCategory;
  description: string;
  locationId: string;
  locationName: string;
  building: string;
  room?: string;
  severity: SeverityLevel;
  status: IncidentStatus;
  reportedBy: string;
  reportedById: string;
  reportedAt: string; // ISO date string
  updatedAt: string;
  assignedTechnician?: string;
  assignedTechnicianId?: string;
  affectedUsersCount: number;
  affectedLocationsCount: number;
  impactLevelPercentage: number; // 0 - 100
  relatedIncidentIds: string[];
  dependencyTree: {
    nodes: DependencyNode[];
    edges: { source: string; target: string; label?: string }[];
  };
  imageUrl?: string;
  resolutionSummary?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  severity: SeverityLevel;
  incidentId?: string;
  type: 'EXPANDED' | 'RESOLVED' | 'NEW' | 'ASSIGNED';
}

export interface FilterOptions {
  searchQuery: string;
  category: string;
  building: string;
  status: string;
  severity: string;
}

export type CursorState = 'DEFAULT' | 'EXPLORE' | 'IMPACT' | 'TRACE' | 'OPEN' | 'VIEW' | 'DRAG';
