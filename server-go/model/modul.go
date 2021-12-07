package model

type Data struct {
	Timestamp string `json:"timestamp"`
}

type RAM struct {
	Total      string `json:"total"`
	Used       string `json:"used"`
	Percentage string `json:"percentage"`
}

type CPU struct {
}
