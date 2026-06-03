package models

type StatusType string
type AttendanceStatus string

const (
	Present StatusType = "present"
	Absent  StatusType = "absent"
	Excused StatusType = "excused"
	Late    StatusType = "late"
)

const (
	Good    AttendanceStatus = "Good"
	Warning AttendanceStatus = "Warning"
	Poor    AttendanceStatus = "Poor"
)

type Mahasiswa struct {
	ID             string
	Nama           string
	NIM            string
	AttendanceRate int
	Status         AttendanceStatus
	TotalHadir     int
	TotalMeetings  int
}

type Absensi struct {
	ID          string
	MahasiswaID string
	Nama        string
	NIM         string
	Tanggal     string
	Status      StatusType
	Waktu       string
	Lokasi      string
}

type DashboardStats struct {
	TotalMahasiswa int
	TotalRecords   int
	AvgAttendance  int
	TotalHadir     int
	TotalAbsen     int
}