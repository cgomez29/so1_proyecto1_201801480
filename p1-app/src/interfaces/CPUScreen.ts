export interface Child {
    id:     number;
    name:   string;
}

export interface Process {
    pid:        number;
    name:       string;
    user:       string;
    state:      number;
    ram:        number;
    childs:     Child[];
}

export interface CPU {
    processes:          Process[];
    running:            number;
    sleeping:           number;
    zombie:             number;
    stopped:            number;
    total_processes:    number;
}

export interface UsedCPU {
    cpu:        number;
}