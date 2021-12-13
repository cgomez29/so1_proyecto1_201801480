package socket

import (
	"log"
	"net/http"
	"time"

	"github.com/cgomez29/so1_proyecto1_201801480/helper"
	"github.com/cgomez29/so1_proyecto1_201801480/model"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

type WebSocket interface {
	RAM(ctx *gin.Context)
	CPU(ctx *gin.Context)
	UsedCPU(ctx *gin.Context)
}

type webSocket struct {
}

var upGrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func NewWebSocket() WebSocket {
	return &webSocket{}
}

func (c *webSocket) RAM(ctx *gin.Context) {
	ws, err := upGrader.Upgrade(ctx.Writer, ctx.Request, nil)
	if err != nil {
		log.Println("error get connection")
		log.Fatal(err)
	}

	defer ws.Close()

	var data model.Init

	err = ws.ReadJSON(&data)

	if err != nil {
		log.Println("error read json")
		log.Fatal(err)
	}

	for {
		err = ws.WriteJSON(helper.GetDataRam())

		if err != nil {
			log.Println("error write json " + err.Error())
		}
		time.Sleep(1 * time.Second)
	}
}

func (c *webSocket) CPU(ctx *gin.Context) {
	ws, err := upGrader.Upgrade(ctx.Writer, ctx.Request, nil)
	if err != nil {
		log.Println("error get connection")
		log.Fatal(err)
	}

	defer ws.Close()

	var data model.Init

	err = ws.ReadJSON(&data)

	if err != nil {
		log.Println("error read json")
		log.Fatal(err)
	}

	for {
		err = ws.WriteJSON(helper.GetDataCPU())

		if err != nil {
			log.Println("error write json " + err.Error())
		}
		time.Sleep(1 * time.Second)
	}
}

func (c *webSocket) UsedCPU(ctx *gin.Context) {
	ws, err := upGrader.Upgrade(ctx.Writer, ctx.Request, nil)
	if err != nil {
		log.Println("error get connection")
		log.Fatal(err)
	}

	defer ws.Close()

	var data model.Init

	err = ws.ReadJSON(&data)

	if err != nil {
		log.Println("error read json")
		log.Fatal(err)
	}

	for {
		err = ws.WriteJSON(helper.GetDataUsedCPU())

		if err != nil {
			log.Println("error write json " + err.Error())
		}
		time.Sleep(1 * time.Second)
	}
}
