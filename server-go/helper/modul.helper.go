package helper

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os/exec"
	"strconv"
	"strings"

	"github.com/cgomez29/so1_proyecto1_201801480/model"
	"github.com/shirou/gopsutil/cpu"
)

// executeCommand method for execut commands inlinux
func executeCommand(command string) string {
	cmd := exec.Command("sh", "-c", command)
	out, err := cmd.CombinedOutput()

	if err != nil {
		fmt.Println(err)
	}
	output := string(out[:])
	return output
}

// GetDataRam method returns get data from module memo_201801480
func GetDataRam() model.RAM {
	data, err := ioutil.ReadFile("/proc/memo_201801480")

	if err != nil {
		fmt.Println(err)
	}

	var dataJson model.RAM
	json.Unmarshal([]byte(data), &dataJson)

	// getting de system cache
	cache := executeCommand("free -b | head -n 2 | tail -n 1 | awk '{print $6}'")
	cache = strings.Replace(cache, "\n", "", -1)
	cacheInt, err := strconv.Atoi(cache)

	// calculated (bytes -> mb)
	dataJson.Used = (dataJson.Total - dataJson.Used - cacheInt) / 1000000
	dataJson.Total = dataJson.Total / 1000000
	dataJson.Percentage = dataJson.Used * 100 / dataJson.Total

	return dataJson
}

// GetDataCPU method returns get data from module cpu_201801480
func GetDataCPU() model.CPU {
	data, err := ioutil.ReadFile("/proc/cpu_201801480")

	if err != nil {
		fmt.Println(err)
	}

	// corrections to read json
	dataStr := strings.Replace(string(data), ",]", "]", -1)
	dataStr = strings.Replace(string(dataStr), "]},]", "}]", -1)

	var dataJson model.CPU
	err = json.Unmarshal([]byte(dataStr), &dataJson)

	if err != nil {
		fmt.Println(err)
	}

	// RAM usada
	total_ram := GetDataRam().Used

	for i, val := range dataJson.Processes {
		// username
		cmd := "getent passwd " + val.User + " | cut -d: -f1"
		dataJson.Processes[i].User = executeCommand(cmd)
		// %ram
		ram := dataJson.Processes[i].Ram / 1000000
		dataJson.Processes[i].Ram = ram * 100 / total_ram
	}

	return dataJson
}

// GetDataCPUForTree method returns get data from module cpu_201801480
func GetDataCPUForTree() model.ArrayTree {
	data, err := ioutil.ReadFile("/proc/cpu_201801480")

	if err != nil {
		fmt.Println(err)
	}

	// corrections to read json
	dataStr := strings.Replace(string(data), ",]", "]", -1)
	dataStr = strings.Replace(string(dataStr), "]},]", "}]", -1)

	var dataJson model.CPU
	err = json.Unmarshal([]byte(dataStr), &dataJson)

	if err != nil {
		fmt.Println(err)
	}

	tree := model.ArrayTree{}

	var arrayTree []model.Tree

	// preparando data para el arbol de procesos
	for _, val := range dataJson.Processes {
		var tree model.Tree
		tree.Id = strconv.Itoa(val.PID)
		tree.Label = strconv.Itoa(val.PID) + " " + val.Name
		list := []model.Tree{}
		for _, c := range val.Childs {
			child := model.Tree{}
			child.Id = strconv.Itoa(c.Id)
			child.Label = strconv.Itoa(c.Id) + " " + c.Name
			child.ParentId = tree.Id
			list = append(list, child)
		}
		tree.Items = list
		arrayTree = append(arrayTree, tree)
	}
	tree.Tree = arrayTree
	return tree
}

func GetDataUsedCPU() model.UsedCPU {

	var dataJson model.UsedCPU

	/* cmd := executeCommand("ps -eo pcpu | sort -k 1 -r | head -60 | tail -59")

	list := strings.Split(cmd, "\n")

	var cpu_utilizado float64

	for _, val := range list {

		value := strings.ReplaceAll(val, " ", "")
		if value != "" {
			item, err := strconv.ParseFloat(value, 64)

			if err != nil {
				fmt.Println(err)
			}
			cpu_utilizado += item
		}
	}

	dataJson.CPU = cpu_utilizado / 12 // cpu -> 12 */

	cpu, _ := cpu.Percent(0, true)

	for _, val := range cpu {
		dataJson.CPU += val
	}

	dataJson.CPU = dataJson.CPU / 12

	return dataJson
}
