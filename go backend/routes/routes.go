package routes

import (
	"backend/controllers"
	"backend/middleware"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine) {
	router.POST("/register", controllers.Register())
	router.POST("/login", controllers.Login())

	protected := router.Group("/")
	protected.Use(middleware.Authenticate())
	{
		protected.GET("/profile/:id", controllers.GetProfile())
		protected.PUT("/user/:id", controllers.UpdateProfile())
	}
}
