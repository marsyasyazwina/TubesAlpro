export type StatusType = 'present' | 'absent' | 'excused' | 'late';
export type AttendanceStatus = 'Good' | 'Warning' | 'Poor';
export type SortOrder = 'asc' | 'desc';
export type SortAlgorithm = 'selection' | 'insertion';
export type SearchAlgorithm = 'sequential' | 'binary';

export interface Mahasiswa {
  id: string;
  nama: string;
  nim: string;
  attendanceRate: number;
  status: AttendanceStatus;
  totalHadir: number;
  totalMeetings: number;
}

export interface Absensi {
  id: string;
  mahasiswaId: string;
  nama: string;
  nim: string;
  tanggal: string;
  status: StatusType;
  waktu: string;
  lokasi?: string;
}

export interface DashboardStats {
  totalMahasiswa: number;
  totalRecords: number;
  avgAttendance: number;
  totalHadir: number;
  totalAbsen: number;
}

export interface RecentActivity {
  id: string;
  title: string;
  time: string;
  type: 'submission' | 'warning' | 'update';
}