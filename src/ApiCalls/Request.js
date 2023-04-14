import axios from "axios";

const BASE_URL=import.meta.env.VITE_API;
const axiosInstance = axios.create({
//   withCredentials: true,
  baseURL: BASE_URL
})