package controllers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/cgomez29/so1_proyecto1_201801480/model"
	"github.com/gin-gonic/gin"
)

//ModulController interface is a contract what this controller can do
type ModulController interface {
	InfoTimeStamp(ctx *gin.Context)
}

type modulController struct {
}

//NewModulController is creating a new instance of ModulController
func NewModulController() ModulController {
	return &modulController{}
}

func (c *modulController) InfoTimeStamp(ctx *gin.Context) {
	data, err := ioutil.ReadFile("/proc/timestamps")

	if err != nil {
		fmt.Println(err)
	}

	var dataJson model.Data
	json.Unmarshal([]byte(data), &dataJson)

	ctx.JSON(http.StatusOK, dataJson)
}

func (c *modulController) InfoMemo(ctx *gin.Context) {
	data, err := ioutil.ReadFile("/proc/memo_201801480")

	if err != nil {
		fmt.Println(err)
	}

	var dataJson model.RAM
	json.Unmarshal([]byte(data), &dataJson)

	ctx.JSON(http.StatusOK, dataJson)

}

func (c *modulController) InfoCPU(ctx *gin.Context) {

}
