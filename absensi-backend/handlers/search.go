package handlers

import (
	"absensi-backend/models"
	"absensi-backend/services"
	"encoding/json"
	"net/http"
)

func SequentialSearchHandler(w http.ResponseWriter, r *http.Request) {
	nim := r.URL.Query().Get("nim")
	tanggal := r.URL.Query().Get("tanggal")

	if nim == "" {
		http.Error(w, "NIM required", http.StatusBadRequest)
		return
	}

	var results []models.Absensi
	if tanggal == "" {
		results = services.SequentialSearchByNIM(nim)
	} else {
		results = services.SequentialSearchByNIMAndDate(nim, tanggal)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(results)
}

func BinarySearchHandler(w http.ResponseWriter, r *http.Request) {
	nim := r.URL.Query().Get("nim")
	if nim == "" {
		http.Error(w, "NIM required", http.StatusBadRequest)
		return
	}

	results := services.BinarySearchByNIM(nim)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(results)
}