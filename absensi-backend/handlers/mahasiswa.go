package handlers

import (
	"absensi-backend/services"
	"encoding/json"
	"net/http"
)

func GetAllMahasiswa(w http.ResponseWriter, r *http.Request) {
	mahasiswa := services.GetAllMahasiswa()
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(mahasiswa)
}

func GetMahasiswaByNIM(w http.ResponseWriter, r *http.Request) {
	nim := r.URL.Query().Get("nim")
	if nim == "" {
		http.Error(w, "NIM required", http.StatusBadRequest)
		return
	}

	mahasiswa := services.GetMahasiswaByNIM(nim)
	if mahasiswa == nil {
		http.Error(w, "Mahasiswa not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(mahasiswa)
}