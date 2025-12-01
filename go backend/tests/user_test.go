package tests

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestGetProfile(t *testing.T) {
	router := SetupRouter()

	req, _ := http.NewRequest("GET", "/profile/692d42dacbc25fc6295c8f33", nil)
	req.Header.Set("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjkyZDQyZGFjYmMyNWZjNjI5NWM4ZjMzIiwiZW1haWwiOiJwcmF0aXNoLjEwMDZAZ21haWwuY29tIiwicm9sZSI6IiIsImV4cCI6MTc2NDY2MTc2OH0.cT5FQ2-SK4XrXAXWq1BSBcqmrjdone3oy38MqylSlyM")

	resp := httptest.NewRecorder()
	router.ServeHTTP(resp, req)

	if resp.Code != http.StatusOK {
		t.Errorf("expected 200 OK but got %d", resp.Code)
	}
}

func TestUpdateUser(t *testing.T) {
	router := SetupRouter()

	body := map[string]interface{}{
		"firstName": "Updated",
		"lastName":  "User",
	}

	jsonBody, _ := json.Marshal(body)
	req, _ := http.NewRequest("PUT", "/user/692d42dacbc25fc6295c8f33", bytes.NewBuffer(jsonBody))
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjkyZDQyZGFjYmMyNWZjNjI5NWM4ZjMzIiwiZW1haWwiOiJwcmF0aXNoLjEwMDZAZ21haWwuY29tIiwicm9sZSI6IiIsImV4cCI6MTc2NDY2MTc2OH0.cT5FQ2-SK4XrXAXWq1BSBcqmrjdone3oy38MqylSlyM")

	resp := httptest.NewRecorder()
	router.ServeHTTP(resp, req)

	if resp.Code != http.StatusOK && resp.Code != http.StatusAccepted {
		t.Errorf("expected 200/202 but got %d", resp.Code)
	}
}
