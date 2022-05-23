import axios from "axios";

export const api = axios.create({
    baseURL: process.env.NODE_ENV === "production" ? process.env.REACT_APP_BASE_API_URL : "http://localhost:3001/api",
    withCredentials: true,
    headers: {
      Accept: "application/json; charset=UTF-8",
      "Content-Type": "application/json"
    },
  });

export async function login(payload){
    return api.post("/user/login", payload);
}

export async function registerUser(payload){
    return api.post("/user/register", payload);
}

export async function checkLogin(){
    return api.get("/user/info");
}

export async function logout(){
  return api.get("/user/logout");
}