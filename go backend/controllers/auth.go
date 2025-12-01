package controllers

import (
	"backend/config"
	"backend/helpers"
	"backend/models"
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func Register() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		var user models.User

		if err := c.BindJSON(&user); err != nil {
			config.RespondError(c, http.StatusBadRequest, err.Error(), err)
			return
		}

		if validationErr := validate.Struct(user); validationErr != nil {
			config.RespondError(c, http.StatusBadRequest, validationErr.Error(), validationErr)
			return
		}

		count, err := userCollection.CountDocuments(ctx, bson.M{
			"$or": []bson.M{
				{"email": user.Email},
			},
		})

		if err != nil {
			config.RespondError(c, http.StatusInternalServerError, err.Error(), err)
			return
		}

		if count > 0 {
			config.RespondError(c, http.StatusBadRequest, "Email or phone already exists", err)
			return
		}

		user.Password = helpers.HashPassword(user.Password)
		user.Created_at = time.Now()
		user.Updated_at = time.Now()
		user.ID = primitive.NewObjectID()
		user.User_id = user.ID.Hex()
		accessToken, refreshToken := helpers.GenerateTokens(*user.Email, user.User_id)
		user.Token = &accessToken
		user.Refresh_token = &refreshToken

		_, insertErr := userCollection.InsertOne(ctx, user)
		if insertErr != nil {
			config.RespondError(c, http.StatusInternalServerError, insertErr.Error(), err)
			return
		}

		config.RespondSuccess(c, nil, "User Created Successfully")
	}
}

func Login() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 60*time.Second)
		defer cancel()

		var user models.User
		var foundUser models.User

		// Get user input
		if err := c.BindJSON(&user); err != nil {
			config.RespondError(c, http.StatusBadRequest, err.Error(), err)
			return
		}

		err := userCollection.FindOne(ctx, bson.M{"email": user.Email}).Decode(&foundUser)

		if err != nil {
			config.RespondError(c, http.StatusBadRequest, "Invalid email or password", err)
			return
		}

		passwordIsValid, msg := helpers.VerifyPassword(*foundUser.Password, *user.Password)
		if !passwordIsValid {
			config.RespondError(c, http.StatusUnauthorized, msg.Error(), err)
			return
		}

		token, refreshToken := helpers.GenerateTokens(*foundUser.Email, *&foundUser.User_id)
		helpers.UpdateAllTokens(token, refreshToken, foundUser.User_id)

		config.RespondSuccess(c, gin.H{
			"user":          foundUser,
			"token":         token,
			"refresh_token": refreshToken,
		}, "Logged in Successfully")

	}
}
