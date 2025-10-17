// src/api/userApi.tsx
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

// --- Signup ---
export interface SignupData {
  name: string;
  email: string;
  password: string;
}

export const signup = async (data: SignupData) => {
  try {
    const res = await axios.post(`${API_BASE}/api/auth/signup`, data);
    return res.data; // assume it returns { user, token }
  } catch (err: any) {
    throw new Error(err.response?.data?.message || err.message);
  }
};

// --- Login ---
export interface LoginData {
  email: string;
  password: string;
}

export const login = async (data: LoginData) => {
  try {
    const res = await axios.post(`${API_BASE}/api/auth/login`, data);
    return res.data; // assume it returns { user, token }
  } catch (err: any) {
    throw new Error(err.response?.data?.message || err.message);
  }
};

// --- Fetch Me ---
export interface User {
  id: string;
  name: string;
  email: string;
}

export const fetchMe = async (token: string): Promise<User> => {
  if (!token) throw new Error("No token provided");

  try {
    const res = await axios.get(`${API_BASE}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || err.message);
  }
};

// Example API function
export const forgotPassword = async (data: { email: string }) => {
  const res = await axios.post(`${API_BASE}//api/auth/forgot-password`, data)
  return res.data;
};
