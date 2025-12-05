import axios from "axios";
// const API = "http://127.0.0.1:8000";
const API = import.meta.env.VITE_API_URL;

export const getBadges = (id) =>
  axios.get(`${API}/habit/${id}/badges`).then((r) => r.data);
