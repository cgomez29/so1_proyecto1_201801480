package controllers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"strconv"

	"github.com/cgomez29/so1_proyecto1_201801480/helper"
	"github.com/cgomez29/so1_proyecto1_201801480/model"
	"github.com/gin-gonic/gin"
)

// ModulController interface is a contract what this controller can do
type ModulController interface {
	InfoTimeStamp(ctx *gin.Context)
	InfoMemo(ctx *gin.Context)
	InfoCPU(ctx *gin.Context)
	KillPorcess(ctx *gin.Context)
	InfoCPUTree(ctx *gin.Context)
}

type modulController struct {
}

// NewModulController is creating a new instance of ModulController
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
	ctx.JSON(http.StatusOK, helper.GetDataRam())
}

func (c *modulController) InfoCPU(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, helper.GetDataCPU())
}

func (c *modulController) InfoCPUTree(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, helper.GetDataCPUForTree())
}

func (c *modulController) KillPorcess(ctx *gin.Context) {
	id, err := strconv.Atoi(ctx.Param("id")) //get id process

	if err != nil {
		fmt.Println("ID incorrect")
	}

	process, err := os.FindProcess(id)

	if err != nil {
		fmt.Println("ID incorrect")
	}

	err = process.Kill()

	if err != nil {
		fmt.Println("ID incorrect")
	}

	ctx.JSON(http.StatusOK, gin.H{
		"data": "Succesfull",
	})
}
