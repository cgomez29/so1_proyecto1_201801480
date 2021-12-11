package helper

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os/exec"
	"strings"

	"github.com/cgomez29/so1_proyecto1_201801480/model"
)

func GetDataRam() model.RAM {
	data, err := ioutil.ReadFile("/proc/memo_201801480")

	if err != nil {
		fmt.Println(err)
	}

	var dataJson model.RAM
	json.Unmarshal([]byte(data), &dataJson)

	return dataJson
}

func GetDataCPU() model.CPU {
	data, err := ioutil.ReadFile("/proc/cpu_201801480")

	if err != nil {
		fmt.Println(err)
	}

	//correciones al json leido
	dataStr := strings.Replace(string(data), ",]", "]", -1)
	dataStr = strings.Replace(string(dataStr), "]},]", "}]", -1)

	var dataJson model.CPU
	err = json.Unmarshal([]byte(dataStr), &dataJson)

	if err != nil {
		fmt.Println(err)
	}

	for i, val := range dataJson.Processes {
		cmd := exec.Command("sh", "-c", "getent passwd "+val.User+" | cut -d: -f1")
		out, err := cmd.CombinedOutput()

		if err != nil {
			fmt.Println(err)
		}
		output := string(out[:])
		dataJson.Processes[i].User = output
	}

	return dataJson
}
