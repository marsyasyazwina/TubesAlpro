package handlers

import (
	"absensi-backend/services"
	"encoding/json"
	"net/http"
)

func SelectionSortHandler(w http.ResponseWriter, r *http.Request) {
	order := r.URL.Query().Get("order")
	if order == "" {
		order = "desc"
	}

	sorted := services.SelectionSortByAttendance(order)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(sorted)
}

func InsertionSortHandler(w http.ResponseWriter, r *http.Request) {
	order := r.URL.Query().Get("order")
	if order == "" {
		order = "asc"
	}

	sorted := services.InsertionSortByName(order)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(sorted)
}