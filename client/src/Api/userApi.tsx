import axios from "axios";

const API_BASE = "http://localhost:8080/api/users"; // Adjust if needed

export const signupUser = async (data: { name: string; email: string; password: string }) => {
  const res = await axios.post(`${API_BASE}/signup`, data);
  return res.data;
};

export const loginUser = async (data: { email: string; password: string }) => {
  const res = await axios.post(`${API_BASE}/login`, data);
  return res.data;
};

export const fetchMe = async (token: string) => {
  const res = await axios.get(`${API_BASE}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
