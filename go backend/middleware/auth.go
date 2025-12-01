package middleware

import (
	"backend/config"
	"backend/helpers"
	"log"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

func Authenticate() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		log.Printf("Raw Authorization Header: %s", authHeader)

		if authHeader == "" {
			config.RespondError(c, http.StatusUnauthorized, "authorization header required", nil)
			c.Abort()
			return
		}

		authHeader = strings.TrimPrefix(authHeader, "Bearer ")
		log.Printf("Token after trimming Bearer: %s", authHeader)

		if authHeader == "" {
			config.RespondError(c, http.StatusUnauthorized, "invalid authorization header format", nil)
			c.Abort()
			return
		}

		claims, err := helpers.ValidateToken(authHeader)
		if err != nil {
			log.Printf("Token validation error: %v", err)
			config.RespondError(c, http.StatusUnauthorized, "invalid token", nil)
			c.Abort()
			return
		}

		c.Set("claims", claims)
		c.Next()
	}
}
