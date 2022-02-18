import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axiosInstance";

export default async function getProfileInfo() {
  const config: AxiosRequestConfig = {};
  const response = await axiosInstance(config).get(`/auth/userProfile`);
  return response.data;
}
