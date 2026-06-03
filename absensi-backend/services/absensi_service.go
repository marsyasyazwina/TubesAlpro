package services

import (
	"absensi-backend/data"
	"absensi-backend/models"
	"strconv"
)

func AddAbsensi(absensi models.Absensi) models.Absensi {
	absensi.ID = strconv.Itoa(data.AbsensiCount + 1)
	data.AbsensiList[data.AbsensiCount] = absensi
	data.AbsensiCount++
	return absensi
}

func GetAllAbsensi() [24]models.Absensi {
	return data.AbsensiList
}

func GetAbsensiByNIM(nim string, tanggal string) []models.Absensi {
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