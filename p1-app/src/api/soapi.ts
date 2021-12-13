import axios from 'axios';

export const soapi = axios.create({
    baseURL: "http://localhost:4000/api",
    headers: { 'Content-Type': 'aplication/json' },
});