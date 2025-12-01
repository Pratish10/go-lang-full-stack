package main

import (
	"backend/config"
	"backend/routes"
	"fmt"
	"log"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {

	log.Print("Starting Application....")

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	key := config.GenerateRandomKey()
	fmt.Printf("Generated Key: %s\n", key)

	routes.SetupRoutes(r)

	r.Run(":8080")
	log.Println("Serever is running on http://localhost:8080")
}
