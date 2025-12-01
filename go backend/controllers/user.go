package controllers

import (
	"backend/config"
	"backend/helpers"
	"backend/models"
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"go.mongodb.org/mongo-driver/bson"
)

var validate = validator.New()

var userCollection = config.OpenCollection("users")

func GetProfile() gin.HandlerFunc {
	return func(c *gin.Context) {
		requestedUserID := c.Param("id")

		claims, exists := c.Get("claims")
		if !exists {
			config.RespondError(c, http.StatusUnauthorized, "Unauthorized", nil)
			return
		}

		tokenClaims, ok := claims.(*helpers.Claims)
		if !ok {
			config.RespondError(c, http.StatusUnauthorized, "Invalid Claims", nil)
			return
		}

		tokenUserId := tokenClaims.UserID
		if requestedUserID != tokenUserId {
			config.RespondError(c, http.StatusUnauthorized, "Forbidden: You can only access your own profile", nil)
			return
		}

		ctx, cancel := context.WithTimeout(context.Background(), 60*time.Second)
		defer cancel()

		var user models.User
		err := userCollection.FindOne(ctx, bson.M{"user_id": requestedUserID}).Decode(&user)
		if err != nil {
			config.RespondError(c, http.StatusNotFound, "User not found", nil)
			return
		}

		config.RespondSuccess(c, user, "User not found")
	}
}

func UpdateProfile() gin.HandlerFunc {
	return func(c *gin.Context) {
		requestedUserID := c.Param("id")

		claims, exists := c.Get("claims")
		if !exists {
			config.RespondError(c, http.StatusUnauthorized, "Unauthorized", nil)
			return
		}

		tokenClaims, ok := claims.(*helpers.Claims)
		if !ok {
			config.RespondError(c, http.StatusUnauthorized, "Invalid Claims", nil)
			return
		}

		if requestedUserID != tokenClaims.UserID {
			config.RespondError(c, http.StatusForbidden, "Invalid Claims", nil)
			return
		}

		var body struct {
			FirstName string `json:"firstName"`
			LastName  string `json:"lastName"`
		}

		if err := c.ShouldBindJSON(&body); err != nil {
			config.RespondError(c, http.StatusBadRequest, "Invalid request body", err)
			return
		}

		if len(body.FirstName) < 2 || len(body.FirstName) > 50 {
			config.RespondError(c, http.StatusBadRequest, "First name must be between 2 and 50 characters", nil)
			return
		}

		if len(body.LastName) < 2 || len(body.LastName) > 50 {
			config.RespondError(c, http.StatusBadRequest, "Last name must be between 2 and 50 characters", nil)
			return
		}

		ctx, cancel := context.WithTimeout(context.Background(), time.Second*60)
		defer cancel()

		updateData := bson.M{
			"first_name": body.FirstName,
			"last_name":  body.LastName,
		}

		_, err := userCollection.UpdateOne(
			ctx,
			bson.M{"user_id": requestedUserID},
			bson.M{"$set": updateData},
		)

		if err != nil {
			config.RespondError(c, http.StatusInternalServerError, "Could not update profile", nil)
			return
		}

		var updatedUser models.User
		err = userCollection.FindOne(ctx, bson.M{"user_id": requestedUserID}).
			Decode(&updatedUser)

		if err != nil {
			config.RespondError(c, http.StatusInternalServerError, "Error fetching updated profile", nil)
			return
		}

		config.RespondSuccess(c, updatedUser, "User profile updated successfully")
	}
}
