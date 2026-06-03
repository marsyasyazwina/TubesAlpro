package main

import (
	"absensi-backend/data"
	"absensi-backend/handlers"
	"log"
	"net/http"
	"os"

	"github.com/rs/cors"
)

func main() {
	// Inisialisasi data
	data.InitData()

	// Setup routes
	mux := http.NewServeMux()

	// Dashboard
	mux.HandleFunc("/api/dashboard/stats", handlers.GetDashboardStats)

	// Mahasiswa
	mux.HandleFunc("/api/mahasiswa", handlers.GetAllMahasiswa)
	mux.HandleFunc("/api/mahasiswa/search", handlers.GetMahasiswaByNIM)

	// Absensi
	mux.HandleFunc("/api/absensi", handlers.AddAbsensiHandler)

	// Search Algorithms
	mux.HandleFunc("/api/absensi/search/sequential", handlers.SequentialSearchHandler)
	mux.HandleFunc("/api/absensi/search/binary", handlers.BinarySearchHandler)

	// Sort Algorithms
	mux.HandleFunc("/api/mahasiswa/sort/selection", handlers.SelectionSortHandler)
	mux.HandleFunc("/api/mahasiswa/sort/insertion", handlers.InsertionSortHandler)

	// CORS middleware
	handler := cors.Default().Handler(mux)

	// Ambil PORT dari environment variable (Render akan set ini)
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Start server
	log.Println("Server running on http://localhost:" + port)
	log.Fatal(http.ListenAndServe(":"+port, handler))
}
