import axios from "axios";

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
  await axios.post(`/auth/signup`, data);
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
