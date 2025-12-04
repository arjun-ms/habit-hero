import axios from "axios";

const API = "http://127.0.0.1:8000";

export const getHabits = () => axios.get(`${API}/habits`).then(r => r.data);
export const createHabit = (data) => axios.post(`${API}/habits`, data).then(r => r.data);
export const deleteHabit = (id) => axios.delete(`${API}/habits/${id}`).then(r => r.data);
