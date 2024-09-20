import axios from "axios";

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error(error);
    const status = error.response?.status;
    if (status && status.toString().startsWith("4")) {
      // Client error
      return error.response;
    }
    return Promise.reject(error.response);
  }
);

export type User = {
  id?: number;
  name?: string;
  loginId: string;
  password?: string;
};

export const login = async (data: User) => {
  const res = await axios.post(`/auth/login`, data);
  return res;
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
