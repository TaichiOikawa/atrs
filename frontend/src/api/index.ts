import axios from "axios";

axios.defaults.withCredentials = true;

export type User = {
  id?: number;
  firstName?: string;
  lastName?: string;
  mail: string;
  password?: string;
};

export const login = async (data: User) => {
  await axios.post(`http://localhost:8000/login`, data);
  return;
};

export const signUp = async (data: User) => {
  await axios.post(`http://localhost:8000/sign-up`, data);
  return;
};

export const logout = async () => {
  await axios.post(`http://localhost:8000/logout`);
  return;
};

export const checkJwt = async () => {
  const response = axios.get(`http://localhost:8000/tokenVerification`);
  return response;
};
