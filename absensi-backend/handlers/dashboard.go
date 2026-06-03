package handlers

import (
	"absensi-backend/data"
	"absensi-backend/models"
	"encoding/json"
	"net/http"
)

func GetDashboardStats(w http.ResponseWriter, r *http.Request) {
	totalHadir := 0
	totalAbsen := 0

	for i := 0; i < data.AbsensiCount; i++ {
		if data.AbsensiList[i].Status == "present" || data.AbsensiList[i].Status == "late" {
			totalHadir++
		} else if data.AbsensiList[i].Status == "absent" {
			totalAbsen++
		}
	}

	totalMahasiswa := data.MahasiswaCount
	totalRecords := data.AbsensiCount

	avgAttendance := 0
	for i := 0; i < data.MahasiswaCount; i++ {
		avgAttendance += data.MahasiswaList[i].AttendanceRate
	}
	if totalMahasiswa > 0 {
		avgAttendance = avgAttendance / totalMahasiswa
	}

	stats := models.DashboardStats{
		TotalMahasiswa: totalMahasiswa,
		TotalRecords:   totalRecords,
		AvgAttendance:  avgAttendance,
		TotalHadir:     totalHadir,
		TotalAbsen:     totalAbsen,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(stats)
}