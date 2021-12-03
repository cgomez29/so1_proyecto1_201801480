package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	//static failes
	router.LoadHTMLFiles("public/index.html")

	//routes
	router.GET("/", func(c *gin.Context) {
		c.HTML(200, "index.html", gin.H{
			"title": "api",
		})
	})

	//middlewares

	router.Run(":4000")
}
