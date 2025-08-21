// src/api/apiClient.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/api", // đổi thành URL backend thật
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;