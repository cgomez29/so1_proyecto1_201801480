package model

type Data struct {
	Timestamp string `json:"timestamp"`
}

type Init struct {
	Run string `json:"run"`
}

// for modul RAM
type RAM struct {
	Total      string `json:"total"`
	Used       string `json:"used"`
	Percentage string `json:"percentage"`
}

// for modul CPU

type Child struct {
	Id   int    `json:"id"`
	Name string `json:"name"`
}

type Prosess struct {
	PID    int     `json:"pid"`
	Name   string  `json:"name"`
	User   string  `json:"user"`
	State  int     `json:"state"`
	Ram    int     `json:"ram"`
	Childs []Child `json:"childs"`
}

type CPU struct {
	Processes       []Prosess `json:"processes"`
	Running         int       `json:"running"`
	Sleeping        int       `json:"sleeping"`
	Zombie          int       `json:"zombie"`
	Stopped         int       `json:"stopped"`
	Total_processes int       `json:"total_processes"`
}
