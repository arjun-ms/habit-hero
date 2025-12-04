import axios from "axios";

const API = "http://127.0.0.1:8000";

export const getHabits = async () => {
  const res = await axios.get(`${API}/habits`);
  return res.data;
};

export const createHabit = async (data) => {
  const res = await axios.post(`${API}/habits`, data);
  return res.data;
};

export const deleteHabit = async (id) => {
  const res = await axios.delete(`${API}/habits/${id}`);
  return res.data;
};


export const updateHabit = async (id, data) => {
    const res = await axios.put(`${API}/habits/${id}`, data);
    return res.data;
  };
  