import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axiosInstance";

export default async function logout() {
  const config: AxiosRequestConfig = {};
  await axiosInstance(config).get(`/api/auth/logout`);
}
