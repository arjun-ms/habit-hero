import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const getHabitAnalytics = async (habitId) => {
  const response = await axios.get(`${API_URL}/habits/${habitId}/analytics`);
  return response.data;
};
