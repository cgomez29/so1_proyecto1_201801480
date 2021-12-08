package socket

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"time"

	"github.com/cgomez29/so1_proyecto1_201801480/model"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

type WebSocket interface {
	RAM(ctx *gin.Context)
	CPU(ctx *gin.Context)
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

func getDataRam() model.RAM {
	data, err := ioutil.ReadFile("/proc/memo_201801480")

	if err != nil {
		fmt.Println(err)
	}

	var dataJson model.RAM
	json.Unmarshal([]byte(data), &dataJson)

	return dataJson
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
		err = ws.WriteJSON(getDataRam())

		if err != nil {
			log.Println("error write json" + err.Error())
		}
		time.Sleep(1 * time.Second)
	}
}

func (c *webSocket) CPU(ctx *gin.Context) {

}
