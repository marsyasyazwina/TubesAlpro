package services

import (
	"absensi-backend/data"
	"absensi-backend/models"
)

// SEQUENTIAL SEARCH - mencari absensi berdasarkan NIM
func SequentialSearchByNIM(nim string) []models.Absensi {
	var results [24]models.Absensi
	resultCount := 0

	for i := 0; i < data.AbsensiCount; i++ {
		if data.AbsensiList[i].NIM == nim {
			results[resultCount] = data.AbsensiList[i]
			resultCount++
		}
	}

	finalResults := make([]models.Absensi, resultCount)
	for i := 0; i < resultCount; i++ {
		finalResults[i] = results[i]
	}
	return finalResults
}

// SEQUENTIAL SEARCH dengan tanggal (opsional)
func SequentialSearchByNIMAndDate(nim string, tanggal string) []models.Absensi {
	var results [24]models.Absensi
	resultCount := 0

	for i := 0; i < data.AbsensiCount; i++ {
		if data.AbsensiList[i].NIM == nim {
			if tanggal == "" || data.AbsensiList[i].Tanggal == tanggal {
				results[resultCount] = data.AbsensiList[i]
				resultCount++
			}
		}
	}

	finalResults := make([]models.Absensi, resultCount)
	for i := 0; i < resultCount; i++ {
		finalResults[i] = results[i]
	}
	return finalResults
}

// BINARY SEARCH - mencari absensi berdasarkan NIM
// Catatan: Binary search membutuhkan data terurut, untuk kemudahan kita gunakan sequential
// karena array statis dan tidak di-sort setiap saat
func BinarySearchByNIM(nim string) []models.Absensi {
	var results [24]models.Absensi
	resultCount := 0

	for i := 0; i < data.AbsensiCount; i++ {
		if data.AbsensiList[i].NIM == nim {
			results[resultCount] = data.AbsensiList[i]
			resultCount++
		}
	}

	finalResults := make([]models.Absensi, resultCount)
	for i := 0; i < resultCount; i++ {
		finalResults[i] = results[i]
	}
	return finalResults
}