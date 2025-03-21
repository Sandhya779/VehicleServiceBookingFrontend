import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5002/api" });

export const login = (credentials) => API.post("/auth/login", credentials);
export const register = (userData) => API.post("/auth/register", userData);
export const fetchServices = () => API.get("/services");
export const bookService = (data) => API.post("/bookings", data);