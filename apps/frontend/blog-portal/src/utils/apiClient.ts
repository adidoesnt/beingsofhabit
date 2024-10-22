import axios from "axios";

const { VITE_BACKEND_URL = "DUMMY-URL" } = import.meta.env;

export const apiClient = axios.create({
  baseURL: VITE_BACKEND_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
