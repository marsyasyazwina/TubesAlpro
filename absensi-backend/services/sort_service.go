package services

import (
	"absensi-backend/data"
	"absensi-backend/models"
)

// SELECTION SORT - mengurutkan mahasiswa berdasarkan attendance rate
func SelectionSortByAttendance(order string) [8]models.Mahasiswa {
	sorted := data.MahasiswaList
	n := data.MahasiswaCount

	for i := 0; i < n-1; i++ {
		target := i
		for j := i + 1; j < n; j++ {
			if order == "asc" {
				if sorted[j].AttendanceRate < sorted[target].AttendanceRate {
					target = j
				}
			} else {
				if sorted[j].AttendanceRate > sorted[target].AttendanceRate {
					target = j
				}
			}
		}
		// Swap
		sorted[i], sorted[target] = sorted[target], sorted[i]
	}
	return sorted
}

// INSERTION SORT - mengurutkan mahasiswa berdasarkan nama
func InsertionSortByName(order string) [8]models.Mahasiswa {
	sorted := data.MahasiswaList
	n := data.MahasiswaCount

	for i := 1; i < n; i++ {
		key := sorted[i]
		j := i - 1

		if order == "asc" {
			for j >= 0 && sorted[j].Nama > key.Nama {
				sorted[j+1] = sorted[j]
				j--
			}
		} else {
			for j >= 0 && sorted[j].Nama < key.Nama {
				sorted[j+1] = sorted[j]
				j--
			}
		}
		sorted[j+1] = key
	}
	return sorted
}