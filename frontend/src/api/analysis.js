import axios from "axios";
const API = "http://127.0.0.1:8000";

export const analyzeNotes = async (habitId) => {
  const res = await axios.post(`${API}/analyze-notes`, {
    habit_id: habitId,
  });
  return res.data;
};
