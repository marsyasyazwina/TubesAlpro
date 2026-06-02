import { DashboardStats, Mahasiswa, Absensi, SortAlgorithm, SortOrder, RecentActivity } from '../types';

export const getDashboardStats = async (): Promise<DashboardStats> => {
  return { totalMahasiswa: 8, totalRecords: 24, avgAttendance: 85, totalHadir: 20, totalAbsen: 4 };
};

export const getRecentActivities = async (): Promise<RecentActivity[]> => {
  return [
    { id: '1', title: 'Attendance submitted for Grade 10B', time: 'Today, 09:15 AM', type: 'submission' },
    { id: '2', title: '3 students flagged for low attendance', time: 'Yesterday, 04:30 PM', type: 'warning' },
  ];
};

export const getAllMahasiswa = async (): Promise<Mahasiswa[]> => {
  return [
    { id: '1', nama: 'Andi', nim: '001', attendanceRate: 90, status: 'Good', totalHadir: 18, totalMeetings: 20 },
    { id: '2', nama: 'Budi', nim: '002', attendanceRate: 65, status: 'Warning', totalHadir: 13, totalMeetings: 20 },
    { id: '3', nama: 'Citra', nim: '003', attendanceRate: 95, status: 'Good', totalHadir: 19, totalMeetings: 20 },
    { id: '4', nama: 'Dina', nim: '004', attendanceRate: 88, status: 'Good', totalHadir: 17, totalMeetings: 20 },
    { id: '5', nama: 'Eko', nim: '005', attendanceRate: 60, status: 'Warning', totalHadir: 12, totalMeetings: 20 },
    { id: '6', nama: 'Farhan', nim: '006', attendanceRate: 92, status: 'Good', totalHadir: 18, totalMeetings: 20 },
    { id: '7', nama: 'Gita', nim: '007', attendanceRate: 85, status: 'Good', totalHadir: 17, totalMeetings: 20 },
    { id: '8', nama: 'Hadi', nim: '008', attendanceRate: 78, status: 'Good', totalHadir: 15, totalMeetings: 20 },
  ];
};

export const addAbsensi = async (data: Omit<Absensi, 'id'>): Promise<Absensi> => {
  return { ...data, id: Date.now().toString() } as Absensi;
};

export const searchSequential = async (nim: string, tanggal?: string): Promise<Absensi[]> => {
  return [
    { id: '1', mahasiswaId: '001', nama: 'Johnathan Doe', nim: '2024-001', tanggal: '2024-01-15', status: 'present', waktu: '08:45 AM', lokasi: 'Room 402' },
    { id: '2', mahasiswaId: '042', nama: 'Alice Stevens', nim: '2024-042', tanggal: '2024-01-15', status: 'excused', waktu: 'N/A', lokasi: 'Medical Note' },
  ];
};

export const searchBinary = async (nim: string, tanggal?: string): Promise<Absensi[]> => {
  return [
    { id: '3', mahasiswaId: '118', nama: 'Marcus King', nim: '2024-118', tanggal: '2024-01-15', status: 'absent', waktu: 'No Contact', lokasi: undefined },
  ];
};

export const getMahasiswaSorted = async (algorithm: SortAlgorithm, order: SortOrder): Promise<Mahasiswa[]> => {
  const students = await getAllMahasiswa();
  return [...students].sort((a, b) => order === 'asc' ? a.attendanceRate - b.attendanceRate : b.attendanceRate - a.attendanceRate);
};