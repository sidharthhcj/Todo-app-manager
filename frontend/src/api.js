import axios from "axios";

const api = axios.create({
  baseURL: "https://todo-app-backend-9hey.onrender.com",
  withCredentials: true,
});

export default api;
