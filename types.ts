
export enum UserRole {
  ADMIN = 'ADMIN',
  COACH = 'COACH',
  STUDENT = 'STUDENT'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
  sportId?: string; // For Coach/Student
}

export interface Sport {
  id: string;
  name: string;
  coachId: string;
  description: string;
}

export interface Student extends User {
  rollNumber: string;
  department: string;
  sportId: string;
  year?: string;
  phone?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
}

export type AbsenceReason = 'Sick' | 'Leave' | 'Absent' | 'General';

export interface AttendanceRecord {
  id: string;
  studentId: string;
  sportId: string;
  date: string; // ISO format
  status: 'PRESENT' | 'ABSENT';
  reason?: AbsenceReason; // Reason for absence
  recordedBy: string; // Coach ID
}

export interface Event {
  id: string;
  name: string;
  date: string;
  sportId: string;
  location: string;
}
