package services

import (
	"absensi-backend/data"
	"absensi-backend/models"
)

func GetAllMahasiswa() [8]models.Mahasiswa {
	return data.MahasiswaList
}

func GetMahasiswaByNIM(nim string) *models.Mahasiswa {
	for i := 0; i < data.MahasiswaCount; i++ {
		if data.MahasiswaList[i].NIM == nim {
			return &data.MahasiswaList[i]
		}
	}
	return nil
}

func UpdateMahasiswaAttendance(nim string, status models.StatusType) {
	for i := 0; i < data.MahasiswaCount; i++ {
		if data.MahasiswaList[i].NIM == nim {
			if status == "present" || status == "late" {
				data.MahasiswaList[i].TotalHadir++
			}
			data.MahasiswaList[i].AttendanceRate = (data.MahasiswaList[i].TotalHadir * 100) / data.MahasiswaList[i].TotalMeetings

			rate := data.MahasiswaList[i].AttendanceRate
			if rate >= 75 {
				data.MahasiswaList[i].Status = "Good"
			} else if rate >= 50 {
				data.MahasiswaList[i].Status = "Warning"
			} else {
				data.MahasiswaList[i].Status = "Poor"
			}
			break
		}
	}
}