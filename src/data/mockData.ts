import { Incident, Location, NotificationItem } from '../types';

export const INITIAL_LOCATIONS: Location[] = [
  { id: 'loc-1', name: 'Block A - Main Academic Building', building: 'Block A', floor: 'Floor 1-4', coordinates: { x: 25, y: 35 }, type: 'BUILDING' },
  { id: 'loc-2', name: 'Computer Science Lab 3', building: 'Block A', floor: 'Floor 2', room: 'Lab 3', coordinates: { x: 30, y: 40 }, type: 'LAB' },
  { id: 'loc-3', name: 'Central Campus Library', building: 'Library Complex', floor: 'Floor 1-3', coordinates: { x: 60, y: 25 }, type: 'LIBRARY' },
  { id: 'loc-4', name: 'Hostel B - Student Residence', building: 'Hostel B', coordinates: { x: 75, y: 65 }, type: 'HOSTEL' },
  { id: 'loc-5', name: 'Auditorium & Seminar Hall', building: 'Media Block', coordinates: { x: 45, y: 70 }, type: 'HALL' },
  { id: 'loc-6', name: 'Central Network Router Hub 01', building: 'Data Centre', room: 'DC-102', coordinates: { x: 50, y: 45 }, type: 'ROUTER' },
  { id: 'loc-7', name: 'Computer Centre Sub-Station', building: 'Block B', room: 'Lab 101', coordinates: { x: 20, y: 55 }, type: 'LAB' },
];

export const INITIAL_INCIDENTS: Incident[] = [
  {
    id: 'INC-2026-891',
    title: 'Wi-Fi Access Point Failure — Block A',
    category: 'NETWORK',
    description: 'Core wireless access node AP-North-04 collapsed following a voltage surge. All online lecture streams and computer lab network assignments in Block A are disconnected.',
    locationId: 'loc-1',
    locationName: 'Block A - Academic Wing',
    building: 'Block A',
    room: 'Rooms 101-108 & Computer Labs',
    severity: 'HIGH',
    status: 'INVESTIGATING',
    reportedBy: 'Pravin D.',
    reportedById: 'usr-101',
    reportedAt: '2026-09-23T18:30:00Z',
    updatedAt: '2026-09-23T19:45:00Z',
    assignedTechnician: 'Rajesh Kumar (Senior NetOps Engine)',
    assignedTechnicianId: 'tech-04',
    affectedUsersCount: 142,
    affectedLocationsCount: 6,
    impactLevelPercentage: 78,
    relatedIncidentIds: ['INC-2026-895'],
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1200',
    dependencyTree: {
      nodes: [
        { id: 'n-1', label: 'Wi-Fi Router AP-North-04', type: 'INFRASTRUCTURE', status: 'CRITICAL', details: 'Hardware Core Unresponsive' },
        { id: 'n-2', label: 'Block A Network Switch', type: 'INFRASTRUCTURE', status: 'DEGRADED', details: 'Fallback Bandwidth 10%' },
        { id: 'n-3', label: 'Computer Lab 3 (45 Workstations)', type: 'LAB', status: 'AFFECTED', affectedCount: 45, details: 'Practical Exam Delayed' },
        { id: 'n-4', label: 'Lecture Hall 102 (DBMS Lecture)', type: 'LOCATION', status: 'AFFECTED', affectedCount: 60, details: 'Slide Stream Interrupted' },
        { id: 'n-5', label: 'Faculty Research Hub', type: 'LOCATION', status: 'AFFECTED', affectedCount: 15, details: 'Server Connection Lost' },
        { id: 'n-6', label: '142 Active Student Devices', type: 'STUDENT_GROUP', status: 'AFFECTED', affectedCount: 142, details: 'Offline Session active' }
      ],
      edges: [
        { source: 'n-1', target: 'n-2', label: 'Primary Trunk' },
        { source: 'n-2', target: 'n-3', label: 'Subnet Feed' },
        { source: 'n-2', target: 'n-4', label: 'Smart Classroom' },
        { source: 'n-2', target: 'n-5', label: 'WLAN Grid' },
        { source: 'n-3', target: 'n-6', label: 'Student Users' },
        { source: 'n-4', target: 'n-6', label: 'Student Users' }
      ]
    }
  },
  {
    id: 'INC-2026-892',
    title: 'Ceiling Projector & Audio Failure — Lab 3',
    category: 'HARDWARE',
    description: 'High-definition laser projector HDMI transmitter failure causing display blackout during Web Programming practical session.',
    locationId: 'loc-2',
    locationName: 'Computer Science Lab 3',
    building: 'Block A',
    room: 'Lab 3',
    severity: 'MEDIUM',
    status: 'ASSIGNED',
    reportedBy: 'Ananya Sharma',
    reportedById: 'usr-104',
    reportedAt: '2026-09-23T19:10:00Z',
    updatedAt: '2026-09-23T19:20:00Z',
    assignedTechnician: 'Suresh Menon (AV Support)',
    assignedTechnicianId: 'tech-02',
    affectedUsersCount: 48,
    affectedLocationsCount: 2,
    impactLevelPercentage: 42,
    relatedIncidentIds: [],
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200',
    dependencyTree: {
      nodes: [
        { id: 'p-1', label: 'Laser Projector Unit #03', type: 'INFRASTRUCTURE', status: 'CRITICAL', details: 'Lamp Overheat Sensor Triggered' },
        { id: 'p-2', label: 'Lectern Control Console', type: 'INFRASTRUCTURE', status: 'DEGRADED', details: 'No Signal Handshake' },
        { id: 'p-3', label: 'Lab 3 Student Workstations', type: 'LAB', status: 'AFFECTED', affectedCount: 48, details: 'Cannot view instructor screen' }
      ],
      edges: [
        { source: 'p-1', target: 'p-2', label: 'HDMI Cable' },
        { source: 'p-2', target: 'p-3', label: 'Screen Mirror' }
      ]
    }
  },
  {
    id: 'INC-2026-893',
    title: 'Main Water Overhead Tank Leakage — Hostel B',
    category: 'UTILITY',
    description: 'Pressure valve failure in Roof Tank 2 causing low water supply across floors 3 and 4 of Hostel B.',
    locationId: 'loc-4',
    locationName: 'Hostel B Residence',
    building: 'Hostel B',
    room: 'Floors 3 & 4',
    severity: 'HIGH',
    status: 'IN_PROGRESS',
    reportedBy: 'Karthik V.',
    reportedById: 'usr-110',
    reportedAt: '2026-09-23T16:00:00Z',
    updatedAt: '2026-09-23T19:30:00Z',
    assignedTechnician: 'Estate Plumbing Cell',
    assignedTechnicianId: 'tech-09',
    affectedUsersCount: 210,
    affectedLocationsCount: 4,
    impactLevelPercentage: 85,
    relatedIncidentIds: [],
    imageUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=1200',
    dependencyTree: {
      nodes: [
        { id: 'w-1', label: 'Roof Tank Pressure Valve', type: 'INFRASTRUCTURE', status: 'CRITICAL', details: 'Valve Seal Cracked' },
        { id: 'w-2', label: 'Hostel B Vertical Riser', type: 'INFRASTRUCTURE', status: 'DEGRADED', details: 'Low Pressure Flow' },
        { id: 'w-3', label: 'Floor 3 Restrooms & Laundry', type: 'LOCATION', status: 'AFFECTED', affectedCount: 105 },
        { id: 'w-4', label: 'Floor 4 Restrooms & Laundry', type: 'LOCATION', status: 'AFFECTED', affectedCount: 105 }
      ],
      edges: [
        { source: 'w-1', target: 'w-2' },
        { source: 'w-2', target: 'w-3' },
        { source: 'w-2', target: 'w-4' }
      ]
    }
  },
  {
    id: 'INC-2026-894',
    title: 'Grid Power Tripping & Backup Delayed — Central Library',
    category: 'INFRASTRUCTURE',
    description: 'Main distribution breaker tripped on 2nd Floor reading wing. Diesel Generator auto-switch circuit failed to activate immediately.',
    locationId: 'loc-3',
    locationName: 'Central Campus Library',
    building: 'Library Complex',
    room: 'Quiet Study & Digital Archive',
    severity: 'CRITICAL',
    status: 'INVESTIGATING',
    reportedBy: 'Dr. Meera N.',
    reportedById: 'usr-205',
    reportedAt: '2026-09-23T20:00:00Z',
    updatedAt: '2026-09-23T20:15:00Z',
    assignedTechnician: 'Electrical Substation Team',
    assignedTechnicianId: 'tech-01',
    affectedUsersCount: 185,
    affectedLocationsCount: 5,
    impactLevelPercentage: 92,
    relatedIncidentIds: [],
    imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=1200',
    dependencyTree: {
      nodes: [
        { id: 'e-1', label: 'Sub-Station Breaker B2', type: 'INFRASTRUCTURE', status: 'CRITICAL', details: 'Thermal Overload Trip' },
        { id: 'e-2', label: 'Auto Transfer Switch (ATS)', type: 'INFRASTRUCTURE', status: 'CRITICAL', details: 'Control Board Error' },
        { id: 'e-3', label: 'Digital Periodical Archive', type: 'LAB', status: 'AFFECTED', affectedCount: 35, details: 'UPS Running (12 mins remaining)' },
        { id: 'e-4', label: 'Quiet Study Floor 2', type: 'LOCATION', status: 'AFFECTED', affectedCount: 150, details: 'Lighting and HVAC off' }
      ],
      edges: [
        { source: 'e-1', target: 'e-2' },
        { source: 'e-2', target: 'e-3' },
        { source: 'e-2', target: 'e-4' }
      ]
    }
  },
  {
    id: 'INC-2026-895',
    title: 'Network Slowdown & High Latency — Computer Centre',
    category: 'NETWORK',
    description: 'Packet drop rate exceeding 40% on gateway router due to upstream trunk failure connected to Block A AP node.',
    locationId: 'loc-7',
    locationName: 'Computer Centre Sub-Station',
    building: 'Block B',
    room: 'Lab 101',
    severity: 'MEDIUM',
    status: 'REPORTED',
    reportedBy: 'Vikram Seth',
    reportedById: 'usr-302',
    reportedAt: '2026-09-23T20:25:00Z',
    updatedAt: '2026-09-23T20:25:00Z',
    affectedUsersCount: 95,
    affectedLocationsCount: 3,
    impactLevelPercentage: 54,
    relatedIncidentIds: ['INC-2026-891'],
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200',
    dependencyTree: {
      nodes: [
        { id: 'c-1', label: 'Gateway Router CC-01', type: 'INFRASTRUCTURE', status: 'DEGRADED', details: 'Upstream Packet Loss' },
        { id: 'c-2', label: 'Coding Lab 101', type: 'LAB', status: 'AFFECTED', affectedCount: 60, details: 'Git push timeouts' },
        { id: 'c-3', label: 'Server Testing Cluster', type: 'INFRASTRUCTURE', status: 'AFFECTED', affectedCount: 35, details: 'API Latency > 1500ms' }
      ],
      edges: [
        { source: 'c-1', target: 'c-2' },
        { source: 'c-1', target: 'c-3' }
      ]
    }
  },
  {
    id: 'INC-2026-890',
    title: 'HVAC Air Conditioning Failure — Seminar Hall',
    category: 'UTILITY',
    description: 'Coolant leak in Chiller Unit 3 caused automatic shutdown ahead of Campus Innovation Summit session.',
    locationId: 'loc-5',
    locationName: 'Auditorium & Seminar Hall',
    building: 'Media Block',
    severity: 'LOW',
    status: 'RESOLVED',
    reportedBy: 'Pravin D.',
    reportedById: 'usr-101',
    reportedAt: '2026-09-23T11:00:00Z',
    updatedAt: '2026-09-23T15:45:00Z',
    assignedTechnician: 'Prakash R. (HVAC Maintenance)',
    assignedTechnicianId: 'tech-08',
    affectedUsersCount: 160,
    affectedLocationsCount: 1,
    impactLevelPercentage: 30,
    relatedIncidentIds: [],
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1200',
    resolutionSummary: 'Replaced coolant high-pressure valve ring and recharged refrigerant fluid R-410A. Air handling unit restored to 21°C operational temperature.',
    dependencyTree: {
      nodes: [
        { id: 'h-1', label: 'Chiller Unit 3', type: 'INFRASTRUCTURE', status: 'OPERATIONAL' },
        { id: 'h-2', label: 'Auditorium Main Hall', type: 'LOCATION', status: 'OPERATIONAL' }
      ],
      edges: [
        { source: 'h-1', target: 'h-2' }
      ]
    }
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Wi-Fi Incident Ripple Expanded',
    message: 'Incident INC-2026-891 in Block A has spread impact to Computer Lab 3 and Lecture Hall 102. 142 students potentially affected.',
    timestamp: '15 minutes ago',
    read: false,
    severity: 'HIGH',
    incidentId: 'INC-2026-891',
    type: 'EXPANDED'
  },
  {
    id: 'notif-2',
    title: 'Technician Dispatched',
    message: 'Senior NetOps Engineer Rajesh Kumar was assigned to handle Wi-Fi Access Point Failure in Block A.',
    timestamp: '45 minutes ago',
    read: false,
    severity: 'MEDIUM',
    incidentId: 'INC-2026-891',
    type: 'ASSIGNED'
  },
  {
    id: 'notif-3',
    title: 'Incident Resolved',
    message: 'HVAC Air Conditioning Failure in Auditorium Seminar Hall has been successfully resolved and verified.',
    timestamp: '4 hours ago',
    read: true,
    severity: 'LOW',
    incidentId: 'INC-2026-890',
    type: 'RESOLVED'
  },
  {
    id: 'notif-4',
    title: 'Critical Incident Reported',
    message: 'Power grid tripping reported at Central Library. Backup generator switch delayed.',
    timestamp: '35 minutes ago',
    read: false,
    severity: 'CRITICAL',
    incidentId: 'INC-2026-894',
    type: 'NEW'
  }
];

export const TECHNICIANS_LIST = [
  { id: 'tech-01', name: 'Electrical Substation Team', specialty: 'Power & High Voltage Grid' },
  { id: 'tech-02', name: 'Suresh Menon', specialty: 'AV & Smart Classroom Support' },
  { id: 'tech-04', name: 'Rajesh Kumar', specialty: 'Network Infrastructure & Wireless' },
  { id: 'tech-08', name: 'Prakash R.', specialty: 'HVAC & Climate Systems' },
  { id: 'tech-09', name: 'Estate Plumbing Cell', specialty: 'Water Supply & Water Treatment' },
];
