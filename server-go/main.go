package main

import (
	"github.com/cgomez29/so1_proyecto1_201801480/controllers"
	"github.com/cgomez29/so1_proyecto1_201801480/middleware"
	"github.com/cgomez29/so1_proyecto1_201801480/socket"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

var (
	modulController controllers.ModulController = controllers.NewModulController()
	webSocket       socket.WebSocket            = socket.NewWebSocket()
)

func main() {

	router := gin.Default()

	//static failes
	router.Use(static.Serve("/", static.LocalFile("./public", true)))
	//middlewares
	router.Use(middleware.GinMiddleware("http://localhost:3000"))

	//routes
	router.GET("/api/test", modulController.InfoTimeStamp)
	router.GET("/api/ram", modulController.InfoMemo)
	router.GET("/api/cpu", modulController.InfoCPU)
	router.GET("/api/kill/:id", modulController.KillPorcess)
	//WebSocket
	router.GET("/ram", webSocket.RAM)
	router.GET("/cpu", webSocket.CPU)
	router.GET("/ucpu", webSocket.UsedCPU)
	/* 	router.GET("/", func(c *gin.Context) {
		c.HTML(200, "index.html", gin.H{
			"title": "api",
		})
	}) */

	router.Run(":4000")
}
