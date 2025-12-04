import axios from "axios";

const API = "http://127.0.0.1:8000";

export const getLogsForHabit = async (habitId) => {
  const res = await axios.get(`${API}/habits/${habitId}/logs`);
  return res.data;
};

export const createLog = async (data) => {
  const res = await axios.post(`${API}/logs`, data);
  return res.data;
};
