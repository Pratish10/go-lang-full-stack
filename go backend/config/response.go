package config

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type ApiResponse struct {
	Success bool        `json:"success"`
	Data    interface{} `json:"data"`
	Message string      `json:"message"`
	Error   string      `json:"error"`
}

func RespondSuccess(c *gin.Context, data interface{}, message string) {
	c.JSON(http.StatusOK, ApiResponse{
		Success: true,
		Data:    data,
		Message: message,
		Error:   "",
	})
}

func RespondError(c *gin.Context, status int, message string, err error) {
	c.JSON(status, ApiResponse{
		Success: false,
		Data:    nil,
		Message: message,
		Error:   err.Error(),
	})
}
