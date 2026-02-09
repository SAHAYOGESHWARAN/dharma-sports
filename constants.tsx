
import { UserRole, Sport, User, Student, AttendanceRecord, Event } from './types';

export const INSTITUTION_NAME = "Ramakrishna Mission Vidyalaya College of Arts and Science";
export const APP_TITLE = "Online Sports Attendance Management System";

export const MOCK_ADMIN: User = {
  id: 'admin1',
  name: 'Admin Coordinator',
  email: 'admin@rmvcas.ac.in',
  role: UserRole.ADMIN,
  profileImage: 'https://i.pravatar.cc/150?u=admin'
};

export const MOCK_COACHES: User[] = [
  { id: 'c1', name: 'Dr. Subramanian', email: 'subra@rmvcas.ac.in', role: UserRole.COACH, sportId: 's1' },
  { id: 'c2', name: 'Mr. Rajesh Kumar', email: 'rajesh@rmvcas.ac.in', role: UserRole.COACH, sportId: 's2' },
  { id: 'c3', name: 'Mr. Senthil V', email: 'senthil@rmvcas.ac.in', role: UserRole.COACH, sportId: 's3' },
];

export const MOCK_SPORTS: Sport[] = [
  { id: 's1', name: 'Cricket', coachId: 'c1', description: 'Institutional Cricket Team - Major Division' },
  { id: 's2', name: 'Football', coachId: 'c2', description: 'Institutional Football Squad - Regional League' },
  { id: 's3', name: 'Volleyball', coachId: 'c3', description: 'Volleyball Coaching & Varsity Team' },
  { id: 's4', name: 'Table Tennis', coachId: 'c1', description: 'Indoor Sports Division' },
  { id: 's5', name: 'Athletics', coachId: 'c2', description: 'Track and Field Events' },
  { id: 's6', name: 'Badminton', coachId: 'c3', description: 'Indoor Badminton Championship Squad' },
];

export const MOCK_STUDENTS: Student[] = [
  { id: 'st1', name: 'Anand Kumar', email: 'anand@student.com', role: UserRole.STUDENT, rollNumber: '22BSC01', department: 'Computer Science', sportId: 's1', year: 'III', phone: '9876543210' },
  { id: 'st2', name: 'Vimal Raj', email: 'vimal@student.com', role: UserRole.STUDENT, rollNumber: '22BCA45', department: 'Computer Applications', sportId: 's1', year: 'III', phone: '9876543211' },
  { id: 'st3', name: 'Suresh Raina', email: 'suresh@student.com', role: UserRole.STUDENT, rollNumber: '23BCO12', department: 'Commerce', sportId: 's2', year: 'II', phone: '9876543212' },
  { id: 'st4', name: 'Prakash M', email: 'prakash@student.com', role: UserRole.STUDENT, rollNumber: '21PHY09', department: 'Physics', sportId: 's1', year: 'IV', phone: '9876543213' },
  { id: 'st5', name: 'Arun V', email: 'arun@student.com', role: UserRole.STUDENT, rollNumber: '22MAT04', department: 'Mathematics', sportId: 's2', year: 'III', phone: '9876543214' },
  { id: 'st6', name: 'Dinesh Karthik', email: 'dinesh@student.com', role: UserRole.STUDENT, rollNumber: '24ENG01', department: 'English', sportId: 's3', year: 'I', phone: '9876543215' },
  { id: 'st7', name: 'Vijay Sethu', email: 'vijay@student.com', role: UserRole.STUDENT, rollNumber: '22CHE22', department: 'Chemistry', sportId: 's4', year: 'III', phone: '9876543216' },
  { id: 'st8', name: 'Balu Mahendra', email: 'balu@student.com', role: UserRole.STUDENT, rollNumber: '23TAM05', department: 'Tamil', sportId: 's1', year: 'II', phone: '9876543217' },
];

export const MOCK_ATTENDANCE: AttendanceRecord[] = [
  { id: 'att1', studentId: 'st1', sportId: 's1', date: '2026-05-10', status: 'PRESENT', recordedBy: 'c1' },
  { id: 'att2', studentId: 'st2', sportId: 's1', date: '2026-05-10', status: 'ABSENT', recordedBy: 'c1' },
  { id: 'att3', studentId: 'st1', sportId: 's1', date: '2026-05-11', status: 'PRESENT', recordedBy: 'c1' },
  { id: 'att4', studentId: 'st2', sportId: 's1', date: '2026-05-11', status: 'PRESENT', recordedBy: 'c1' },
  { id: 'att5', studentId: 'st3', sportId: 's2', date: '2026-05-10', status: 'PRESENT', recordedBy: 'c2' },
  { id: 'att6', studentId: 'st4', sportId: 's1', date: '2026-05-10', status: 'PRESENT', recordedBy: 'c1' },
  { id: 'att7', studentId: 'st5', sportId: 's2', date: '2026-05-11', status: 'ABSENT', recordedBy: 'c2' },
  { id: 'att8', studentId: 'st6', sportId: 's3', date: '2026-05-12', status: 'PRESENT', recordedBy: 'c3' },
  { id: 'att9', studentId: 'st1', sportId: 's1', date: '2026-05-13', status: 'PRESENT', recordedBy: 'c1' },
  { id: 'att10', studentId: 'st2', sportId: 's1', date: '2026-05-13', status: 'PRESENT', recordedBy: 'c1' },
  { id: 'att11', studentId: 'st3', sportId: 's2', date: '2026-05-13', status: 'PRESENT', recordedBy: 'c2' },
];

// Added MOCK_EVENTS to fix missing export error in SportsEvents.tsx
export const MOCK_EVENTS: Event[] = [
  { id: 'e1', name: 'Inter-College Athletics Championship', date: '2026-05-20', sportId: 's5', location: 'University Main Stadium' },
  { id: 'e2', name: 'Zonal Football Qualifiers', date: '2026-05-25', sportId: 's2', location: 'City Arena' },
  { id: 'e3', name: 'Cricket Major Division Finals', date: '2026-06-02', sportId: 's1', location: 'College Ground' },
  { id: 'e4', name: 'Annual Volleyball Meet', date: '2026-06-10', sportId: 's3', location: 'Indoor Sports Complex' },
];

export const PROJECT_FEATURES = [
  "Advanced User Roles (Admin/Coach/Student)", "Biometric Placeholder Integration", 
  "AI-Driven Attendance Forecasting", "Real-time Dashboard Analytics",
  "Automated PDF/Excel Report Generation", "Department-wise Participation Tracking",
  "Student Medical Clearance Tracking", "Bulk Attendance Marking",
  "QR Code Generation for Students", "SMS/Email Notification Simulation",
  "Tournament & Event Scheduling", "History & Audit Logs",
  "Responsive Mobile-First Design", "Cloud Database Synchronization",
  "Secure JWT Authentication Placeholder", "Multi-Sport Student Registration",
  "Digital ID Card Generation", "Automated Leave Approval Workflow",
  "Sports Equipment Inventory Management", "Coach Performance Monitoring",
  "Inter-Department Leaderboard", "Medal Tally Tracking",
  "GPS-based Practice Location Verification", "Event Budget Tracking",
  "Student Fitness Metric Logs", "Parent-Teacher Notification Portal"
];
