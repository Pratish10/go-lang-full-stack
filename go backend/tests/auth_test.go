package tests

import (
	"backend/routes"
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	gin.SetMode(gin.TestMode)
	r := gin.Default()
	routes.SetupRoutes(r)
	return r
}

func TestRegister(t *testing.T) {
	router := SetupRouter()

	body := map[string]interface{}{
		"First_name": "John",
		"Last_name":  "Doe",
		"email":      "john@example.com",
		"password":   "Password@123",
	}

	jsonBody, _ := json.Marshal(body)
	req, _ := http.NewRequest("POST", "/register", bytes.NewBuffer(jsonBody))
	req.Header.Set("Content-Type", "application/json")

	resp := httptest.NewRecorder()
	router.ServeHTTP(resp, req)

	if resp.Code != http.StatusCreated && resp.Code != http.StatusOK {
		t.Errorf("expected status 200/201 but got %d", resp.Code)
	}
}

func TestLogin(t *testing.T) {
	router := SetupRouter()

	body := map[string]string{
		"email":    "john@example.com",
		"password": "Password@123",
	}

	jsonBody, _ := json.Marshal(body)
	req, _ := http.NewRequest("POST", "/login", bytes.NewBuffer(jsonBody))
	req.Header.Set("Content-Type", "application/json")

	resp := httptest.NewRecorder()
	router.ServeHTTP(resp, req)

	if resp.Code != http.StatusOK {
		t.Errorf("expected 200 OK but got %d", resp.Code)
	}
}
