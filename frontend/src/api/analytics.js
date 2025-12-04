import axios from "axios";

const API = "http://127.0.0.1:8000";

export const getHabitAnalytics = async (habitId) => {
  const res = await axios.get(`${API}/habits/${habitId}/analytics`);
  return res.data;
};
