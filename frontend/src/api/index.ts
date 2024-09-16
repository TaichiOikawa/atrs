import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Access-Control-Allow-Methods"] =
  "HEAD, GET, POST, PUT, DELETE, OPTIONS, PATCH";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.post["Access-Control-Allow-Credentials"] = "true";

export type User = {
  id?: number;
  name?: string;
  loginId: string;
  password?: string;
};

export const login = async (data: User) => {
  await axios.post(`/auth/login`, data);
  return;
};

export const signUp = async (data: User) => {
  await axios.post(`/auth/sign-up`, data);
  return;
};

export const logout = async () => {
  await axios.post(`/auth/logout`);
  sessionStorage.clear();
  return;
};

export const checkJwt = async () => {
  const response = axios.get(`/auth/verify`);
  return response;
};
