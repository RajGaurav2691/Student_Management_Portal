//import axios from "axios";
//
//const api = axios.create({
//  baseURL: "http://localhost:8080/api",
//  headers: {
//    "Content-Type": "application/json",
//  },
//});
//
//export default api;

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default api;