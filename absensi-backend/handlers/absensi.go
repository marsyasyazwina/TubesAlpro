package handlers

import (
	"absensi-backend/models"
	"absensi-backend/services"
	"encoding/json"
	"net/http"
)

type AddAbsensiRequest struct {
	MahasiswaID string `json:"mahasiswaId"`
	Nama        string `json:"nama"`
	NIM         string `json:"nim"`
	Tanggal     string `json:"tanggal"`
	Status      string `json:"status"`
	Waktu       string `json:"waktu"`
	Lokasi      string `json:"lokasi"`
}

func AddAbsensiHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req AddAbsensiRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	absensi := models.Absensi{
		MahasiswaID: req.MahasiswaID,
		Nama:        req.Nama,
		NIM:         req.NIM,
		Tanggal:     req.Tanggal,
		Status:      models.StatusType(req.Status),
		Waktu:       req.Waktu,
		Lokasi:      req.Lokasi,
	}

	result := services.AddAbsensi(absensi)

	// Update statistik mahasiswa
	services.UpdateMahasiswaAttendance(req.NIM, models.StatusType(req.Status))

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}