package main

import (
	"github.com/cgomez29/so1_proyecto1_201801480/middleware"
	"github.com/cgomez29/so1_proyecto1_201801480/socket"
	"github.com/gin-gonic/gin"
	socketio "github.com/googollee/go-socket.io"
)

var (
	server *socketio.Server = socket.CreateServerSocket()
)

func main() {
	go server.Serve()
	defer server.Close()

	router := gin.Default()

	//static failes
	router.LoadHTMLFiles("public/index.html")

	//middlewares
	router.Use(middleware.GinMiddleware("http://localhost:3000"))

	//routes
	router.GET("/", func(c *gin.Context) {
		c.HTML(200, "index.html", gin.H{
			"title": "api",
		})
	})
	router.GET("/socket.io/", gin.WrapH(server))

	router.Run(":4000")
}
