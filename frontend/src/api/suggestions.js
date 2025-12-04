import axios from "axios";

const API = "http://127.0.0.1:8000";

export const generateSuggestionFromExisting = async (habits) => {
  const res = await axios.post(`${API}/suggest/existing`, { habits });
  return res.data.suggestion;
};

export const generateSuggestionFromGoals = async (goals) => {
  const res = await axios.post(`${API}/suggest/goals`, { goals });
  return res.data.suggestion;
};
