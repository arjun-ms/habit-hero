import axios from "axios";
// const API = "http://127.0.0.1:8000";
const API = import.meta.env.VITE_API_URL;

export async function getMotivation(habit, category, notes="") {
  const res = await axios.post(`${API}/motivation`, {
    habit,
    category,
    notes
  });
  return res.data.motivation;
}
