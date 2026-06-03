package data

import "absensi-backend/models"

// VARIABEL GLOBAL - hanya untuk array utama yang diolah (sesuai spesifikasi)
var (
	MahasiswaList  [8]models.Mahasiswa
	AbsensiList    [24]models.Absensi
	MahasiswaCount = 8
	AbsensiCount   = 15
)

func InitData() {
	// Data Mahasiswa (array statis 8)
	MahasiswaList = [8]models.Mahasiswa{
		{ID: "1", Nama: "Andi", NIM: "001", AttendanceRate: 90, Status: "Good", TotalHadir: 18, TotalMeetings: 20},
		{ID: "2", Nama: "Budi", NIM: "002", AttendanceRate: 65, Status: "Warning", TotalHadir: 13, TotalMeetings: 20},
		{ID: "3", Nama: "Citra", NIM: "003", AttendanceRate: 95, Status: "Good", TotalHadir: 19, TotalMeetings: 20},
		{ID: "4", Nama: "Dina", NIM: "004", AttendanceRate: 88, Status: "Good", TotalHadir: 17, TotalMeetings: 20},
		{ID: "5", Nama: "Eko", NIM: "005", AttendanceRate: 60, Status: "Warning", TotalHadir: 12, TotalMeetings: 20},
		{ID: "6", Nama: "Farhan", NIM: "006", AttendanceRate: 92, Status: "Good", TotalHadir: 18, TotalMeetings: 20},
		{ID: "7", Nama: "Gita", NIM: "007", AttendanceRate: 85, Status: "Good", TotalHadir: 17, TotalMeetings: 20},
		{ID: "8", Nama: "Hadi", NIM: "008", AttendanceRate: 78, Status: "Good", TotalHadir: 15, TotalMeetings: 20},
	}

	// Data Absensi (array statis 24)
	AbsensiList = [24]models.Absensi{
		{ID: "1", MahasiswaID: "1", Nama: "Andi", NIM: "001", Tanggal: "2024-01-15", Status: "present", Waktu: "08:00", Lokasi: "Room 101"},
		{ID: "2", MahasiswaID: "2", Nama: "Budi", NIM: "002", Tanggal: "2024-01-15", Status: "absent", Waktu: "08:00", Lokasi: "Room 101"},
		{ID: "3", MahasiswaID: "3", Nama: "Citra", NIM: "003", Tanggal: "2024-01-15", Status: "present", Waktu: "08:00", Lokasi: "Room 101"},
		{ID: "4", MahasiswaID: "4", Nama: "Dina", NIM: "004", Tanggal: "2024-01-15", Status: "present", Waktu: "08:00", Lokasi: "Room 101"},
		{ID: "5", MahasiswaID: "5", Nama: "Eko", NIM: "005", Tanggal: "2024-01-15", Status: "late", Waktu: "08:00", Lokasi: "Room 101"},
		{ID: "6", MahasiswaID: "6", Nama: "Farhan", NIM: "006", Tanggal: "2024-01-15", Status: "present", Waktu: "08:00", Lokasi: "Room 101"},
		{ID: "7", MahasiswaID: "7", Nama: "Gita", NIM: "007", Tanggal: "2024-01-15", Status: "present", Waktu: "08:00", Lokasi: "Room 101"},
		{ID: "8", MahasiswaID: "8", Nama: "Hadi", NIM: "008", Tanggal: "2024-01-15", Status: "present", Waktu: "08:00", Lokasi: "Room 101"},
	}
}