import axios from "axios";

// const API = "http://127.0.0.1:8000";
const API = import.meta.env.VITE_API_URL;

export const getLogsForHabit = async (habitId) => {
  const res = await axios.get(`${API}/habits/${habitId}/logs`);
  return res.data;
};

export const createLog = async (data) => {
  const res = await axios.post(`${API}/logs`, data);
  return res.data;
};

export const deleteLog = async (log_id) => {
    const res = await axios.delete(`${API}/logs/${log_id}`);
    return res.data;
};