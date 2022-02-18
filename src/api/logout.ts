import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axiosInstance";

export default async function logout() {
  const config: AxiosRequestConfig = {};
  const response = await axiosInstance(config).get(`/auth/logout`);
  return response.data;
}
