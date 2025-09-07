import axios from "axios";

// ⚠️ IMPORTANT: Replace with your PC's LAN IP (not localhost!)
// Example: "http://192.168.1.5:8080/api"
const API = axios.create({
  baseURL: "http://10.166.2.30:8080/api",
});

export const signup = (data) => API.post("/auth/signup", data);
export const login = (data) => API.post("/auth/login", data);
export const books = () => API.get("/books");
export const addBook = (data) => API.post("/books", data);
