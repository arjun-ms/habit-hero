import axios from "axios";

const API = "http://127.0.0.1:8000";

export const createLog = (data) => axios.post(`${API}/logs`, data).then(r => r.data);
export const getLogs = (habitId) => axios.get(`${API}/habits/${habitId}/logs`).then(r => r.data);
