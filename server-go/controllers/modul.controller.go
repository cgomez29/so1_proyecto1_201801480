package controllers

import (
	"fmt"
	"io/ioutil"
	"net/http"

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

	ctx.JSON(http.StatusOK, gin.H{
		"data": data,
	})
}
